import { eq } from "drizzle-orm";
import { lower, users, workflows } from "../../db/schema.js";
import { db } from "../../factory/createDatabase.js";

export const getAllWorkflows = async () => {
  return await db.select().from(workflows);
};

export const getWorkflowByUser = async (userId: string) => {
  return await db
    .select()
    .from(workflows)
    .where(eq(lower(users.id), userId));
};
