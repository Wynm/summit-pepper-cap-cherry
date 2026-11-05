import { z } from "zod";
import type { AtlasNode, Melody, Poem, SavedPattern } from "@/lib/afaq/types";

const poemSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  body: z.string(),
  form: z.enum(["حر", "مقطع", "ثلاثي", "نثر"]),
  createdAt: z.number(),
});

const patternSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  createdAt: z.number(),
  folds: z.number(),
  rotation: z.number(),
  weight: z.number(),
  inset: z.number(),
  density: z.number(),
});

const melodySchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  maqamId: z.string(),
  tonic: z.number(),
  steps: z.array(z.number().nullable()).length(8),
  bpm: z.number(),
  createdAt: z.number(),
});

const nodeSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  note: z.string(),
  x: z.number(),
  y: z.number(),
});

export const backupSchema = z.object({
  version: z.literal(1),
  poems: z.array(poemSchema),
  patterns: z.array(patternSchema),
  melodies: z.array(melodySchema),
  nodes: z.array(nodeSchema),
  links: z.array(z.string()),
});

export type Backup = z.infer<typeof backupSchema>;

export function toBackup(input: {
  poems: Poem[];
  patterns: SavedPattern[];
  melodies: Melody[];
  nodes: AtlasNode[];
  links: string[];
}): Backup {
  return { version: 1, ...input };
}

export function readBackup(raw: unknown): { ok: true; data: Backup } | { ok: false; error: string } {
  const parsed = backupSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "الملف ليس أرشيف أفق." };
  return { ok: true, data: parsed.data };
}
