import { db } from "./drizzle";
import { group } from "./schema";

// const db = drizzle(client, { schema });

export async function getGroups() {
  return db.select().from(group).all();
}

export async function createGroup() {
  return db.insert(group).values({ title: "Andrew" });
}
