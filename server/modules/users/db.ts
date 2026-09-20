import { eq } from "drizzle-orm";
import { lower, users, workflows } from "../../db/schema.js";
import { db } from "../../factory/createDatabase.js";

export const findUser = async (userId: string) => {
  return await db.select().from(users).where(eq(users.id, userId)).limit(1);
};
