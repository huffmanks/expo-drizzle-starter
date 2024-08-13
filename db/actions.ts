import { db } from "./drizzle";
import { group, timer } from "./schema";

// const db = drizzle(client, { schema });

export async function getGroups() {
  return db.select().from(group).all();
}

export async function createGroup() {
  return db.insert(group).values({ title: "Test Group" });
}

export async function getTimers() {
  return db.select().from(timer).all();
}

export async function createTimer() {
  return db.insert(timer).values({ groupId: 1, title: "Test Timer", duration: 60 });
}
