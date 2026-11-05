import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Library, c as AudioLines, i as Moon, o as Hexagon, r as PenLine, s as Compass, t as Waypoints } from "../_libs/lucide-react.mjs";
import { a as object, i as number, n as array, o as string, r as literal, t as _enum } from "../_libs/zod.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CUX9Voti.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var FIGURES = [
	"٠",
	"١",
	"٢",
	"٣",
	"٤",
	"٥",
	"٦",
	"٧",
	"٨",
	"٩"
];
function arNum(value) {
	return String(value).replace(/\d/g, (digit) => FIGURES[Number(digit)] ?? digit);
}
function twoAr(value) {
	return arNum(value).padStart(2, "٠");
}
function uid(prefix) {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function downloadText(filename, text, type) {
	const blob = new Blob([text], { type });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
function countWords(text) {
	const trimmed = text.trim();
	if (!trimmed) return 0;
	return trimmed.split(/\s+/).filter(Boolean).length;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass", {
	variants: {
		variant: {
			brass: "border-brass bg-brass text-ink hover:bg-brass-2",
			line: "border-line bg-panel text-parchment hover:border-brass",
			ghost: "border-transparent bg-transparent text-parchment hover:bg-panel",
			quiet: "border-transparent bg-transparent text-mist hover:text-parchment"
		},
		size: {
			sm: "h-9 px-3",
			md: "h-11 px-4",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "line",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		type: asChild ? void 0 : type ?? "button",
		...props
	});
}
var poemSchema = object({
	id: string().min(1),
	title: string(),
	body: string(),
	form: _enum([
		"حر",
		"مقطع",
		"ثلاثي",
		"نثر"
	]),
	createdAt: number()
});
var patternSchema = object({
	id: string().min(1),
	name: string(),
	createdAt: number(),
	folds: number(),
	rotation: number(),
	weight: number(),
	inset: number(),
	density: number()
});
var melodySchema = object({
	id: string().min(1),
	name: string(),
	maqamId: string(),
	tonic: number(),
	steps: array(number().nullable()).length(8),
	bpm: number(),
	createdAt: number()
});
var nodeSchema = object({
	id: string().min(1),
	label: string(),
	note: string(),
	x: number(),
	y: number()
});
var backupSchema = object({
	version: literal(1),
	poems: array(poemSchema),
	patterns: array(patternSchema),
	melodies: array(melodySchema),
	nodes: array(nodeSchema),
	links: array(string())
});
function toBackup(input) {
	return {
		version: 1,
		...input
	};
}
function readBackup(raw) {
	const parsed = backupSchema.safeParse(raw);
	if (!parsed.success) return {
		ok: false,
		error: "الملف ليس أرشيف أفق."
	};
	return {
		ok: true,
		data: parsed.data
	};
}
var WORDS = [
	"الأولى",
	"الثانية",
	"الثالثة",
	"الرابعة",
	"الخامسة",
	"السادسة",
	"السابعة",
	"جواب"
];
function scale(id, name, blurb, cents) {
	return {
		id,
		name,
		blurb,
		degrees: cents.map((total, index) => ({
			name: WORDS[index] ?? String(index + 1),
			semis: Math.trunc(total / 100),
			cents: total - Math.trunc(total / 100) * 100
		}))
	};
}
var MAQAMS = [
	scale("rast", "راست", "مسافة الثالثة والسابعة نصف بيمول. مقام الاستقرار والافتتاح.", [
		0,
		200,
		350,
		500,
		700,
		900,
		1050,
		1200
	]),
	scale("bayati", "بياتي", "الثانية نصف بيمول. مقام قريب من الحكي، دافئ وقصير النفس.", [
		0,
		150,
		300,
		500,
		700,
		800,
		1e3,
		1200
	]),
	scale("hijaz", "حجاز", "ثانية صغيرة تليها زائدة. القفزة هي طابع المقام.", [
		0,
		100,
		400,
		500,
		700,
		800,
		1e3,
		1200
	]),
	scale("saba", "صبا", "تقريب معدّل لمقام لا يستقر على جوابه بسهولة.", [
		0,
		150,
		300,
		400,
		700,
		800,
		1e3,
		1200
	]),
	scale("nahawand", "نهاوند", "قريب من الصغير المتناغم: السابعة مرتفعة.", [
		0,
		200,
		300,
		500,
		700,
		800,
		1100,
		1200
	]),
	scale("kurd", "كرد", "الثانية صغيرة. مقام مباشر، أرضه منخفضة.", [
		0,
		100,
		300,
		500,
		700,
		800,
		1e3,
		1200
	]),
	scale("ajam", "عجم", "السلم الكبير. يفيد للمقارنة لا بوصفه غاية المقام.", [
		0,
		200,
		400,
		500,
		700,
		900,
		1100,
		1200
	])
];
var TONICS = [
	{
		midi: 60,
		name: "دو"
	},
	{
		midi: 62,
		name: "ري"
	},
	{
		midi: 64,
		name: "مي"
	},
	{
		midi: 65,
		name: "فا"
	},
	{
		midi: 67,
		name: "صول"
	},
	{
		midi: 69,
		name: "لا"
	}
];
function findMaqam(id) {
	return MAQAMS.find((item) => item.id === id) ?? MAQAMS[0];
}
function centsOf(degree) {
	return degree.semis * 100 + degree.cents;
}
var CHAMBERS = [
	{
		id: "threshold",
		label: "العتبة",
		hint: "الليل والتاريخ والطور"
	},
	{
		id: "sky",
		label: "المرصد",
		hint: "نجوم معارف تُفتح"
	},
	{
		id: "atelier",
		label: "المشغل",
		hint: "زخرفة نجمية تُولَّد"
	},
	{
		id: "diwan",
		label: "الديوان",
		hint: "بيتٌ يُكتب ويُحفظ"
	},
	{
		id: "maqam",
		label: "المقام",
		hint: "سلالم تُسمع وتُرتَّب"
	},
	{
		id: "atlas",
		label: "الأطلس",
		hint: "أفكار تتجاور"
	},
	{
		id: "archive",
		label: "الأرشيف",
		hint: "ما بقي من شغلك"
	}
];
var DEFAULT_PATTERN = {
	folds: 8,
	rotation: 0,
	weight: 1.4,
	inset: .46,
	density: 3
};
var DEFAULT_STEPS = [
	0,
	2,
	3,
	4,
	null,
	4,
	3,
	2
];
function linkKey(a, b) {
	return [a, b].sort().join("|");
}
function spiral(index) {
	const angle = index * 2.39996;
	const radius = 16 + index % 6 * 6;
	return {
		x: clamp(50 + Math.cos(angle) * radius, 10, 90),
		y: clamp(48 + Math.sin(angle) * radius * .72, 14, 86)
	};
}
function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
var seedPoem = {
	id: "seed-poem",
	title: "عتبة",
	form: "مقطع",
	body: "أُبقي الباب موارباً\nكي يدخل الليل بلا استئذان،\nويضع على الطاولة\nقمرًا لم أطلبه.",
	createdAt: 173e10
};
var seedPattern = {
	id: "seed-pattern",
	name: "نجمة العتبة",
	createdAt: 17300001e5,
	...DEFAULT_PATTERN
};
var seedMelody = {
	id: "seed-melody",
	name: "خطو راست",
	maqamId: "rast",
	tonic: 60,
	steps: DEFAULT_STEPS,
	bpm: 92,
	createdAt: 17300002e5
};
var seedNode = {
	id: "seed-node",
	label: "عتبة الأفق",
	note: "ما أريد أن أعود إليه حين يتسع العمل.",
	x: 48,
	y: 46
};
var useAfaq = create()(persist((set, get) => ({
	chamber: "threshold",
	poemDraft: {
		title: "",
		body: "",
		form: "حر"
	},
	patternDraft: DEFAULT_PATTERN,
	patternName: "نجمة بلا اسم",
	maqamId: "rast",
	tonic: 60,
	steps: DEFAULT_STEPS,
	bpm: 96,
	melodyName: "جملة",
	poems: [seedPoem],
	patterns: [seedPattern],
	melodies: [seedMelody],
	nodes: [seedNode],
	links: [],
	setChamber: (chamber) => set({ chamber }),
	setPoemDraft: (patch) => set({ poemDraft: {
		...get().poemDraft,
		...patch
	} }),
	setPatternDraft: (patch) => set({ patternDraft: {
		...get().patternDraft,
		...patch
	} }),
	setPatternName: (patternName) => set({ patternName }),
	setMaqamId: (maqamId) => set({ maqamId }),
	setTonic: (tonic) => set({ tonic }),
	setSteps: (steps) => set({ steps }),
	setStep: (index, value) => {
		const steps = get().steps.slice();
		steps[index] = value;
		set({ steps });
	},
	setBpm: (bpm) => set({ bpm }),
	setMelodyName: (melodyName) => set({ melodyName }),
	savePoem: () => {
		const draft = get().poemDraft;
		if (!draft.body.trim()) return;
		set({ poems: [{
			id: uid("poem"),
			title: draft.title.trim() || "بلا عنوان",
			body: draft.body.trim(),
			form: draft.form,
			createdAt: Date.now()
		}, ...get().poems] });
	},
	deletePoem: (id) => set({ poems: get().poems.filter((poem) => poem.id !== id) }),
	openPoem: (id) => {
		const poem = get().poems.find((item) => item.id === id);
		if (!poem) return;
		set({
			poemDraft: {
				title: poem.title,
				body: poem.body,
				form: poem.form
			},
			chamber: "diwan"
		});
	},
	savePattern: () => {
		const name = get().patternName.trim() || "زخرفة";
		set({ patterns: [{
			id: uid("pattern"),
			name,
			createdAt: Date.now(),
			...get().patternDraft
		}, ...get().patterns] });
	},
	deletePattern: (id) => set({ patterns: get().patterns.filter((item) => item.id !== id) }),
	openPattern: (id) => {
		const pattern = get().patterns.find((item) => item.id === id);
		if (!pattern) return;
		const { folds, rotation, weight, inset, density } = pattern;
		set({
			patternDraft: {
				folds,
				rotation,
				weight,
				inset,
				density
			},
			patternName: pattern.name,
			chamber: "atelier"
		});
	},
	saveMelody: () => {
		set({ melodies: [{
			id: uid("melody"),
			name: get().melodyName.trim() || "جملة",
			maqamId: get().maqamId,
			tonic: get().tonic,
			steps: get().steps.slice(),
			bpm: get().bpm,
			createdAt: Date.now()
		}, ...get().melodies] });
	},
	deleteMelody: (id) => set({ melodies: get().melodies.filter((item) => item.id !== id) }),
	openMelody: (id) => {
		const melody = get().melodies.find((item) => item.id === id);
		if (!melody) return;
		set({
			maqamId: melody.maqamId,
			tonic: melody.tonic,
			steps: melody.steps.slice(),
			bpm: melody.bpm,
			melodyName: melody.name,
			chamber: "maqam"
		});
	},
	addNode: (label, note) => {
		const text = label.trim();
		if (!text) return;
		const pos = spiral(get().nodes.length);
		const node = {
			id: uid("node"),
			label: text,
			note: note.trim(),
			x: pos.x,
			y: pos.y
		};
		set({ nodes: [...get().nodes, node] });
	},
	moveNode: (id, x, y) => set({ nodes: get().nodes.map((node) => node.id === id ? {
		...node,
		x: clamp(x, 6, 94),
		y: clamp(y, 10, 90)
	} : node) }),
	updateNode: (id, patch) => set({ nodes: get().nodes.map((node) => node.id === id ? {
		...node,
		...patch
	} : node) }),
	deleteNode: (id) => set({
		nodes: get().nodes.filter((node) => node.id !== id),
		links: get().links.filter((link) => !link.split("|").includes(id))
	}),
	toggleLink: (a, b) => {
		if (a === b) return;
		const key = linkKey(a, b);
		const links = get().links;
		set({ links: links.includes(key) ? links.filter((link) => link !== key) : [...links, key] });
	},
	replaceArchive: (backup) => set({
		poems: backup.poems,
		patterns: backup.patterns,
		melodies: backup.melodies,
		nodes: backup.nodes,
		links: backup.links
	})
}), {
	name: "afaq-v1",
	skipHydration: true,
	partialize: (state) => ({
		chamber: state.chamber,
		poemDraft: state.poemDraft,
		patternDraft: state.patternDraft,
		patternName: state.patternName,
		maqamId: state.maqamId,
		tonic: state.tonic,
		steps: state.steps,
		bpm: state.bpm,
		melodyName: state.melodyName,
		poems: state.poems,
		patterns: state.patterns,
		melodies: state.melodies,
		nodes: state.nodes,
		links: state.links
	})
}));
function chamberLabel(id) {
	return CHAMBERS.find((item) => item.id === id)?.label ?? "أفق";
}
function ArchiveRoom() {
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
	const [message, setMessage] = (0, import_react.useState)("");
	const total = poems.length + patterns.length + melodies.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-brass",
				children: "الأرشيف"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl md:text-5xl",
				children: "ما بقي"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-2xl text-sm text-mist",
				children: [
					arNum(total),
					" عملًا محفوظًا، و",
					arNum(nodes.length),
					" عقدة في الأطلس. التصدير ملف واحد تستطيع إعادته لاحقًا. الاستيراد يستبدل الأرشيف ولا يمس المسودات المفتوحة."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "brass",
						onClick: () => downloadText("afaq-archive.json", JSON.stringify(toBackup({
							poems,
							patterns,
							melodies,
							nodes,
							links
						}), null, 2), "application/json"),
						children: "صدّر الأرشيف"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex h-11 cursor-pointer items-center rounded-full border border-line bg-panel px-4 text-sm text-parchment",
						children: ["استورد", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "sr-only",
							type: "file",
							accept: "application/json,.json",
							onChange: async (event) => {
								const file = event.target.files?.[0];
								event.target.value = "";
								if (!file) return;
								try {
									const result = readBackup(JSON.parse(await file.text()));
									if (!result.ok) {
										setMessage(result.error);
										return;
									}
									replaceArchive(result.data);
									setMessage("عاد الأرشيف إلى مكانه.");
								} catch {
									setMessage("تعذّر قراءة الملف.");
								}
							}
						})]
					}),
					message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-brass",
						children: message
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
						title: "الديوان",
						empty: "لا قصائد بعد.",
						children: poems.map((poem) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
							kicker: poem.form,
							title: poem.title,
							body: poem.body,
							onOpen: () => openPoem(poem.id),
							onDelete: () => deletePoem(poem.id)
						}, poem.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
						title: "المشغل",
						empty: "لا زخارف بعد.",
						children: patterns.map((pattern) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
							kicker: `${arNum(pattern.folds)} طيّات`,
							title: pattern.name,
							body: `تكرار ${arNum(pattern.density)} · دوران ${arNum(Math.round(pattern.rotation))}`,
							onOpen: () => openPattern(pattern.id),
							onDelete: () => deletePattern(pattern.id)
						}, pattern.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
						title: "المقام",
						empty: "لا جمل بعد.",
						children: melodies.map((melody) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
							kicker: findMaqam(melody.maqamId).name,
							title: melody.name,
							body: `${arNum(melody.bpm)} ضربة · ${arNum(melody.steps.filter((step) => step != null).length)} نغمات`,
							onOpen: () => openMelody(melody.id),
							onDelete: () => deleteMelody(melody.id)
						}, melody.id))
					})
				]
			})
		]
	});
}
function Column({ title, empty, children }) {
	const has = (Array.isArray(children) ? children : [children]).some(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-line bg-panel p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-col gap-3",
			children: has ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: empty
			})
		})]
	});
}
function Item({ kicker, title, body, onOpen, onDelete }) {
	const [armed, setArmed] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "border-b border-line pb-3 last:border-b-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-brass",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-3 text-sm text-mist",
				children: body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "line",
					onClick: onOpen,
					children: "افتح"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "quiet",
					onClick: () => {
						if (!armed) {
							setArmed(true);
							return;
						}
						onDelete();
					},
					children: armed ? "تأكيد الحذف" : "احذف"
				})]
			})
		]
	});
}
var fieldClass = "h-11 w-full rounded-full border border-line bg-ink px-4 text-sm text-parchment outline-none transition-colors placeholder:text-mist focus:border-brass";
var areaClass = "min-h-48 w-full resize-y rounded-2xl border border-line bg-ink p-4 font-display text-xl leading-relaxed text-parchment outline-none transition-colors placeholder:font-sans placeholder:text-base placeholder:text-mist focus:border-brass";
var FOLD_OPTIONS = [
	4,
	5,
	6,
	8,
	10,
	12
];
var PATTERN_PRESETS = [
	{
		name: "ثمانية",
		draft: {
			folds: 8,
			rotation: 0,
			weight: 1.4,
			inset: .46,
			density: 3
		}
	},
	{
		name: "سداسية",
		draft: {
			folds: 6,
			rotation: 0,
			weight: 1.35,
			inset: .5,
			density: 3
		}
	},
	{
		name: "عشرية",
		draft: {
			folds: 10,
			rotation: 8,
			weight: 1.15,
			inset: .4,
			density: 2
		}
	},
	{
		name: "رباعية",
		draft: {
			folds: 4,
			rotation: 0,
			weight: 1.8,
			inset: .56,
			density: 4
		}
	},
	{
		name: "اثنا عشر",
		draft: {
			folds: 12,
			rotation: 0,
			weight: 1.05,
			inset: .38,
			density: 2
		}
	},
	{
		name: "خماسية",
		draft: {
			folds: 5,
			rotation: 6,
			weight: 1.3,
			inset: .44,
			density: 2
		}
	}
];
function polar(cx, cy, r, deg) {
	const a = (deg - 90) * Math.PI / 180;
	return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function starPath(cx, cy, rOut, rIn, n, rot) {
	const count = Math.max(3, n) * 2;
	let d = "";
	for (let i = 0; i < count; i++) {
		const [x, y] = polar(cx, cy, i % 2 === 0 ? rOut : rIn, rot + 360 / count * i);
		d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
	}
	return `${d}Z`;
}
function polygonPath(cx, cy, r, n, rot) {
	const sides = Math.max(3, n);
	let d = "";
	for (let i = 0; i < sides; i++) {
		const [x, y] = polar(cx, cy, r, rot + 360 / sides * i);
		d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
	}
	return `${d}Z`;
}
function buildMotif(draft) {
	const tile = 240;
	const board = tile * Math.min(4, Math.max(2, Math.round(draft.density)));
	const folds = Math.min(16, Math.max(3, Math.round(draft.folds)));
	const rOut = tile * .33;
	const rIn = rOut * Math.min(.72, Math.max(.3, draft.inset));
	const centers = [
		[tile / 2, tile / 2],
		[0, 0],
		[tile, 0],
		[0, tile],
		[tile, tile]
	];
	const rings = centers.map(([x, y]) => polygonPath(x, y, rOut * 1.05, folds, draft.rotation + 180 / folds)).join("");
	const stars = centers.map(([x, y]) => starPath(x, y, rOut, rIn, folds, draft.rotation)).join("");
	const petals = centers.map(([x, y]) => starPath(x, y, rOut * .48, rIn * .46, folds, draft.rotation + 180 / folds)).join("");
	const cx = board / 2;
	const cy = board / 2;
	const R = tile * .78;
	return {
		tile,
		board,
		rings,
		stars,
		petals,
		medallionRing: polygonPath(cx, cy, R, folds, draft.rotation),
		medallionStar: starPath(cx, cy, R * .86, R * draft.inset * .86, folds, draft.rotation),
		medallionPetal: starPath(cx, cy, R * .42, R * .42 * draft.inset, folds, draft.rotation + 180 / folds)
	};
}
function motifSvg(draft, name) {
	const motif = buildMotif(draft);
	const weight = draft.weight.toFixed(2);
	const title = name.trim() || "أفق";
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${motif.board} ${motif.board}" width="${motif.board}" height="${motif.board}">
  <title>${escapeXml(title)}</title>
  <rect width="100%" height="100%" fill="#101614"/>
  <defs>
    <pattern id="cell" width="${motif.tile}" height="${motif.tile}" patternUnits="userSpaceOnUse">
      <path d="${motif.rings}" fill="none" stroke="#31403A" stroke-width="${(draft.weight * 2.2).toFixed(2)}"/>
      <path d="${motif.stars}" fill="none" stroke="#C6A56A" stroke-width="${weight}" stroke-linejoin="round"/>
      <path d="${motif.petals}" fill="none" stroke="#A39888" stroke-width="${(draft.weight * .75).toFixed(2)}" stroke-linejoin="round"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#cell)"/>
  <path d="${motif.medallionRing}" fill="none" stroke="#E4D2A6" stroke-width="${(draft.weight * .7).toFixed(2)}"/>
  <path d="${motif.medallionStar}" fill="none" stroke="#C6A56A" stroke-width="${(draft.weight * 1.35).toFixed(2)}" stroke-linejoin="round"/>
  <path d="${motif.medallionPetal}" fill="none" stroke="#F3EEE4" stroke-width="${(draft.weight * .8).toFixed(2)}" stroke-linejoin="round"/>
</svg>`;
}
function escapeXml(value) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
function Atelier() {
	const draft = useAfaq((state) => state.patternDraft);
	const setPatternDraft = useAfaq((state) => state.setPatternDraft);
	const name = useAfaq((state) => state.patternName);
	const setPatternName = useAfaq((state) => state.setPatternName);
	const savePattern = useAfaq((state) => state.savePattern);
	const motif = buildMotif(draft);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[18rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-brass",
						children: "المشغل"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-4xl",
						children: "زخرفة نجمية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-mist",
						children: "تماثل يُرسم من عدد الطيّات. الشبكة تتكرر، والنجمة في الوسط تتحرك ببطء."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "mb-2 text-sm text-mist",
					children: "الطيّات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: FOLD_OPTIONS.map((folds) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPatternDraft({ folds }),
						className: cn("h-11 min-w-11 rounded-full border px-3 text-sm tabular-nums", draft.folds === folds ? "border-brass bg-brass text-ink" : "border-line bg-panel text-parchment"),
						children: arNum(folds)
					}, folds))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "mb-2 text-sm text-mist",
					children: "أمثلة"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: PATTERN_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "line",
						onClick: () => {
							setPatternDraft(preset.draft);
							setPatternName(preset.name);
						},
						children: preset.name
					}, preset.name))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					label: "الدوران",
					min: 0,
					max: 180,
					step: 1,
					value: draft.rotation,
					display: `${arNum(Math.round(draft.rotation))}°`,
					onChange: (rotation) => setPatternDraft({ rotation })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					label: "ثقل الخط",
					min: .8,
					max: 3,
					step: .1,
					value: draft.weight,
					display: arNum(draft.weight.toFixed(1)),
					onChange: (weight) => setPatternDraft({ weight })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					label: "ضيق الداخل",
					min: .32,
					max: .68,
					step: .01,
					value: draft.inset,
					display: arNum(draft.inset.toFixed(2)),
					onChange: (inset) => setPatternDraft({ inset })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "mb-2 text-sm text-mist",
					children: "كثافة التكرار"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						2,
						3,
						4
					].map((density) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPatternDraft({ density }),
						className: cn("h-11 flex-1 rounded-full border text-sm", draft.density === density ? "border-brass bg-brass text-ink" : "border-line bg-panel text-parchment"),
						children: arNum(density)
					}, density))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm text-mist",
					children: ["اسم اللوحة", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: cn(fieldClass, "mt-2"),
						value: name,
						onChange: (event) => setPatternName(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "brass",
						onClick: () => {
							savePattern();
						},
						children: "احفظ في الأرشيف"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "line",
						onClick: () => downloadText(`${name || "afaq"}.svg`, motifSvg(draft, name), "image/svg+xml"),
						children: "نزّل SVG"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-2xl border border-line bg-ink",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: `0 0 ${motif.board} ${motif.board}`,
				className: "h-auto w-full",
				role: "img",
				"aria-label": name,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
						id: "afaq-cell",
						width: motif.tile,
						height: motif.tile,
						patternUnits: "userSpaceOnUse",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: motif.rings,
								fill: "none",
								stroke: "#31403a",
								strokeWidth: draft.weight * 2.2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: motif.stars,
								fill: "none",
								stroke: "#c6a56a",
								strokeWidth: draft.weight,
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: motif.petals,
								fill: "none",
								stroke: "#a39888",
								strokeWidth: draft.weight * .75,
								strokeLinejoin: "round"
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: motif.board,
						height: motif.board,
						fill: "#101614"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: motif.board,
						height: motif.board,
						fill: "url(#afaq-cell)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "afaq-turn",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: motif.medallionRing,
								fill: "none",
								stroke: "#e4d2a6",
								strokeWidth: draft.weight * .7
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: motif.medallionStar,
								fill: "none",
								stroke: "#c6a56a",
								strokeWidth: draft.weight * 1.35,
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: motif.medallionPetal,
								fill: "none",
								stroke: "#f3eee4",
								strokeWidth: draft.weight * .8,
								strokeLinejoin: "round"
							})
						]
					})
				]
			})
		})]
	});
}
function Slider({ label, min, max, step, value, display, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm text-mist",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center justify-between",
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-parchment tabular-nums",
				children: display
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: "mt-2 w-full",
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (event) => onChange(Number(event.target.value))
		})]
	});
}
function Atlas() {
	const nodes = useAfaq((state) => state.nodes);
	const links = useAfaq((state) => state.links);
	const addNode = useAfaq((state) => state.addNode);
	const moveNode = useAfaq((state) => state.moveNode);
	const updateNode = useAfaq((state) => state.updateNode);
	const deleteNode = useAfaq((state) => state.deleteNode);
	const toggleLink = useAfaq((state) => state.toggleLink);
	const [label, setLabel] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(nodes[0]?.id ?? null);
	const [armed, setArmed] = (0, import_react.useState)(null);
	const svgRef = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)(null);
	const current = nodes.find((node) => node.id === selected) ?? null;
	function point(event) {
		const svg = svgRef.current;
		if (!svg) return {
			x: 50,
			y: 50
		};
		const rect = svg.getBoundingClientRect();
		return {
			x: (event.clientX - rect.left) / rect.width * 100,
			y: (event.clientY - rect.top) / rect.height * 100
		};
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-brass",
				children: "الأطلس"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl md:text-5xl",
				children: "جوار الأفكار"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-mist",
				children: "اسحب العقدة لتضعها. اضغط «اربط» ثم عقدة أخرى لتشق بينهما خطًا، أو لتمسحه إن كان قائمًا."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-hidden rounded-2xl border border-line bg-ink-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					ref: svgRef,
					viewBox: "0 0 100 70",
					className: "h-auto min-h-80 w-full touch-none",
					onPointerMove: (event) => {
						if (!drag.current) return;
						const pos = point(event);
						drag.current.moved = true;
						moveNode(drag.current.id, pos.x, pos.y);
					},
					onPointerUp: () => {
						drag.current = null;
					},
					onPointerLeave: () => {
						drag.current = null;
					},
					children: [links.map((link) => {
						const [a, b] = link.split("|");
						const from = nodes.find((node) => node.id === a);
						const to = nodes.find((node) => node.id === b);
						if (!from || !to) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: from.x,
							y1: from.y * .7,
							x2: to.x,
							y2: to.y * .7,
							stroke: "#c6a56a",
							strokeWidth: .35
						}, link);
					}), nodes.map((node) => {
						const y = node.y * .7;
						const on = node.id === selected;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "cursor-pointer",
							onPointerDown: (event) => {
								event.currentTarget.setPointerCapture(event.pointerId);
								drag.current = {
									id: node.id,
									moved: false
								};
								setSelected(node.id);
							},
							onPointerUp: () => {
								if (drag.current?.moved) return;
								if (armed && armed !== node.id) {
									toggleLink(armed, node.id);
									setArmed(null);
								}
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: node.x,
									cy: y,
									r: 5.5,
									fill: "transparent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: node.x,
									cy: y,
									r: on ? 2.3 : 1.7,
									fill: armed === node.id ? "#e4d2a6" : "#c6a56a",
									stroke: on ? "#f3eee4" : "none",
									strokeWidth: .35
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: node.x,
									y: y + 4.4,
									textAnchor: "middle",
									fill: "#f3eee4",
									fontSize: 2.5,
									fontFamily: "Amiri, serif",
									children: node.label
								})
							]
						}, node.id);
					})]
				})
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rounded-2xl border border-line bg-panel p-4",
				onSubmit: (event) => {
					event.preventDefault();
					addNode(label, note);
					setLabel("");
					setNote("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "عقدة جديدة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: cn(fieldClass, "mt-3"),
						value: label,
						placeholder: "اسم قصير",
						onChange: (event) => setLabel(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: cn(areaClass, "mt-3 min-h-24 text-base"),
						value: note,
						placeholder: "جملة عن جوارها",
						onChange: (event) => setNote(event.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						variant: "brass",
						type: "submit",
						disabled: !label.trim(),
						children: "أضف"
					})
				]
			}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-panel p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "المحددة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: cn(fieldClass, "mt-3"),
						value: current.label,
						onChange: (event) => updateNode(current.id, { label: event.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: cn(areaClass, "mt-3 min-h-28 text-base"),
						value: current.note,
						onChange: (event) => updateNode(current.id, { note: event.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: armed === current.id ? "brass" : "line",
							onClick: () => setArmed((value) => value === current.id ? null : current.id),
							children: armed === current.id ? "اختر الطرف الآخر" : "اربط"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "quiet",
							onClick: () => deleteNode(current.id),
							children: "احذف"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "لا عقدة بعد. أضف اسمًا يبدأ به الجوار."
			})]
		})]
	});
}
var SPARKS = [
	"وضعتُ المفتاح حيث يراه الضوء لا حيث أذكر أني تركته.",
	"للغرفة جهة رابعة لا تفتح إلا إذا سكتَ الحديث.",
	"عدّيتُ النوافذ ولم أعدّ ما يمرّ بينها.",
	"قال الرمل للزجاج: أنا أيضًا كنتُ شفافًا قبل أن أتكاثر.",
	"ما تبقّى من النهار خطّ على حافة الفنجان.",
	"أكتب لأؤجّل المعنى، لا لأقبض عليه.",
	"القمر الليلة منخفض كمن ينحني ليسمع.",
	"في الجيب ورقة لا أقرأها كي لا تنتهي.",
	"الباب الذي لا يصرّ أخون ذاكرتي حين أمرّ به.",
	"سمّيتُ المسافة باسم من عبرها مرة واحدة.",
	"الظل أصدق من الشجرة حين تميل الشمس.",
	"أُبقي السطر الأخير فارغًا عن عمد."
];
function nextSpark(body) {
	return SPARKS[Math.abs(hash(body)) % SPARKS.length] ?? SPARKS[0];
}
function hash(value) {
	let h = 0;
	for (let i = 0; i < value.length; i++) h = h * 31 + value.charCodeAt(i) | 0;
	return h;
}
var FORMS = [
	{
		id: "حر",
		hint: "بلا عدّ"
	},
	{
		id: "مقطع",
		hint: "أربعة أسطر"
	},
	{
		id: "ثلاثي",
		hint: "ثلاث وقفات"
	},
	{
		id: "نثر",
		hint: "جملة طويلة"
	}
];
function Diwan() {
	const draft = useAfaq((state) => state.poemDraft);
	const setPoemDraft = useAfaq((state) => state.setPoemDraft);
	const savePoem = useAfaq((state) => state.savePoem);
	const poems = useAfaq((state) => state.poems);
	const words = countWords(draft.body);
	const lines = draft.body ? draft.body.split("\n").length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-brass",
				children: "الديوان"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl md:text-5xl",
				children: "مكتب الكتابة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: FORMS.map((form) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setPoemDraft({ form: form.id }),
					className: cn("h-11 rounded-full border px-4 text-sm", draft.form === form.id ? "border-brass bg-brass text-ink" : "border-line bg-panel text-parchment"),
					children: [form.id, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("ms-2 text-xs", draft.form === form.id ? "text-ink/70" : "text-mist"),
						children: form.hint
					})]
				}, form.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block text-sm text-mist",
				children: ["العنوان", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: cn(fieldClass, "mt-2"),
					value: draft.title,
					placeholder: "بلا عنوان إن شئت",
					onChange: (event) => setPoemDraft({ title: event.target.value })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: cn(areaClass, "mt-4"),
				dir: "auto",
				value: draft.body,
				placeholder: "اكتب هنا. السطر الذي يفسّر سابقه مرشّح للحذف.",
				onChange: (event) => setPoemDraft({ body: event.target.value })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-3 text-sm text-mist",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [arNum(words), " كلمة"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [arNum(lines), " سطر"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hintFor(draft.form, lines) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "brass",
						disabled: !draft.body.trim(),
						onClick: savePoem,
						children: "احفظ نسخة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "line",
						onClick: () => {
							const line = nextSpark(draft.body);
							const body = draft.body.trim() ? `${draft.body.replace(/\s+$/, "")}\n${line}` : line;
							setPoemDraft({ body });
						},
						children: "سطر يقدح"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "quiet",
						onClick: () => setPoemDraft({
							title: "",
							body: "",
							form: draft.form
						}),
						children: "امسح المسودة"
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-2xl border border-line bg-panel p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "آخر ما حُفظ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 flex flex-col gap-3",
				children: [poems.slice(0, 4).map((poem) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-b border-line pb-3 last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-brass",
							children: poem.form
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: poem.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-3 text-sm text-mist",
							children: poem.body
						})
					]
				}, poem.id)), poems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-mist",
					children: "الأرشيف فارغ. الحفظ يصنع النسخة، ولا يمسح المسودة."
				})]
			})]
		})]
	});
}
function hintFor(form, lines) {
	if (form === "مقطع") return lines === 4 ? "أربعة أسطر. تمام العدد." : "المقطع هنا أربعة أسطر.";
	if (form === "ثلاثي") return lines === 3 ? "ثلاث وقفات. تمام العدد." : "الثلاثي هنا ثلاثة أسطر.";
	if (form === "نثر") return "جملة تتسع، بلا قافية مفروضة.";
	return "حرّ: لا عدّ يُلزمك.";
}
var ctx = null;
function audioContext() {
	if (!ctx) ctx = new AudioContext();
	return ctx;
}
async function unlockAudio() {
	const context = audioContext();
	if (context.state === "suspended") await context.resume();
}
function frequencyFor(tonicMidi, degree) {
	return 440 * 2 ** ((tonicMidi + degree.semis + degree.cents / 100 - 69) / 12);
}
function playTone(freq, when, duration) {
	const context = audioContext();
	const osc = context.createOscillator();
	const overtone = context.createOscillator();
	const overtoneGain = context.createGain();
	const filter = context.createBiquadFilter();
	const gain = context.createGain();
	osc.type = "triangle";
	overtone.type = "sine";
	osc.frequency.setValueAtTime(freq, when);
	overtone.frequency.setValueAtTime(freq * 2, when);
	overtoneGain.gain.setValueAtTime(.16, when);
	filter.type = "lowpass";
	filter.frequency.setValueAtTime(1600, when);
	filter.Q.setValueAtTime(.5, when);
	osc.connect(filter);
	overtone.connect(overtoneGain);
	overtoneGain.connect(filter);
	filter.connect(gain);
	gain.connect(context.destination);
	const peak = .15;
	gain.gain.setValueAtTime(1e-4, when);
	gain.gain.exponentialRampToValueAtTime(peak, when + .02);
	gain.gain.exponentialRampToValueAtTime(1e-4, when + Math.max(.12, duration));
	osc.start(when);
	overtone.start(when);
	const stopAt = when + duration + .04;
	osc.stop(stopAt);
	overtone.stop(stopAt);
}
var KEYS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8"
];
function MaqamLab() {
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
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [playhead, setPlayhead] = (0, import_react.useState)(null);
	const stepsRef = (0, import_react.useRef)(steps);
	const bpmRef = (0, import_react.useRef)(bpm);
	const maqamRef = (0, import_react.useRef)(maqam);
	const tonicRef = (0, import_react.useRef)(tonic);
	stepsRef.current = steps;
	bpmRef.current = bpm;
	maqamRef.current = maqam;
	tonicRef.current = tonic;
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
			const index = KEYS.indexOf(event.key);
			if (index < 0) return;
			event.preventDefault();
			strike(index);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		let stopped = false;
		let step = 0;
		const context = new AudioContext();
		context.resume();
		let next = context.currentTime + .06;
		const timer = window.setInterval(() => {
			if (stopped) return;
			const seconds = 60 / bpmRef.current / 2;
			while (next < context.currentTime + .18) {
				const note = stepsRef.current[step];
				const degree = note == null ? void 0 : maqamRef.current.degrees[note];
				if (degree) {
					const freq = 440 * 2 ** ((tonicRef.current + degree.semis + degree.cents / 100 - 69) / 12);
					const osc = context.createOscillator();
					const gain = context.createGain();
					const filter = context.createBiquadFilter();
					osc.type = "triangle";
					osc.frequency.setValueAtTime(freq, next);
					filter.type = "lowpass";
					filter.frequency.setValueAtTime(1500, next);
					gain.gain.setValueAtTime(1e-4, next);
					gain.gain.exponentialRampToValueAtTime(.16, next + .02);
					gain.gain.exponentialRampToValueAtTime(1e-4, next + Math.min(.85, seconds * 1.5));
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
			context.close();
			setPlayhead(null);
		};
	}, [playing]);
	async function strike(index) {
		const degree = maqam.degrees[index];
		if (!degree) return;
		await unlockAudio();
		const context = audioContext();
		playTone(frequencyFor(tonic, degree), context.currentTime, .7);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-brass",
				children: "المقام"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl md:text-5xl",
				children: "مختبر السلالم"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm text-mist",
				children: "تقريب معدّل على اثنتي عشرة نغمة، مع إزاحة بالسنت حيث يلزم نصف البيمول. هذا لا يغني عن الربع طن الحي، لكنه يكفي لسماع المسافة ومقارنتها. المفاتيح ١ إلى ٨ تعزف الدرجات."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: MAQAMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMaqamId(item.id),
					className: cn("h-11 rounded-full border px-4 text-sm", item.id === maqamId ? "border-brass bg-brass text-ink" : "border-line bg-panel text-parchment"),
					children: item.name
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm text-parchment",
				children: maqam.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-mist",
					children: "الأساس"
				}), TONICS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTonic(item.midi),
					className: cn("h-11 min-w-11 rounded-full border px-3 text-sm", item.midi === tonic ? "border-brass bg-brass text-ink" : "border-line text-parchment"),
					children: item.name
				}, item.midi))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-4 gap-2 sm:grid-cols-8",
				dir: "ltr",
				children: maqam.degrees.map((degree, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void strike(index),
					className: "flex h-28 flex-col items-center justify-center rounded-2xl border border-line bg-panel px-1 text-center hover:border-brass",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg text-parchment",
							children: degree.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 text-xs text-brass tabular-nums",
							children: arNum(centsOf(degree))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-mist",
							children: arNum(index + 1)
						})
					]
				}, degree.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border border-line bg-panel p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "جملة من ثماني ضربات"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: playing ? "brass" : "line",
								onClick: () => setPlaying((value) => !value),
								children: playing ? "أوقف" : "شغّل"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "quiet",
								onClick: () => setSteps(Array(8).fill(null)),
								children: "امسح"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8",
						dir: "ltr",
						children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-xs text-mist",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn(playhead === index && "text-brass"),
								children: arNum(index + 1)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: cn("mt-1 h-11 w-full rounded-xl border bg-ink px-1 text-sm text-parchment", playhead === index ? "border-brass" : "border-line"),
								value: step == null ? "" : String(step),
								onChange: (event) => {
									const value = event.target.value;
									setStep(index, value === "" ? null : Number(value));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "سكت"
								}), maqam.degrees.map((degree, degreeIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: degreeIndex,
									children: degree.name
								}, degree.name))]
							})]
						}, index))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-sm text-mist",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex justify-between",
							children: ["السرعة", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-parchment tabular-nums",
								children: arNum(bpm)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "mt-2 w-full",
							type: "range",
							min: 60,
							max: 160,
							step: 1,
							value: bpm,
							onChange: (event) => setBpm(Number(event.target.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: cn(fieldClass, "max-w-xs"),
							value: melodyName,
							onChange: (event) => setMelodyName(event.target.value),
							"aria-label": "اسم الجملة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "brass",
							onClick: saveMelody,
							children: "احفظ الجملة"
						})]
					})
				]
			})
		]
	});
}
var STARS$1 = [
	{
		id: "zawia",
		name: "الزاوية",
		field: "هندسة",
		x: 16,
		y: 24,
		size: 5,
		body: "الزخرفة ليست حلية تُلصق على الجدار. هي طريقة لتوزيع الانتباه: حين يتكرر شكل بعدد معلوم، يصير للنظر إيقاع، وللصمت قياس.",
		practice: "افتح المشغل على تماثل ثماني، وغيّر نسبة الداخل قبل أن تغيّر اللون.",
		chamber: "atelier"
	},
	{
		id: "suha",
		name: "السها",
		field: "فلك",
		x: 30,
		y: 40,
		size: 3.5,
		body: "القمر لا يضيء من ذاته، ومع ذلك نؤرخ به. كثير مما نظنه مصدرًا هو سطح يعكس. العمر يُقاس بما يعكسه الشيء لا بما يدّعيه.",
		practice: "عد إلى العتبة واقرأ الطور قبل أن تقرأ الساعة.",
		chamber: "threshold"
	},
	{
		id: "qafia",
		name: "القافية",
		field: "شعر",
		x: 48,
		y: 18,
		size: 5,
		body: "البيت الجيد يغلق الباب بهدوء. لا تشرح الصورة، ولا تُكمل الظل نيابة عن القارئ. إذا احتجت جملة ثانية لتبرير الأولى، فالأولى لم تقف بعد.",
		practice: "في الديوان، اكتب أربعة أسطر ثم احذف السطر الذي يفسّر.",
		chamber: "diwan"
	},
	{
		id: "watar",
		name: "الوتر",
		field: "مقام",
		x: 66,
		y: 32,
		size: 4.5,
		body: "المقام ذاكرة أذن قبل أن يكون سلّمًا على الورق. المسافة بين درجتين تُحفظ في الحلق لا في الاسم. الاسم يجيء لاحقًا كعنوان لشيء سمعتَه.",
		practice: "في المختبر، اعزف راست ثم حجاز على الأساس نفسه، ولا تغيّر السرعة.",
		chamber: "maqam"
	},
	{
		id: "uqda",
		name: "العقدة",
		field: "فكر",
		x: 42,
		y: 56,
		size: 4,
		body: "الفكرة التي لا تجاور فكرة أخرى تضيع، لا لأنها ضعيفة، بل لأن الذاكرة مكان وليس قائمة. الأطلس اعتراف بالجوار، لا تصنيف للمكاتب.",
		practice: "أضف عقدتين واربطهما بجملة، لا بكلمة واحدة.",
		chamber: "atlas"
	},
	{
		id: "misann",
		name: "المِسنّ",
		field: "حرفة",
		x: 18,
		y: 70,
		size: 3.5,
		body: "الأداة الجيدة تُظهر مقاومة المادة. إن انساب كل شيء من اللمسة الأولى، فغالبًا لم تلمس المادة بعد، بل لمست فكرتك عنها.",
		practice: "في المشغل، زِد ثقل الخط حتى يضيق الفراغ، ثم تراجع خطوة.",
		chamber: "atelier"
	},
	{
		id: "diffa",
		name: "الضفّة",
		field: "طبيعة",
		x: 58,
		y: 68,
		size: 4,
		body: "حدّ الماء واليابسة يُعاد رسمه كل يوم، وهو مع ذلك حدّ. مسوداتك كذلك: تتغير، وتبقى ضفة. لا تنتظر النسخة الأخيرة كي تعترف أن للعمل شاطئًا.",
		practice: "احفظ في الأرشيف نسخة تعرف أنها ناقصة.",
		chamber: "archive"
	},
	{
		id: "jidhr",
		name: "الجذر",
		field: "لغة",
		x: 78,
		y: 52,
		size: 4.5,
		body: "الكلمة العربية تحمل عائلتها في حروفها. قبل أن تبحث عن مرادف، اسأل ما الذي يشترك فيه هذا الجذر، ومن جلس معه في البيت نفسه.",
		practice: "خذ كلمة من مسودتك وردّها إلى ثلاثة حروف، واكتب بيتًا من الجذر لا من المرادف.",
		chamber: "diwan"
	},
	{
		id: "raml",
		name: "الرمل",
		field: "زمن",
		x: 84,
		y: 22,
		size: 3.5,
		body: "الساعة الرملية صادقة لأنها لا تتظاهر بدقة لا تملكها. الليلة تكفي لعمل واحد يُحفظ. العشرة التي تُفتح معًا تُغلق معًا.",
		practice: "أغلق غرفة واحدة وفيها شيء محفوظ قبل أن تفتح غيرها.",
		chamber: "archive"
	}
];
var STAR_LINKS = [
	["zawia", "suha"],
	["suha", "misann"],
	["misann", "zawia"],
	["qafia", "uqda"],
	["uqda", "jidhr"],
	["jidhr", "qafia"],
	["watar", "diffa"],
	["diffa", "raml"],
	["raml", "watar"],
	["suha", "qafia"],
	["uqda", "watar"]
];
function Observatory() {
	const setChamber = useAfaq((state) => state.setChamber);
	const [activeId, setActiveId] = (0, import_react.useState)(STARS$1[0]?.id ?? "");
	const active = STARS$1.find((star) => star.id === activeId) ?? STARS$1[0];
	const byId = new Map(STARS$1.map((star) => [star.id, star]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-brass",
				children: "المرصد"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl text-parchment md:text-5xl",
				children: "نجوم المعارف"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-sm text-mist",
				children: "تسع نجوم، ثلاث صور. اختر نجمًا لتقرأ بطاقته، ثم انتقل إلى الغرفة التي يكملها."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-hidden rounded-2xl border border-line bg-ink-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "4 8 92 70",
					className: "aspect-[4/3] h-auto w-full",
					role: "img",
					"aria-label": "خريطة المرصد",
					children: [STAR_LINKS.map(([from, to]) => {
						const a = byId.get(from);
						const b = byId.get(to);
						if (!a || !b) return null;
						const hot = from === activeId || to === activeId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: a.x,
							y1: a.y,
							x2: b.x,
							y2: b.y,
							stroke: hot ? "#c6a56a" : "#31403a",
							strokeWidth: hot ? .35 : .22
						}, `${from}-${to}`);
					}), STARS$1.map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarPoint, {
						star,
						active: star.id === activeId,
						onSelect: () => setActiveId(star.id)
					}, star.id))]
				})
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "h-fit rounded-2xl border border-line bg-panel p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-brass",
					children: active.field
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl text-parchment",
					children: active.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base leading-relaxed text-parchment",
					children: active.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-mist",
					children: active.practice
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6",
					variant: "brass",
					onClick: () => setChamber(active.chamber),
					children: "انتقل إلى الغرفة"
				})
			]
		})]
	});
}
function StarPoint({ star, active, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		role: "button",
		tabIndex: 0,
		"aria-label": star.name,
		"aria-pressed": active,
		className: "cursor-pointer",
		onClick: onSelect,
		onKeyDown: (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				onSelect();
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: star.x,
				cy: star.y,
				r: 4.2,
				fill: "transparent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: star.x,
				cy: star.y,
				r: active ? star.size * .42 : star.size * .28,
				fill: active ? "#e4d2a6" : "#c6a56a"
			}),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: star.x,
				cy: star.y,
				r: star.size * .7,
				fill: "none",
				stroke: "#c6a56a",
				strokeWidth: .25
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: star.x,
				y: star.y + 5.2,
				textAnchor: "middle",
				fill: active ? "#f3eee4" : "#a39888",
				fontSize: 3.1,
				fontFamily: "Amiri, serif",
				children: star.name
			})
		]
	});
}
var SYNODIC = 29.530588853;
var NEW_MOON_EPOCH = Date.UTC(2e3, 0, 6, 18, 14, 0);
var HIJRI_MONTHS = [
	"محرم",
	"صفر",
	"ربيع الأول",
	"ربيع الآخر",
	"جمادى الأولى",
	"جمادى الآخرة",
	"رجب",
	"شعبان",
	"رمضان",
	"شوّال",
	"ذو القعدة",
	"ذو الحجة"
];
var WEEKDAYS = [
	"الأحد",
	"الاثنين",
	"الثلاثاء",
	"الأربعاء",
	"الخميس",
	"الجمعة",
	"السبت"
];
var GREG_MONTHS = [
	"يناير",
	"فبراير",
	"مارس",
	"أبريل",
	"مايو",
	"يونيو",
	"يوليو",
	"أغسطس",
	"سبتمبر",
	"أكتوبر",
	"نوفمبر",
	"ديسمبر"
];
/** Tabular civil Hijri (Kuwaiti algorithm). Month is 1–12. */
function gregorianToHijri(date) {
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	if (month < 3) {
		year -= 1;
		month += 12;
	}
	const century = Math.floor(year / 100);
	let gregorianShift = 2 - century + Math.floor(century / 4);
	if (year < 1583) gregorianShift = 0;
	let lunar = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + gregorianShift - 1524 - 1948440 + 10632;
	const cycles = Math.floor((lunar - 1) / 10631);
	lunar = lunar - 10631 * cycles + 354;
	const leap = Math.floor((10985 - lunar) / 5316) * Math.floor(50 * lunar / 17719) + Math.floor(lunar / 5670) * Math.floor(43 * lunar / 15238);
	lunar = lunar - Math.floor((30 - leap) / 15) * Math.floor(17719 * leap / 50) - Math.floor(leap / 16) * Math.floor(15238 * leap / 43) + 29;
	const hijriMonth = Math.floor(24 * lunar / 709);
	const hijriDay = lunar - Math.floor(709 * hijriMonth / 24);
	return {
		year: 30 * cycles + leap - 30,
		month: hijriMonth,
		day: hijriDay
	};
}
function moonAgeDays(date) {
	return ((date.getTime() - NEW_MOON_EPOCH) / 864e5 % SYNODIC + SYNODIC) % SYNODIC;
}
function illumination(ageDays) {
	return (1 - Math.cos(2 * Math.PI * ageDays / SYNODIC)) / 2;
}
function phaseName(ageDays) {
	const age = (ageDays % SYNODIC + SYNODIC) % SYNODIC;
	if (age < 1.85) return "محاق";
	if (age < 7.38) return "هلال متزايد";
	if (age < 9.22) return "تربيع أول";
	if (age < 14.77) return "أحدب متزايد";
	if (age < 16.61) return "بدر";
	if (age < 22.15) return "أحدب متناقص";
	if (age < 23.99) return "تربيع ثان";
	if (age < 27.68) return "هلال متناقص";
	return "محاق";
}
function mulberry32(seed) {
	let a = seed;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function makeStars(count) {
	const rand = mulberry32(1448);
	return Array.from({ length: count }, () => ({
		x: rand() * 1e3,
		y: rand() * 640,
		r: .6 + rand() * 1.6,
		delay: rand() * -6,
		a: .35 + rand() * .65
	}));
}
var STARS = makeStars(120);
function NightField({ age }) {
	const phase = (age % SYNODIC + SYNODIC) % SYNODIC / SYNODIC;
	const radius = 52;
	const offset = (phase <= .5 ? -phase : 1 - phase) * 4 * radius;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "absolute inset-0 h-full w-full",
		viewBox: "0 0 1000 640",
		preserveAspectRatio: "xMidYMid slice",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: "afaq-sky",
				cx: "50%",
				cy: "18%",
				r: "75%",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#1a2420"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#101614"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: "afaq-moon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "180",
					cy: "148",
					r: radius
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "1000",
				height: "640",
				fill: "url(#afaq-sky)"
			}),
			STARS.map((star, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "afaq-star",
				cx: star.x,
				cy: star.y,
				r: star.r,
				fill: "#f3eee4",
				style: {
					animationDelay: `${star.delay}s`,
					opacity: star.a
				}
			}, index)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "afaq-turn",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "720",
						cy: "250",
						rx: "92",
						ry: "36",
						fill: "none",
						stroke: "#c6a56a",
						strokeOpacity: "0.35"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "720",
						cy: "250",
						rx: "74",
						ry: "30",
						fill: "none",
						stroke: "#c6a56a",
						strokeOpacity: "0.28",
						transform: "rotate(28 720 250)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "720",
						cy: "250",
						rx: "110",
						ry: "22",
						fill: "none",
						stroke: "#c6a56a",
						strokeOpacity: "0.22",
						transform: "rotate(-18 720 250)"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				clipPath: "url(#afaq-moon)",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "120",
					y: "90",
					width: "120",
					height: "120",
					fill: "#f3eee4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 180 + offset,
					cy: "148",
					r: 53,
					fill: "#24302b"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "180",
				cy: "148",
				r: radius,
				fill: "none",
				stroke: "#c6a56a",
				strokeWidth: "1.6"
			})
		]
	});
}
function useNow(intervalMs = 3e4) {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(/* @__PURE__ */ new Date());
		tick();
		const id = window.setInterval(tick, intervalMs);
		return () => window.clearInterval(id);
	}, [intervalMs]);
	return now;
}
function Threshold() {
	const now = useNow();
	const setChamber = useAfaq((state) => state.setChamber);
	const age = now ? moonAgeDays(now) : null;
	const hijri = now ? gregorianToHijri(now) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-svh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightField, { age: age ?? 14.8 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto max-w-6xl px-4 pt-10 pb-20 md:pt-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-brass",
					children: "مرصد شخصي للعمل البطيء"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-6xl leading-none text-parchment md:text-8xl",
					children: "أفق"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl font-display text-2xl leading-snug text-parchment md:text-3xl",
					children: "هنا ترصد الفكرة، وترسم تماثلها، وتكتب بيتها، وتسمع مقامها، ثم تحفظ ما يبقى."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "الميلادي",
							value: now ? `${WEEKDAYS[now.getDay()]} ${arNum(now.getDate())} ${GREG_MONTHS[now.getMonth()]} ${arNum(now.getFullYear())}` : "…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "الهجري",
							value: hijri ? `${arNum(hijri.day)} ${HIJRI_MONTHS[hijri.month - 1] ?? ""} ${arNum(hijri.year)}` : "…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "الطور",
							value: age == null ? "…" : `${phaseName(age)} · ${arNum(Math.round(illumination(age) * 100))}٪`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "الساعة",
							value: now ? `${twoAr(now.getHours())}:${twoAr(now.getMinutes())}` : "…"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-xl text-sm text-mist",
					children: "الحساب فلكي تقريبي للطور، وجدولي للتاريخ الهجري. عملك يُحفظ في هذا المتصفح وحدَه."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-12 border-y border-line",
					children: CHAMBERS.filter((item) => item.id !== "threshold").map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-line last:border-b-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setChamber(item.id),
							className: "flex w-full flex-wrap items-baseline gap-x-4 gap-y-1 py-4 text-start transition-colors hover:bg-panel/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-12 font-display text-2xl text-brass",
									children: arNum(index + 1).padStart(2, "٠")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-3xl text-parchment",
									children: item.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-mist",
									children: item.hint
								})
							]
						})
					}, item.id))
				})
			]
		})]
	});
}
function Info({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-36 rounded-2xl border border-line bg-ink/70 px-4 py-3 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-brass",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm text-parchment tabular-nums",
			children: value
		})]
	});
}
var ICONS = {
	threshold: Moon,
	sky: Compass,
	atelier: Hexagon,
	diwan: PenLine,
	maqam: AudioLines,
	atlas: Waypoints,
	archive: Library
};
function Shell() {
	const chamber = useAfaq((state) => state.chamber);
	const setChamber = useAfaq((state) => state.setChamber);
	(0, import_react.useEffect)(() => {
		useAfaq.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		document.title = chamber === "threshold" ? "أفق" : `أفق · ${chamberLabel(chamber)}`;
	}, [chamber]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-svh bg-ink text-parchment",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-line bg-ink/85 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setChamber("threshold"),
					className: "flex shrink-0 items-baseline gap-2 rounded-full pe-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-3xl leading-none text-brass",
						children: "أفق"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs text-mist sm:inline",
						children: "مرصد شخصي"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "nav-scroll flex flex-1 gap-1 overflow-x-auto",
					"aria-label": "غرف الأفق",
					children: CHAMBERS.filter((item) => item.id !== "threshold").map((item) => {
						const Icon = ICONS[item.id];
						const active = chamber === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-current": active ? "page" : void 0,
							onClick: () => setChamber(item.id),
							className: cn("inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm transition-colors", active ? "bg-brass text-ink" : "text-mist hover:bg-panel hover:text-parchment"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4",
								"aria-hidden": "true"
							}), item.label]
						}, item.id);
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			chamber === "threshold" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Threshold, {}),
			chamber === "sky" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Observatory, {}),
			chamber === "atelier" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atelier, {}),
			chamber === "diwan" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diwan, {}),
			chamber === "maqam" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaqamLab, {}),
			chamber === "atlas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atlas, {}),
			chamber === "archive" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRoom, {})
		] })]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
//#endregion
export { Home as component };
