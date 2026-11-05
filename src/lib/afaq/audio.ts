import type { Degree } from "@/lib/afaq/maqamat";

let ctx: AudioContext | null = null;

export function audioContext(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export async function unlockAudio(): Promise<void> {
  const context = audioContext();
  if (context.state === "suspended") await context.resume();
}

export function frequencyFor(tonicMidi: number, degree: Degree): number {
  const midi = tonicMidi + degree.semis + degree.cents / 100;
  return 440 * 2 ** ((midi - 69) / 12);
}

export function playTone(freq: number, when: number, duration: number): void {
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
  overtoneGain.gain.setValueAtTime(0.16, when);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1600, when);
  filter.Q.setValueAtTime(0.5, when);

  osc.connect(filter);
  overtone.connect(overtoneGain);
  overtoneGain.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  const peak = 0.15;
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + Math.max(0.12, duration));

  osc.start(when);
  overtone.start(when);
  const stopAt = when + duration + 0.04;
  osc.stop(stopAt);
  overtone.stop(stopAt);
}
