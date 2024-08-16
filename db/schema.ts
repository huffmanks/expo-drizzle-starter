import { relations } from "drizzle-orm";
import { AnySQLiteColumn, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const tag = sqliteTable("tags", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
});

export const tagRelations = relations(tag, ({ many }) => ({
  timers: many(timer),
}));

export const TagSchema = createSelectSchema(tag);
export type Tag = z.infer<typeof TagSchema>;

export const timer = sqliteTable("timers", {
  id: integer("id").primaryKey(),
  tagId: integer("tag_id")
    .notNull()
    .references((): AnySQLiteColumn => tag.id, { onDelete: "cascade" }),
  title: text("title").default("Untitled").notNull(),
  duration: integer("duration").notNull(),
  isRunning: integer("is_running", { mode: "boolean" }).default(true).notNull(),
});

export const timerRelations = relations(timer, ({ one }) => ({
  tag: one(tag, { fields: [timer.tagId], references: [tag.id] }),
}));

export const TimerSchema = createSelectSchema(timer);
export type Timer = z.infer<typeof TimerSchema>;
