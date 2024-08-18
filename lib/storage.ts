import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key);
  try {
    return value ? JSON.parse(value) || null : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

export function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export function removeItem(key: string) {
  storage.delete(key);
}

const TAG_KEY = "tags";

export type Tag = {
  id: string;
  title: string;
};

export async function getTags(): Promise<Tag[]> {
  const tagsString = await storage.getString(TAG_KEY);
  if (!tagsString) {
    return [];
  }
  return JSON.parse(tagsString) as Tag[];
}

export async function setTags(tags: Tag[]): Promise<void> {
  await storage.set(TAG_KEY, JSON.stringify(tags));
}

export async function deleteTag(id: string): Promise<void> {
  const tags = await getTags();
  const updatedTags = tags.filter((tag) => tag.id !== id);
  await setTags(updatedTags);
}

const TIMER_KEY = "timers";

export type Timer = {
  id: string;
  tagId: string;
  title: string;
  duration: number;
  timeRemaining: number;
  isRunning: boolean;
};

export async function getTimers(): Promise<Timer[]> {
  const timersString = await storage.getString(TIMER_KEY);
  if (!timersString) {
    return [];
  }
  return JSON.parse(timersString) as Timer[];
}

export async function setTimers(timers: Timer[]): Promise<void> {
  await storage.set(TIMER_KEY, JSON.stringify(timers));
}

export async function deleteTimer(id: string): Promise<void> {
  const timers = await getTimers();
  const updatedTimers = timers.filter((timer) => timer.id !== id);
  await setTimers(updatedTimers);
}
