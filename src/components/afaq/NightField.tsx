import { SYNODIC } from "@/lib/afaq/astronomy";

type StarDot = { x: number; y: number; r: number; delay: number; a: number };

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStars(count: number): StarDot[] {
  const rand = mulberry32(1448);
  return Array.from({ length: count }, () => ({
    x: rand() * 1000,
    y: rand() * 640,
    r: 0.6 + rand() * 1.6,
    delay: rand() * -6,
    a: 0.35 + rand() * 0.65,
  }));
}

const STARS = makeStars(120);

export function NightField({ age }: { age: number }) {
  const phase = (((age % SYNODIC) + SYNODIC) % SYNODIC) / SYNODIC;
  const radius = 52;
  const offset = (phase <= 0.5 ? -phase : 1 - phase) * 4 * radius;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="afaq-sky" cx="50%" cy="18%" r="75%">
          <stop offset="0%" stopColor="#1a2420" />
          <stop offset="100%" stopColor="#101614" />
        </radialGradient>
        <clipPath id="afaq-moon">
          <circle cx="180" cy="148" r={radius} />
        </clipPath>
      </defs>
      <rect width="1000" height="640" fill="url(#afaq-sky)" />
      {STARS.map((star, index) => (
        <circle
          key={index}
          className="afaq-star"
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="#f3eee4"
          style={{ animationDelay: `${star.delay}s`, opacity: star.a }}
        />
      ))}
      <g className="afaq-turn">
        <ellipse cx="720" cy="250" rx="92" ry="36" fill="none" stroke="#c6a56a" strokeOpacity="0.35" />
        <ellipse
          cx="720"
          cy="250"
          rx="74"
          ry="30"
          fill="none"
          stroke="#c6a56a"
          strokeOpacity="0.28"
          transform="rotate(28 720 250)"
        />
        <ellipse
          cx="720"
          cy="250"
          rx="110"
          ry="22"
          fill="none"
          stroke="#c6a56a"
          strokeOpacity="0.22"
          transform="rotate(-18 720 250)"
        />
      </g>
      <g clipPath="url(#afaq-moon)">
        <rect x="120" y="90" width="120" height="120" fill="#f3eee4" />
        <circle cx={180 + offset} cy="148" r={radius + 1} fill="#24302b" />
      </g>
      <circle cx="180" cy="148" r={radius} fill="none" stroke="#c6a56a" strokeWidth="1.6" />
    </svg>
  );
}
