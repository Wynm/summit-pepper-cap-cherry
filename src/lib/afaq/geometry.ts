import type { PatternDraft } from "@/lib/afaq/types";

export const FOLD_OPTIONS = [4, 5, 6, 8, 10, 12] as const;

export const PATTERN_PRESETS: { name: string; draft: PatternDraft }[] = [
  { name: "ثمانية", draft: { folds: 8, rotation: 0, weight: 1.4, inset: 0.46, density: 3 } },
  { name: "سداسية", draft: { folds: 6, rotation: 0, weight: 1.35, inset: 0.5, density: 3 } },
  { name: "عشرية", draft: { folds: 10, rotation: 8, weight: 1.15, inset: 0.4, density: 2 } },
  { name: "رباعية", draft: { folds: 4, rotation: 0, weight: 1.8, inset: 0.56, density: 4 } },
  { name: "اثنا عشر", draft: { folds: 12, rotation: 0, weight: 1.05, inset: 0.38, density: 2 } },
  { name: "خماسية", draft: { folds: 5, rotation: 6, weight: 1.3, inset: 0.44, density: 2 } },
];

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

export function starPath(
  cx: number,
  cy: number,
  rOut: number,
  rIn: number,
  n: number,
  rot: number,
): string {
  const count = Math.max(3, n) * 2;
  let d = "";
  for (let i = 0; i < count; i++) {
    const r = i % 2 === 0 ? rOut : rIn;
    const [x, y] = polar(cx, cy, r, rot + (360 / count) * i);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d}Z`;
}

export function polygonPath(cx: number, cy: number, r: number, n: number, rot: number): string {
  const sides = Math.max(3, n);
  let d = "";
  for (let i = 0; i < sides; i++) {
    const [x, y] = polar(cx, cy, r, rot + (360 / sides) * i);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d}Z`;
}

export type Motif = {
  tile: number;
  board: number;
  rings: string;
  stars: string;
  petals: string;
  medallionRing: string;
  medallionStar: string;
  medallionPetal: string;
};

export function buildMotif(draft: PatternDraft): Motif {
  const tile = 240;
  const density = Math.min(4, Math.max(2, Math.round(draft.density)));
  const board = tile * density;
  const folds = Math.min(16, Math.max(3, Math.round(draft.folds)));
  const rOut = tile * 0.33;
  const rIn = rOut * Math.min(0.72, Math.max(0.3, draft.inset));
  const centers: [number, number][] = [
    [tile / 2, tile / 2],
    [0, 0],
    [tile, 0],
    [0, tile],
    [tile, tile],
  ];

  const rings = centers
    .map(([x, y]) => polygonPath(x, y, rOut * 1.05, folds, draft.rotation + 180 / folds))
    .join("");
  const stars = centers.map(([x, y]) => starPath(x, y, rOut, rIn, folds, draft.rotation)).join("");
  const petals = centers
    .map(([x, y]) =>
      starPath(x, y, rOut * 0.48, rIn * 0.46, folds, draft.rotation + 180 / folds),
    )
    .join("");

  const cx = board / 2;
  const cy = board / 2;
  const R = tile * 0.78;
  return {
    tile,
    board,
    rings,
    stars,
    petals,
    medallionRing: polygonPath(cx, cy, R, folds, draft.rotation),
    medallionStar: starPath(cx, cy, R * 0.86, R * draft.inset * 0.86, folds, draft.rotation),
    medallionPetal: starPath(
      cx,
      cy,
      R * 0.42,
      R * 0.42 * draft.inset,
      folds,
      draft.rotation + 180 / folds,
    ),
  };
}

export function motifSvg(draft: PatternDraft, name: string): string {
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
      <path d="${motif.petals}" fill="none" stroke="#A39888" stroke-width="${(draft.weight * 0.75).toFixed(2)}" stroke-linejoin="round"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#cell)"/>
  <path d="${motif.medallionRing}" fill="none" stroke="#E4D2A6" stroke-width="${(draft.weight * 0.7).toFixed(2)}"/>
  <path d="${motif.medallionStar}" fill="none" stroke="#C6A56A" stroke-width="${(draft.weight * 1.35).toFixed(2)}" stroke-linejoin="round"/>
  <path d="${motif.medallionPetal}" fill="none" stroke="#F3EEE4" stroke-width="${(draft.weight * 0.8).toFixed(2)}" stroke-linejoin="round"/>
</svg>`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&" + "amp;")
    .replaceAll("<", "&" + "lt;")
    .replaceAll(">", "&" + "gt;")
    .replaceAll('"', "&" + "quot;");
}
