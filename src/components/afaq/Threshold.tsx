import {
  GREG_MONTHS,
  HIJRI_MONTHS,
  WEEKDAYS,
  gregorianToHijri,
  illumination,
  moonAgeDays,
  phaseName,
} from "@/lib/afaq/astronomy";
import { NightField } from "@/components/afaq/NightField";
import { useNow } from "@/components/afaq/use-now";
import { useAfaq } from "@/lib/afaq/store";
import { CHAMBERS } from "@/lib/afaq/types";
import { arNum, twoAr } from "@/lib/utils";

export function Threshold() {
  const now = useNow();
  const setChamber = useAfaq((state) => state.setChamber);
  const age = now ? moonAgeDays(now) : null;
  const hijri = now ? gregorianToHijri(now) : null;

  return (
    <div className="relative min-h-svh">
      <NightField age={age ?? 14.8} />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 pb-20 md:pt-16">
        <p className="text-sm text-brass">مرصد شخصي للعمل البطيء</p>
        <h1 className="mt-3 font-display text-6xl leading-none text-parchment md:text-8xl">أفق</h1>
        <p className="mt-5 max-w-2xl font-display text-2xl leading-snug text-parchment md:text-3xl">
          هنا ترصد الفكرة، وترسم تماثلها، وتكتب بيتها، وتسمع مقامها، ثم تحفظ ما يبقى.
        </p>

        <dl className="mt-8 flex flex-wrap gap-3">
          <Info
            label="الميلادي"
            value={
              now
                ? `${WEEKDAYS[now.getDay()]} ${arNum(now.getDate())} ${GREG_MONTHS[now.getMonth()]} ${arNum(now.getFullYear())}`
                : "…"
            }
          />
          <Info
            label="الهجري"
            value={
              hijri
                ? `${arNum(hijri.day)} ${HIJRI_MONTHS[hijri.month - 1] ?? ""} ${arNum(hijri.year)}`
                : "…"
            }
          />
          <Info
            label="الطور"
            value={age == null ? "…" : `${phaseName(age)} · ${arNum(Math.round(illumination(age) * 100))}٪`}
          />
          <Info
            label="الساعة"
            value={now ? `${twoAr(now.getHours())}:${twoAr(now.getMinutes())}` : "…"}
          />
        </dl>

        <p className="mt-6 max-w-xl text-sm text-mist">
          الحساب فلكي تقريبي للطور، وجدولي للتاريخ الهجري. عملك يُحفظ في هذا المتصفح وحدَه.
        </p>

        <ol className="mt-12 border-y border-line">
          {CHAMBERS.filter((item) => item.id !== "threshold").map((item, index) => (
            <li key={item.id} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => setChamber(item.id)}
                className="flex w-full flex-wrap items-baseline gap-x-4 gap-y-1 py-4 text-start transition-colors hover:bg-panel/50"
              >
                <span className="w-12 font-display text-2xl text-brass">{arNum(index + 1).padStart(2, "٠")}</span>
                <span className="font-display text-3xl text-parchment">{item.label}</span>
                <span className="text-sm text-mist">{item.hint}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-36 rounded-2xl border border-line bg-ink/70 px-4 py-3 backdrop-blur-sm">
      <dt className="text-xs text-brass">{label}</dt>
      <dd className="mt-1 text-sm text-parchment tabular-nums">{value}</dd>
    </div>
  );
}
