import { eq } from "drizzle-orm";
import { workflows } from "../../db/schema.js";
import { db } from "../../factory/createDatabase.js";
import type { CreateWorkflowInput } from "./types.js";

export const getWorkflow = async (workflowId: string) => {
  const [workflow] = await db
    .select()
    .from(workflows)
    .where(eq(workflows.id, workflowId));
  return workflow;
};

export const getWorkflowByUser = async (userId: string) => {
  return await db.select().from(workflows).where(eq(workflows.owner, userId));
};

export const createWorkflow = async (input: CreateWorkflowInput) => {
  if (!input) {
    throw new Error("Workflow input data required");
  }

  return await db
    .insert(workflows)
    .values({
      title: input.title,
      description: input.description,
      owner: input.userId,
    })
    .returning();
};
