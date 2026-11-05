import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { areaClass, fieldClass } from "@/components/afaq/fields";
import { useAfaq } from "@/lib/afaq/store";
import { cn } from "@/lib/utils";

export function Atlas() {
  const nodes = useAfaq((state) => state.nodes);
  const links = useAfaq((state) => state.links);
  const addNode = useAfaq((state) => state.addNode);
  const moveNode = useAfaq((state) => state.moveNode);
  const updateNode = useAfaq((state) => state.updateNode);
  const deleteNode = useAfaq((state) => state.deleteNode);
  const toggleLink = useAfaq((state) => state.toggleLink);

  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<string | null>(nodes[0]?.id ?? null);
  const [armed, setArmed] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ id: string; moved: boolean } | null>(null);

  const current = nodes.find((node) => node.id === selected) ?? null;

  function point(event: ReactPointerEvent) {
    const svg = svgRef.current;
    if (!svg) return { x: 50, y: 50 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <p className="text-sm text-brass">الأطلس</p>
        <h1 className="mt-1 font-display text-4xl md:text-5xl">جوار الأفكار</h1>
        <p className="mt-3 max-w-xl text-sm text-mist">
          اسحب العقدة لتضعها. اضغط «اربط» ثم عقدة أخرى لتشق بينهما خطًا، أو لتمسحه إن كان قائمًا.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-ink-2">
          <svg
            ref={svgRef}
            viewBox="0 0 100 70"
            className="h-auto min-h-80 w-full touch-none"
            onPointerMove={(event) => {
              if (!drag.current) return;
              const pos = point(event);
              drag.current.moved = true;
              moveNode(drag.current.id, pos.x, pos.y);
            }}
            onPointerUp={() => {
              drag.current = null;
            }}
            onPointerLeave={() => {
              drag.current = null;
            }}
          >
            {links.map((link) => {
              const [a, b] = link.split("|");
              const from = nodes.find((node) => node.id === a);
              const to = nodes.find((node) => node.id === b);
              if (!from || !to) return null;
              return (
                <line
                  key={link}
                  x1={from.x}
                  y1={from.y * 0.7}
                  x2={to.x}
                  y2={to.y * 0.7}
                  stroke="#c6a56a"
                  strokeWidth={0.35}
                />
              );
            })}
            {nodes.map((node) => {
              const y = node.y * 0.7;
              const on = node.id === selected;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    drag.current = { id: node.id, moved: false };
                    setSelected(node.id);
                  }}
                  onPointerUp={() => {
                    if (drag.current?.moved) return;
                    if (armed && armed !== node.id) {
                      toggleLink(armed, node.id);
                      setArmed(null);
                    }
                  }}
                >
                  <circle cx={node.x} cy={y} r={5.5} fill="transparent" />
                  <circle
                    cx={node.x}
                    cy={y}
                    r={on ? 2.3 : 1.7}
                    fill={armed === node.id ? "#e4d2a6" : "#c6a56a"}
                    stroke={on ? "#f3eee4" : "none"}
                    strokeWidth={0.35}
                  />
                  <text
                    x={node.x}
                    y={y + 4.4}
                    textAnchor="middle"
                    fill="#f3eee4"
                    fontSize={2.5}
                    fontFamily="Amiri, serif"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <form
          className="rounded-2xl border border-line bg-panel p-4"
          onSubmit={(event) => {
            event.preventDefault();
            addNode(label, note);
            setLabel("");
            setNote("");
          }}
        >
          <h2 className="font-display text-2xl">عقدة جديدة</h2>
          <input
            className={cn(fieldClass, "mt-3")}
            value={label}
            placeholder="اسم قصير"
            onChange={(event) => setLabel(event.target.value)}
          />
          <textarea
            className={cn(areaClass, "mt-3 min-h-24 text-base")}
            value={note}
            placeholder="جملة عن جوارها"
            onChange={(event) => setNote(event.target.value)}
          />
          <Button className="mt-3" variant="brass" type="submit" disabled={!label.trim()}>
            أضف
          </Button>
        </form>

        {current ? (
          <div className="rounded-2xl border border-line bg-panel p-4">
            <h2 className="font-display text-2xl">المحددة</h2>
            <input
              className={cn(fieldClass, "mt-3")}
              value={current.label}
              onChange={(event) => updateNode(current.id, { label: event.target.value })}
            />
            <textarea
              className={cn(areaClass, "mt-3 min-h-28 text-base")}
              value={current.note}
              onChange={(event) => updateNode(current.id, { note: event.target.value })}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant={armed === current.id ? "brass" : "line"}
                onClick={() => setArmed((value) => (value === current.id ? null : current.id))}
              >
                {armed === current.id ? "اختر الطرف الآخر" : "اربط"}
              </Button>
              <Button variant="quiet" onClick={() => deleteNode(current.id)}>
                احذف
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-mist">لا عقدة بعد. أضف اسمًا يبدأ به الجوار.</p>
        )}
      </aside>
    </section>
  );
}
