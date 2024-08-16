import { eq } from "drizzle-orm";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";

import { group, Group, timer, Timer } from "./schema";

export const getGroups = async (db: SQLJsDatabase | ExpoSQLiteDatabase): Promise<Group[]> => {
  return db.select().from(group).all();
};

export const getGroupById = async (
  db: SQLJsDatabase | ExpoSQLiteDatabase,
  id: number
): Promise<Group | undefined> => {
  return db.select().from(group).where(eq(group.id, id)).get();
};

export const updateGroup = async (
  db: SQLJsDatabase | ExpoSQLiteDatabase,
  id: number,
  data: Partial<Group>
) => {
  await db.update(group).set(data).where(eq(group.id, id));
};

export const deleteGroup = async (db: SQLJsDatabase | ExpoSQLiteDatabase, id: number) => {
  await db.delete(group).where(eq(group.id, id));
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
