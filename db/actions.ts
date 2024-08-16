import { eq } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";

import { tag, Tag, timer, Timer } from "./schema";

export const getTags = async (db: SQLJsDatabase | ExpoSQLiteDatabase): Promise<Tag[]> => {
  return db.select().from(tag).all();
};

export const getTagById = async (
  db: SQLJsDatabase | ExpoSQLiteDatabase,
  id: number
): Promise<Tag | undefined> => {
  return db.select().from(tag).where(eq(tag.id, id)).get();
};

export const updateTag = async (
  db: SQLJsDatabase | ExpoSQLiteDatabase,
  id: number,
  data: Partial<Tag>
) => {
  await db.update(tag).set(data).where(eq(tag.id, id));
};

export const deleteTag = async (db: SQLJsDatabase | ExpoSQLiteDatabase, id: number) => {
  await db.delete(tag).where(eq(tag.id, id));
};

export const getTimers = async (db: SQLJsDatabase | ExpoSQLiteDatabase): Promise<Timer[]> => {
  return db.select().from(timer).all();
};

export const getTimerById = async (
  db: SQLJsDatabase | ExpoSQLiteDatabase,
  id: number
): Promise<Timer | undefined> => {
  return db.select().from(timer).where(eq(timer.id, id)).get();
};

export const updateTimer = async (
  db: SQLJsDatabase | ExpoSQLiteDatabase,
  id: number,
  data: Partial<Timer>
) => {
  await db.update(timer).set(data).where(eq(timer.id, id));
};

export const deleteTimer = async (db: SQLJsDatabase | ExpoSQLiteDatabase, id: number) => {
  await db.delete(timer).where(eq(timer.id, id));
};
