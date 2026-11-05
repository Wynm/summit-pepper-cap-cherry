import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/afaq/fields";
import { FOLD_OPTIONS, PATTERN_PRESETS, buildMotif, motifSvg } from "@/lib/afaq/geometry";
import { useAfaq } from "@/lib/afaq/store";
import { arNum, cn, downloadText } from "@/lib/utils";

export function Atelier() {
  const draft = useAfaq((state) => state.patternDraft);
  const setPatternDraft = useAfaq((state) => state.setPatternDraft);
  const name = useAfaq((state) => state.patternName);
  const setPatternName = useAfaq((state) => state.setPatternName);
  const savePattern = useAfaq((state) => state.savePattern);
  const motif = buildMotif(draft);

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm text-brass">المشغل</p>
          <h1 className="mt-1 font-display text-4xl">زخرفة نجمية</h1>
          <p className="mt-2 text-sm text-mist">
            تماثل يُرسم من عدد الطيّات. الشبكة تتكرر، والنجمة في الوسط تتحرك ببطء.
          </p>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm text-mist">الطيّات</legend>
          <div className="flex flex-wrap gap-2">
            {FOLD_OPTIONS.map((folds) => (
              <button
                key={folds}
                type="button"
                onClick={() => setPatternDraft({ folds })}
                className={cn(
                  "h-11 min-w-11 rounded-full border px-3 text-sm tabular-nums",
                  draft.folds === folds
                    ? "border-brass bg-brass text-ink"
                    : "border-line bg-panel text-parchment",
                )}
              >
                {arNum(folds)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm text-mist">أمثلة</legend>
          <div className="flex flex-wrap gap-2">
            {PATTERN_PRESETS.map((preset) => (
              <Button
                key={preset.name}
                size="sm"
                variant="line"
                onClick={() => {
                  setPatternDraft(preset.draft);
                  setPatternName(preset.name);
                }}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </fieldset>

        <Slider
          label="الدوران"
          min={0}
          max={180}
          step={1}
          value={draft.rotation}
          display={`${arNum(Math.round(draft.rotation))}°`}
          onChange={(rotation) => setPatternDraft({ rotation })}
        />
        <Slider
          label="ثقل الخط"
          min={0.8}
          max={3}
          step={0.1}
          value={draft.weight}
          display={arNum(draft.weight.toFixed(1))}
          onChange={(weight) => setPatternDraft({ weight })}
        />
        <Slider
          label="ضيق الداخل"
          min={0.32}
          max={0.68}
          step={0.01}
          value={draft.inset}
          display={arNum(draft.inset.toFixed(2))}
          onChange={(inset) => setPatternDraft({ inset })}
        />

        <fieldset>
          <legend className="mb-2 text-sm text-mist">كثافة التكرار</legend>
          <div className="flex gap-2">
            {[2, 3, 4].map((density) => (
              <button
                key={density}
                type="button"
                onClick={() => setPatternDraft({ density })}
                className={cn(
                  "h-11 flex-1 rounded-full border text-sm",
                  draft.density === density
                    ? "border-brass bg-brass text-ink"
                    : "border-line bg-panel text-parchment",
                )}
              >
                {arNum(density)}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm text-mist">
          اسم اللوحة
          <input
            className={cn(fieldClass, "mt-2")}
            value={name}
            onChange={(event) => setPatternName(event.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="brass"
            onClick={() => {
              savePattern();
            }}
          >
            احفظ في الأرشيف
          </Button>
          <Button
            variant="line"
            onClick={() => downloadText(`${name || "afaq"}.svg`, motifSvg(draft, name), "image/svg+xml")}
          >
            نزّل SVG
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-ink">
        <svg viewBox={`0 0 ${motif.board} ${motif.board}`} className="h-auto w-full" role="img" aria-label={name}>
          <defs>
            <pattern id="afaq-cell" width={motif.tile} height={motif.tile} patternUnits="userSpaceOnUse">
              <path d={motif.rings} fill="none" stroke="#31403a" strokeWidth={draft.weight * 2.2} />
              <path
                d={motif.stars}
                fill="none"
                stroke="#c6a56a"
                strokeWidth={draft.weight}
                strokeLinejoin="round"
              />
              <path
                d={motif.petals}
                fill="none"
                stroke="#a39888"
                strokeWidth={draft.weight * 0.75}
                strokeLinejoin="round"
              />
            </pattern>
          </defs>
          <rect width={motif.board} height={motif.board} fill="#101614" />
          <rect width={motif.board} height={motif.board} fill="url(#afaq-cell)" />
          <g className="afaq-turn">
            <path d={motif.medallionRing} fill="none" stroke="#e4d2a6" strokeWidth={draft.weight * 0.7} />
            <path
              d={motif.medallionStar}
              fill="none"
              stroke="#c6a56a"
              strokeWidth={draft.weight * 1.35}
              strokeLinejoin="round"
            />
            <path
              d={motif.medallionPetal}
              fill="none"
              stroke="#f3eee4"
              strokeWidth={draft.weight * 0.8}
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </section>
  );
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm text-mist">
      <span className="flex items-center justify-between">
        {label}
        <span className="text-parchment tabular-nums">{display}</span>
      </span>
      <input
        className="mt-2 w-full"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
