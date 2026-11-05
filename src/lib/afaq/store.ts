import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Backup } from "@/lib/afaq/backup";
import {
  CHAMBERS,
  DEFAULT_PATTERN,
  DEFAULT_STEPS,
  type AtlasNode,
  type ChamberId,
  type Melody,
  type PatternDraft,
  type Poem,
  type PoemDraft,
  type PoemForm,
  type SavedPattern,
} from "@/lib/afaq/types";
import { uid } from "@/lib/utils";

type AfaqState = {
  chamber: ChamberId;
  poemDraft: PoemDraft;
  patternDraft: PatternDraft;
  patternName: string;
  maqamId: string;
  tonic: number;
  steps: Array<number | null>;
  bpm: number;
  melodyName: string;
  poems: Poem[];
  patterns: SavedPattern[];
  melodies: Melody[];
  nodes: AtlasNode[];
  links: string[];
  setChamber: (chamber: ChamberId) => void;
  setPoemDraft: (patch: Partial<PoemDraft>) => void;
  setPatternDraft: (patch: Partial<PatternDraft>) => void;
  setPatternName: (name: string) => void;
  setMaqamId: (id: string) => void;
  setTonic: (midi: number) => void;
  setSteps: (steps: Array<number | null>) => void;
  setStep: (index: number, value: number | null) => void;
  setBpm: (bpm: number) => void;
  setMelodyName: (name: string) => void;
  savePoem: () => void;
  deletePoem: (id: string) => void;
  openPoem: (id: string) => void;
  savePattern: () => void;
  deletePattern: (id: string) => void;
  openPattern: (id: string) => void;
  saveMelody: () => void;
  deleteMelody: (id: string) => void;
  openMelody: (id: string) => void;
  addNode: (label: string, note: string) => void;
  moveNode: (id: string, x: number, y: number) => void;
  updateNode: (id: string, patch: Partial<Pick<AtlasNode, "label" | "note">>) => void;
  deleteNode: (id: string) => void;
  toggleLink: (a: string, b: string) => void;
  replaceArchive: (backup: Backup) => void;
};

function linkKey(a: string, b: string): string {
  return [a, b].sort().join("|");
}

function spiral(index: number): { x: number; y: number } {
  const angle = index * 2.39996;
  const radius = 16 + (index % 6) * 6;
  return {
    x: clamp(50 + Math.cos(angle) * radius, 10, 90),
    y: clamp(48 + Math.sin(angle) * radius * 0.72, 14, 86),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const seedPoem: Poem = {
  id: "seed-poem",
  title: "عتبة",
  form: "مقطع",
  body: "أُبقي الباب موارباً\nكي يدخل الليل بلا استئذان،\nويضع على الطاولة\nقمرًا لم أطلبه.",
  createdAt: 1_730_000_000_000,
};

const seedPattern: SavedPattern = {
  id: "seed-pattern",
  name: "نجمة العتبة",
  createdAt: 1_730_000_100_000,
  ...DEFAULT_PATTERN,
};

const seedMelody: Melody = {
  id: "seed-melody",
  name: "خطو راست",
  maqamId: "rast",
  tonic: 60,
  steps: DEFAULT_STEPS,
  bpm: 92,
  createdAt: 1_730_000_200_000,
};

const seedNode: AtlasNode = {
  id: "seed-node",
  label: "عتبة الأفق",
  note: "ما أريد أن أعود إليه حين يتسع العمل.",
  x: 48,
  y: 46,
};

export const useAfaq = create<AfaqState>()(
  persist(
    (set, get) => ({
      chamber: "threshold",
      poemDraft: { title: "", body: "", form: "حر" },
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
      setPoemDraft: (patch) => set({ poemDraft: { ...get().poemDraft, ...patch } }),
      setPatternDraft: (patch) => set({ patternDraft: { ...get().patternDraft, ...patch } }),
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
        const poem: Poem = {
          id: uid("poem"),
          title: draft.title.trim() || "بلا عنوان",
          body: draft.body.trim(),
          form: draft.form,
          createdAt: Date.now(),
        };
        set({ poems: [poem, ...get().poems] });
      },
      deletePoem: (id) => set({ poems: get().poems.filter((poem) => poem.id !== id) }),
      openPoem: (id) => {
        const poem = get().poems.find((item) => item.id === id);
        if (!poem) return;
        set({
          poemDraft: { title: poem.title, body: poem.body, form: poem.form },
          chamber: "diwan",
        });
      },
      savePattern: () => {
        const name = get().patternName.trim() || "زخرفة";
        const saved: SavedPattern = {
          id: uid("pattern"),
          name,
          createdAt: Date.now(),
          ...get().patternDraft,
        };
        set({ patterns: [saved, ...get().patterns] });
      },
      deletePattern: (id) => set({ patterns: get().patterns.filter((item) => item.id !== id) }),
      openPattern: (id) => {
        const pattern = get().patterns.find((item) => item.id === id);
        if (!pattern) return;
        const { folds, rotation, weight, inset, density } = pattern;
        set({
          patternDraft: { folds, rotation, weight, inset, density },
          patternName: pattern.name,
          chamber: "atelier",
        });
      },
      saveMelody: () => {
        const melody: Melody = {
          id: uid("melody"),
          name: get().melodyName.trim() || "جملة",
          maqamId: get().maqamId,
          tonic: get().tonic,
          steps: get().steps.slice(),
          bpm: get().bpm,
          createdAt: Date.now(),
        };
        set({ melodies: [melody, ...get().melodies] });
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
          chamber: "maqam",
        });
      },
      addNode: (label, note) => {
        const text = label.trim();
        if (!text) return;
        const pos = spiral(get().nodes.length);
        const node: AtlasNode = {
          id: uid("node"),
          label: text,
          note: note.trim(),
          x: pos.x,
          y: pos.y,
        };
        set({ nodes: [...get().nodes, node] });
      },
      moveNode: (id, x, y) =>
        set({
          nodes: get().nodes.map((node) =>
            node.id === id ? { ...node, x: clamp(x, 6, 94), y: clamp(y, 10, 90) } : node,
          ),
        }),
      updateNode: (id, patch) =>
        set({
          nodes: get().nodes.map((node) => (node.id === id ? { ...node, ...patch } : node)),
        }),
      deleteNode: (id) =>
        set({
          nodes: get().nodes.filter((node) => node.id !== id),
          links: get().links.filter((link) => !link.split("|").includes(id)),
        }),
      toggleLink: (a, b) => {
        if (a === b) return;
        const key = linkKey(a, b);
        const links = get().links;
        set({
          links: links.includes(key) ? links.filter((link) => link !== key) : [...links, key],
        });
      },
      replaceArchive: (backup) =>
        set({
          poems: backup.poems,
          patterns: backup.patterns,
          melodies: backup.melodies,
          nodes: backup.nodes,
          links: backup.links,
        }),
    }),
    {
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
        links: state.links,
      }),
    },
  ),
);

export function chamberLabel(id: ChamberId): string {
  return CHAMBERS.find((item) => item.id === id)?.label ?? "أفق";
}

export type { PoemForm };
