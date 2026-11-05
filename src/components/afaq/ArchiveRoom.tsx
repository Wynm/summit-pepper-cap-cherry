import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { readBackup, toBackup } from "@/lib/afaq/backup";
import { findMaqam } from "@/lib/afaq/maqamat";
import { useAfaq } from "@/lib/afaq/store";
import { arNum, downloadText } from "@/lib/utils";

export function ArchiveRoom() {
  const poems = useAfaq((state) => state.poems);
  const patterns = useAfaq((state) => state.patterns);
  const melodies = useAfaq((state) => state.melodies);
  const nodes = useAfaq((state) => state.nodes);
  const links = useAfaq((state) => state.links);
  const deletePoem = useAfaq((state) => state.deletePoem);
  const openPoem = useAfaq((state) => state.openPoem);
  const deletePattern = useAfaq((state) => state.deletePattern);
  const openPattern = useAfaq((state) => state.openPattern);
  const deleteMelody = useAfaq((state) => state.deleteMelody);
  const openMelody = useAfaq((state) => state.openMelody);
  const replaceArchive = useAfaq((state) => state.replaceArchive);
  const [message, setMessage] = useState("");

  const total = poems.length + patterns.length + melodies.length;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-sm text-brass">الأرشيف</p>
      <h1 className="mt-1 font-display text-4xl md:text-5xl">ما بقي</h1>
      <p className="mt-3 max-w-2xl text-sm text-mist">
        {arNum(total)} عملًا محفوظًا، و{arNum(nodes.length)} عقدة في الأطلس. التصدير ملف واحد تستطيع
        إعادته لاحقًا. الاستيراد يستبدل الأرشيف ولا يمس المسودات المفتوحة.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          variant="brass"
          onClick={() =>
            downloadText(
              "afaq-archive.json",
              JSON.stringify(toBackup({ poems, patterns, melodies, nodes, links }), null, 2),
              "application/json",
            )
          }
        >
          صدّر الأرشيف
        </Button>
        <label className="inline-flex h-11 cursor-pointer items-center rounded-full border border-line bg-panel px-4 text-sm text-parchment">
          استورد
          <input
            className="sr-only"
            type="file"
            accept="application/json,.json"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file) return;
              try {
                const raw: unknown = JSON.parse(await file.text());
                const result = readBackup(raw);
                if (!result.ok) {
                  setMessage(result.error);
                  return;
                }
                replaceArchive(result.data);
                setMessage("عاد الأرشيف إلى مكانه.");
              } catch {
                setMessage("تعذّر قراءة الملف.");
              }
            }}
          />
        </label>
        {message && <p className="text-sm text-brass">{message}</p>}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Column title="الديوان" empty="لا قصائد بعد.">
          {poems.map((poem) => (
            <Item
              key={poem.id}
              kicker={poem.form}
              title={poem.title}
              body={poem.body}
              onOpen={() => openPoem(poem.id)}
              onDelete={() => deletePoem(poem.id)}
            />
          ))}
        </Column>
        <Column title="المشغل" empty="لا زخارف بعد.">
          {patterns.map((pattern) => (
            <Item
              key={pattern.id}
              kicker={`${arNum(pattern.folds)} طيّات`}
              title={pattern.name}
              body={`تكرار ${arNum(pattern.density)} · دوران ${arNum(Math.round(pattern.rotation))}`}
              onOpen={() => openPattern(pattern.id)}
              onDelete={() => deletePattern(pattern.id)}
            />
          ))}
        </Column>
        <Column title="المقام" empty="لا جمل بعد.">
          {melodies.map((melody) => (
            <Item
              key={melody.id}
              kicker={findMaqam(melody.maqamId).name}
              title={melody.name}
              body={`${arNum(melody.bpm)} ضربة · ${arNum(melody.steps.filter((step) => step != null).length)} نغمات`}
              onOpen={() => openMelody(melody.id)}
              onDelete={() => deleteMelody(melody.id)}
            />
          ))}
        </Column>
      </div>
    </section>
  );
}

function Column({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: ReactNode;
}) {
  const list = Array.isArray(children) ? children : [children];
  const has = list.some(Boolean);
  return (
    <section className="rounded-2xl border border-line bg-panel p-4">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-3 flex flex-col gap-3">{has ? children : <p className="text-sm text-mist">{empty}</p>}</div>
    </section>
  );
}

function Item({
  kicker,
  title,
  body,
  onOpen,
  onDelete,
}: {
  kicker: string;
  title: string;
  body: string;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const [armed, setArmed] = useState(false);
  return (
    <article className="border-b border-line pb-3 last:border-b-0">
      <p className="text-xs text-brass">{kicker}</p>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="line-clamp-3 text-sm text-mist">{body}</p>
      <div className="mt-2 flex gap-2">
        <Button size="sm" variant="line" onClick={onOpen}>
          افتح
        </Button>
        <Button
          size="sm"
          variant="quiet"
          onClick={() => {
            if (!armed) {
              setArmed(true);
              return;
            }
            onDelete();
          }}
        >
          {armed ? "تأكيد الحذف" : "احذف"}
        </Button>
      </div>
    </article>
  );
}
