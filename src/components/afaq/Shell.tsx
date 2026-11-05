import { useEffect } from "react";
import {
  AudioLines,
  Compass,
  Hexagon,
  Library,
  Moon,
  PenLine,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArchiveRoom } from "@/components/afaq/ArchiveRoom";
import { Atelier } from "@/components/afaq/Atelier";
import { Atlas } from "@/components/afaq/Atlas";
import { Diwan } from "@/components/afaq/Diwan";
import { MaqamLab } from "@/components/afaq/MaqamLab";
import { Observatory } from "@/components/afaq/Observatory";
import { Threshold } from "@/components/afaq/Threshold";
import { chamberLabel, useAfaq } from "@/lib/afaq/store";
import type { ChamberId } from "@/lib/afaq/types";
import { CHAMBERS } from "@/lib/afaq/types";
import { cn } from "@/lib/utils";

const ICONS: Record<ChamberId, LucideIcon> = {
  threshold: Moon,
  sky: Compass,
  atelier: Hexagon,
  diwan: PenLine,
  maqam: AudioLines,
  atlas: Waypoints,
  archive: Library,
};

export function Shell() {
  const chamber = useAfaq((state) => state.chamber);
  const setChamber = useAfaq((state) => state.setChamber);

  useEffect(() => {
    void useAfaq.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.title = chamber === "threshold" ? "أفق" : `أفق · ${chamberLabel(chamber)}`;
  }, [chamber]);

  return (
    <div className="min-h-svh bg-ink text-parchment">
      <header className="sticky top-0 z-30 border-b border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => setChamber("threshold")}
            className="flex shrink-0 items-baseline gap-2 rounded-full pe-2"
          >
            <span className="font-display text-3xl leading-none text-brass">أفق</span>
            <span className="hidden text-xs text-mist sm:inline">مرصد شخصي</span>
          </button>
          <nav className="nav-scroll flex flex-1 gap-1 overflow-x-auto" aria-label="غرف الأفق">
            {CHAMBERS.filter((item) => item.id !== "threshold").map((item) => {
              const Icon = ICONS[item.id];
              const active = chamber === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setChamber(item.id)}
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm transition-colors",
                    active ? "bg-brass text-ink" : "text-mist hover:bg-panel hover:text-parchment",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>
      <main>
        {chamber === "threshold" && <Threshold />}
        {chamber === "sky" && <Observatory />}
        {chamber === "atelier" && <Atelier />}
        {chamber === "diwan" && <Diwan />}
        {chamber === "maqam" && <MaqamLab />}
        {chamber === "atlas" && <Atlas />}
        {chamber === "archive" && <ArchiveRoom />}
      </main>
    </div>
  );
}
