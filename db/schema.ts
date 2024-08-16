import { relations } from "drizzle-orm";
import { AnySQLiteColumn, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const group = sqliteTable("groups", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
});

export const groupRelations = relations(group, ({ many }) => ({
  timers: many(timer),
}));

export const GroupSchema = createSelectSchema(group);
export type Group = z.infer<typeof GroupSchema>;

export const timer = sqliteTable("timers", {
  id: integer("id").primaryKey(),
  groupId: integer("group_id")
    .notNull()
    .references((): AnySQLiteColumn => group.id, { onDelete: "cascade" }),
  title: text("title").default("Untitled"),
  duration: integer("duration").notNull(),
  isRunning: integer("is_running", { mode: "boolean" }).default(true),
});

export const timerRelations = relations(timer, ({ one }) => ({
  group: one(group, { fields: [timer.groupId], references: [group.id] }),
}));

export const TimerSchema = createSelectSchema(timer);
export type Timer = z.infer<typeof TimerSchema>;
