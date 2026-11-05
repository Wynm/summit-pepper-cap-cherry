import { Button } from "@/components/ui/button";
import { areaClass, fieldClass } from "@/components/afaq/fields";
import { nextSpark } from "@/lib/afaq/sparks";
import { useAfaq } from "@/lib/afaq/store";
import type { PoemForm } from "@/lib/afaq/types";
import { arNum, cn, countWords } from "@/lib/utils";

const FORMS: { id: PoemForm; hint: string }[] = [
  { id: "حر", hint: "بلا عدّ" },
  { id: "مقطع", hint: "أربعة أسطر" },
  { id: "ثلاثي", hint: "ثلاث وقفات" },
  { id: "نثر", hint: "جملة طويلة" },
];

export function Diwan() {
  const draft = useAfaq((state) => state.poemDraft);
  const setPoemDraft = useAfaq((state) => state.setPoemDraft);
  const savePoem = useAfaq((state) => state.savePoem);
  const poems = useAfaq((state) => state.poems);
  const words = countWords(draft.body);
  const lines = draft.body ? draft.body.split("\n").length : 0;

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <p className="text-sm text-brass">الديوان</p>
        <h1 className="mt-1 font-display text-4xl md:text-5xl">مكتب الكتابة</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {FORMS.map((form) => (
            <button
              key={form.id}
              type="button"
              onClick={() => setPoemDraft({ form: form.id })}
              className={cn(
                "h-11 rounded-full border px-4 text-sm",
                draft.form === form.id
                  ? "border-brass bg-brass text-ink"
                  : "border-line bg-panel text-parchment",
              )}
            >
              {form.id}
              <span className={cn("ms-2 text-xs", draft.form === form.id ? "text-ink/70" : "text-mist")}>
                {form.hint}
              </span>
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm text-mist">
          العنوان
          <input
            className={cn(fieldClass, "mt-2")}
            value={draft.title}
            placeholder="بلا عنوان إن شئت"
            onChange={(event) => setPoemDraft({ title: event.target.value })}
          />
        </label>
        <textarea
          className={cn(areaClass, "mt-4")}
          dir="auto"
          value={draft.body}
          placeholder="اكتب هنا. السطر الذي يفسّر سابقه مرشّح للحذف."
          onChange={(event) => setPoemDraft({ body: event.target.value })}
        />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-mist">
          <span className="tabular-nums">{arNum(words)} كلمة</span>
          <span className="tabular-nums">{arNum(lines)} سطر</span>
          <span>{hintFor(draft.form, lines)}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="brass" disabled={!draft.body.trim()} onClick={savePoem}>
            احفظ نسخة
          </Button>
          <Button
            variant="line"
            onClick={() => {
              const line = nextSpark(draft.body);
              const body = draft.body.trim() ? `${draft.body.replace(/\s+$/, "")}\n${line}` : line;
              setPoemDraft({ body });
            }}
          >
            سطر يقدح
          </Button>
          <Button
            variant="quiet"
            onClick={() => setPoemDraft({ title: "", body: "", form: draft.form })}
          >
            امسح المسودة
          </Button>
        </div>
      </div>
      <aside className="rounded-2xl border border-line bg-panel p-5">
        <h2 className="font-display text-2xl">آخر ما حُفظ</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {poems.slice(0, 4).map((poem) => (
            <li key={poem.id} className="border-b border-line pb-3 last:border-b-0">
              <p className="text-sm text-brass">{poem.form}</p>
              <p className="font-display text-xl">{poem.title}</p>
              <p className="line-clamp-3 text-sm text-mist">{poem.body}</p>
            </li>
          ))}
          {poems.length === 0 && <li className="text-sm text-mist">الأرشيف فارغ. الحفظ يصنع النسخة، ولا يمسح المسودة.</li>}
        </ul>
      </aside>
    </section>
  );
}

function hintFor(form: PoemForm, lines: number): string {
  if (form === "مقطع") return lines === 4 ? "أربعة أسطر. تمام العدد." : "المقطع هنا أربعة أسطر.";
  if (form === "ثلاثي") return lines === 3 ? "ثلاث وقفات. تمام العدد." : "الثلاثي هنا ثلاثة أسطر.";
  if (form === "نثر") return "جملة تتسع، بلا قافية مفروضة.";
  return "حرّ: لا عدّ يُلزمك.";
}
