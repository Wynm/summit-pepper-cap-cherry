import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/afaq/fields";
import { frequencyFor, playTone, unlockAudio, audioContext } from "@/lib/afaq/audio";
import { MAQAMS, TONICS, centsOf, findMaqam } from "@/lib/afaq/maqamat";
import { useAfaq } from "@/lib/afaq/store";
import { arNum, cn } from "@/lib/utils";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export function MaqamLab() {
  const maqamId = useAfaq((state) => state.maqamId);
  const setMaqamId = useAfaq((state) => state.setMaqamId);
  const tonic = useAfaq((state) => state.tonic);
  const setTonic = useAfaq((state) => state.setTonic);
  const steps = useAfaq((state) => state.steps);
  const setStep = useAfaq((state) => state.setStep);
  const setSteps = useAfaq((state) => state.setSteps);
  const bpm = useAfaq((state) => state.bpm);
  const setBpm = useAfaq((state) => state.setBpm);
  const melodyName = useAfaq((state) => state.melodyName);
  const setMelodyName = useAfaq((state) => state.setMelodyName);
  const saveMelody = useAfaq((state) => state.saveMelody);
  const maqam = findMaqam(maqamId);

  const [playing, setPlaying] = useState(false);
  const [playhead, setPlayhead] = useState<number | null>(null);
  const stepsRef = useRef(steps);
  const bpmRef = useRef(bpm);
  const maqamRef = useRef(maqam);
  const tonicRef = useRef(tonic);
  stepsRef.current = steps;
  bpmRef.current = bpm;
  maqamRef.current = maqam;
  tonicRef.current = tonic;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const index = KEYS.indexOf(event.key);
      if (index < 0) return;
      event.preventDefault();
      void strike(index);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!playing) return;
    let stopped = false;
    let step = 0;
    const context = new AudioContext();
    void context.resume();
    let next = context.currentTime + 0.06;
    const timer = window.setInterval(() => {
      if (stopped) return;
      const seconds = 60 / bpmRef.current / 2;
      while (next < context.currentTime + 0.18) {
        const note = stepsRef.current[step];
        const degree = note == null ? undefined : maqamRef.current.degrees[note];
        if (degree) {
          const freq = 440 * 2 ** ((tonicRef.current + degree.semis + degree.cents / 100 - 69) / 12);
          const osc = context.createOscillator();
          const gain = context.createGain();
          const filter = context.createBiquadFilter();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, next);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(1500, next);
          gain.gain.setValueAtTime(0.0001, next);
          gain.gain.exponentialRampToValueAtTime(0.16, next + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, next + Math.min(0.85, seconds * 1.5));
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(context.destination);
          osc.start(next);
          osc.stop(next + seconds * 1.7);
        }
        setPlayhead(step);
        next += seconds;
        step = (step + 1) % 8;
      }
    }, 40);
    return () => {
      stopped = true;
      window.clearInterval(timer);
      void context.close();
      setPlayhead(null);
    };
  }, [playing]);

  async function strike(index: number) {
    const degree = maqam.degrees[index];
    if (!degree) return;
    await unlockAudio();
    const context = audioContext();
    playTone(frequencyFor(tonic, degree), context.currentTime, 0.7);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-sm text-brass">المقام</p>
      <h1 className="mt-1 font-display text-4xl md:text-5xl">مختبر السلالم</h1>
      <p className="mt-3 max-w-2xl text-sm text-mist">
        تقريب معدّل على اثنتي عشرة نغمة، مع إزاحة بالسنت حيث يلزم نصف البيمول. هذا لا يغني عن الربع طن الحي،
        لكنه يكفي لسماع المسافة ومقارنتها. المفاتيح ١ إلى ٨ تعزف الدرجات.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {MAQAMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMaqamId(item.id)}
            className={cn(
              "h-11 rounded-full border px-4 text-sm",
              item.id === maqamId ? "border-brass bg-brass text-ink" : "border-line bg-panel text-parchment",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className="mt-3 max-w-2xl text-sm text-parchment">{maqam.blurb}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-mist">الأساس</span>
        {TONICS.map((item) => (
          <button
            key={item.midi}
            type="button"
            onClick={() => setTonic(item.midi)}
            className={cn(
              "h-11 min-w-11 rounded-full border px-3 text-sm",
              item.midi === tonic ? "border-brass bg-brass text-ink" : "border-line text-parchment",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-8" dir="ltr">
        {maqam.degrees.map((degree, index) => (
          <button
            key={degree.name}
            type="button"
            onClick={() => void strike(index)}
            className="flex h-28 flex-col items-center justify-center rounded-2xl border border-line bg-panel px-1 text-center hover:border-brass"
          >
            <span className="font-display text-lg text-parchment">{degree.name}</span>
            <span className="mt-1 text-xs text-brass tabular-nums">{arNum(centsOf(degree))}</span>
            <span className="text-xs text-mist">{arNum(index + 1)}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-panel p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-2xl">جملة من ثماني ضربات</h2>
          <div className="flex gap-2">
            <Button variant={playing ? "brass" : "line"} onClick={() => setPlaying((value) => !value)}>
              {playing ? "أوقف" : "شغّل"}
            </Button>
            <Button variant="quiet" onClick={() => setSteps(Array(8).fill(null))}>
              امسح
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8" dir="ltr">
          {steps.map((step, index) => (
            <label key={index} className="block text-xs text-mist">
              <span className={cn(playhead === index && "text-brass")}>{arNum(index + 1)}</span>
              <select
                className={cn(
                  "mt-1 h-11 w-full rounded-xl border bg-ink px-1 text-sm text-parchment",
                  playhead === index ? "border-brass" : "border-line",
                )}
                value={step == null ? "" : String(step)}
                onChange={(event) => {
                  const value = event.target.value;
                  setStep(index, value === "" ? null : Number(value));
                }}
              >
                <option value="">سكت</option>
                {maqam.degrees.map((degree, degreeIndex) => (
                  <option key={degree.name} value={degreeIndex}>
                    {degree.name}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <label className="mt-4 block text-sm text-mist">
          <span className="flex justify-between">
            السرعة
            <span className="text-parchment tabular-nums">{arNum(bpm)}</span>
          </span>
          <input
            className="mt-2 w-full"
            type="range"
            min={60}
            max={160}
            step={1}
            value={bpm}
            onChange={(event) => setBpm(Number(event.target.value))}
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          <input
            className={cn(fieldClass, "max-w-xs")}
            value={melodyName}
            onChange={(event) => setMelodyName(event.target.value)}
            aria-label="اسم الجملة"
          />
          <Button variant="brass" onClick={saveMelody}>
            احفظ الجملة
          </Button>
        </div>
      </div>
    </section>
  );
}
