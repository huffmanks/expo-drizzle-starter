import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatColonTime(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const colonNotation = [
    hours > 0 ? String(hours) : null,
    hours > 0 || minutes > 0 ? String(minutes).padStart(2, "0") : null,
    String(seconds).padStart(2, "0"),
  ]
    .filter(Boolean)
    .join(":");

  return colonNotation;
}
export function formatLabelTime(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const labeledTime = [
    hours > 0 ? `${hours}h` : null,
    hours > 0 || minutes > 0 ? `${String(minutes).padStart(2, "0")}m` : null,
    `${String(seconds).padStart(2, "0")}s`,
  ]
    .filter(Boolean)
    .join(" ");

  return labeledTime;
}

export function parseTimeInput(input: string): number {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  const length = input.length;
  if (length >= 1) {
    seconds = parseInt(input.slice(-2));
  }
  if (length >= 3) {
    minutes = parseInt(input.slice(-4, -2));
  }
  if (length >= 5) {
    hours = parseInt(input.slice(0, -4));
  }

  return hours * 3600 + minutes * 60 + seconds;
}
