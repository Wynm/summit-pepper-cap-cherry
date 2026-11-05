import { useState } from "react";
import { Button } from "@/components/ui/button";
import { STAR_LINKS, STARS, type Star } from "@/lib/afaq/stars";
import { useAfaq } from "@/lib/afaq/store";

export function Observatory() {
  const setChamber = useAfaq((state) => state.setChamber);
  const [activeId, setActiveId] = useState(STARS[0]?.id ?? "");
  const active = STARS.find((star) => star.id === activeId) ?? STARS[0]!;
  const byId = new Map(STARS.map((star) => [star.id, star]));

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <p className="text-sm text-brass">المرصد</p>
        <h1 className="mt-1 font-display text-4xl text-parchment md:text-5xl">نجوم المعارف</h1>
        <p className="mt-3 max-w-xl text-sm text-mist">
          تسع نجوم، ثلاث صور. اختر نجمًا لتقرأ بطاقته، ثم انتقل إلى الغرفة التي يكملها.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-ink-2">
          <svg viewBox="4 8 92 70" className="aspect-[4/3] h-auto w-full" role="img" aria-label="خريطة المرصد">
            {STAR_LINKS.map(([from, to]) => {
              const a = byId.get(from);
              const b = byId.get(to);
              if (!a || !b) return null;
              const hot = from === activeId || to === activeId;
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={hot ? "#c6a56a" : "#31403a"}
                  strokeWidth={hot ? 0.35 : 0.22}
                />
              );
            })}
            {STARS.map((star) => (
              <StarPoint
                key={star.id}
                star={star}
                active={star.id === activeId}
                onSelect={() => setActiveId(star.id)}
              />
            ))}
          </svg>
        </div>
      </div>
      <article className="h-fit rounded-2xl border border-line bg-panel p-5">
        <p className="text-xs text-brass">{active.field}</p>
        <h2 className="mt-2 font-display text-4xl text-parchment">{active.name}</h2>
        <p className="mt-4 text-base leading-relaxed text-parchment">{active.body}</p>
        <p className="mt-4 text-sm text-mist">{active.practice}</p>
        <Button className="mt-6" variant="brass" onClick={() => setChamber(active.chamber)}>
          انتقل إلى الغرفة
        </Button>
      </article>
    </section>
  );
}

function StarPoint({
  star,
  active,
  onSelect,
}: {
  star: Star;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={star.name}
      aria-pressed={active}
      className="cursor-pointer"
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <circle cx={star.x} cy={star.y} r={4.2} fill="transparent" />
      <circle
        cx={star.x}
        cy={star.y}
        r={active ? star.size * 0.42 : star.size * 0.28}
        fill={active ? "#e4d2a6" : "#c6a56a"}
      />
      {active && (
        <circle cx={star.x} cy={star.y} r={star.size * 0.7} fill="none" stroke="#c6a56a" strokeWidth={0.25} />
      )}
      <text
        x={star.x}
        y={star.y + 5.2}
        textAnchor="middle"
        fill={active ? "#f3eee4" : "#a39888"}
        fontSize={3.1}
        fontFamily="Amiri, serif"
      >
        {star.name}
      </text>
    </g>
  );
}
