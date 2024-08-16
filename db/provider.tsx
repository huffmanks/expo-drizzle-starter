import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import {
  deleteGroup,
  deleteTimer,
  getGroupById,
  getGroups,
  getTimerById,
  getTimers,
  updateGroup,
  updateTimer,
} from "./actions";
import { initialize } from "./drizzle";
import { Group, Timer } from "./schema";

type ContextType = {
  db: SQLJsDatabase | ExpoSQLiteDatabase | undefined;
  getGroups: () => Promise<Group[]>;
  getGroupById: (id: number) => Promise<Group | undefined>;
  updateGroup: (id: number, data: Partial<Group>) => Promise<void | null>;
  deleteGroup: (id: number) => Promise<void | null>;
  getTimers: () => Promise<Timer[]>;
  getTimerById: (id: number) => Promise<Timer | undefined>;
  updateTimer: (id: number, data: Partial<Timer>) => Promise<void | null>;
  deleteTimer: (id: number) => Promise<void | null>;
};

export const DatabaseContext = createContext<ContextType>({
  db: undefined,
  getGroups: async () => [],
  getGroupById: async () => undefined,
  updateGroup: async () => null,
  deleteGroup: async () => null,
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
    getGroups: async () => (db ? getGroups(db) : []),
    getGroupById: async (id: number) => (db ? getGroupById(db, id) : undefined),
    updateGroup: async (id: number, data: Partial<Group>) =>
      db ? updateGroup(db, id, data) : null,
    deleteGroup: async (id: number) => (db ? deleteGroup(db, id) : null),
    getTimers: async () => (db ? getTimers(db) : []),
    getTimerById: async (id: number) => (db ? getTimerById(db, id) : undefined),
    updateTimer: async (id: number, data: Partial<Timer>) =>
      db ? updateTimer(db, id, data) : null,
    deleteTimer: async (id: number) => (db ? deleteTimer(db, id) : null),
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
}
