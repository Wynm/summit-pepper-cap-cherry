export type ChamberId =
  | "threshold"
  | "sky"
  | "atelier"
  | "diwan"
  | "maqam"
  | "atlas"
  | "archive";

export type PoemForm = "حر" | "مقطع" | "ثلاثي" | "نثر";

export type Poem = {
  id: string;
  title: string;
  body: string;
  form: PoemForm;
  createdAt: number;
};

export type PatternDraft = {
  folds: number;
  rotation: number;
  weight: number;
  inset: number;
  density: number;
};

export type SavedPattern = PatternDraft & {
  id: string;
  name: string;
  createdAt: number;
};

export type Melody = {
  id: string;
  name: string;
  maqamId: string;
  tonic: number;
  steps: Array<number | null>;
  bpm: number;
  createdAt: number;
};

export type AtlasNode = {
  id: string;
  label: string;
  note: string;
  x: number;
  y: number;
};

export type PoemDraft = {
  title: string;
  body: string;
  form: PoemForm;
};

export const CHAMBERS: { id: ChamberId; label: string; hint: string }[] = [
  { id: "threshold", label: "العتبة", hint: "الليل والتاريخ والطور" },
  { id: "sky", label: "المرصد", hint: "نجوم معارف تُفتح" },
  { id: "atelier", label: "المشغل", hint: "زخرفة نجمية تُولَّد" },
  { id: "diwan", label: "الديوان", hint: "بيتٌ يُكتب ويُحفظ" },
  { id: "maqam", label: "المقام", hint: "سلالم تُسمع وتُرتَّب" },
  { id: "atlas", label: "الأطلس", hint: "أفكار تتجاور" },
  { id: "archive", label: "الأرشيف", hint: "ما بقي من شغلك" },
];

export const DEFAULT_PATTERN: PatternDraft = {
  folds: 8,
  rotation: 0,
  weight: 1.4,
  inset: 0.46,
  density: 3,
};

export const DEFAULT_STEPS: Array<number | null> = [0, 2, 3, 4, null, 4, 3, 2];
