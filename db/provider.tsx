import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import {
  deleteTag,
  deleteTimer,
  getTagById,
  getTags,
  getTimerById,
  getTimers,
  updateTag,
  updateTimer,
} from "./actions";
import { initialize } from "./drizzle";
import { Tag, Timer } from "./schema";

type ContextType = {
  db: SQLJsDatabase | ExpoSQLiteDatabase | undefined;
  getTags: () => Promise<Tag[]>;
  getTagById: (id: number) => Promise<Tag | undefined>;
  updateTag: (id: number, data: Partial<Tag>) => Promise<void | null>;
  deleteTag: (id: number) => Promise<void | null>;
  getTimers: () => Promise<Timer[]>;
  getTimerById: (id: number) => Promise<Timer | undefined>;
  updateTimer: (id: number, data: Partial<Timer>) => Promise<void | null>;
  deleteTimer: (id: number) => Promise<void | null>;
};

export const DatabaseContext = createContext<ContextType>({
  db: undefined,
  getTags: async () => [],
  getTagById: async () => undefined,
  updateTag: async () => null,
  deleteTag: async () => null,
  getTimers: async () => [],
  getTimerById: async () => undefined,
  updateTimer: async () => null,
  deleteTimer: async () => null,
});

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }: PropsWithChildren) {
  const [db, setDb] = useState<SQLJsDatabase | ExpoSQLiteDatabase | undefined>(undefined);

  useEffect(() => {
    if (db) return;
    initialize().then((newDb) => {
      setDb(newDb);
    });
  }, []);

  const value = {
    db,
    getTags: async () => (db ? getTags(db) : []),
    getTagById: async (id: number) => (db ? getTagById(db, id) : undefined),
    updateTag: async (id: number, data: Partial<Tag>) => (db ? updateTag(db, id, data) : null),
    deleteTag: async (id: number) => (db ? deleteTag(db, id) : null),
    getTimers: async () => (db ? getTimers(db) : []),
    getTimerById: async (id: number) => (db ? getTimerById(db, id) : undefined),
    updateTimer: async (id: number, data: Partial<Timer>) =>
      db ? updateTimer(db, id, data) : null,
    deleteTimer: async (id: number) => (db ? deleteTimer(db, id) : null),
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
}
