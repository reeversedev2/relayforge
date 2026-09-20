import { asc, eq, sql } from "drizzle-orm";
import { workflowSteps } from "../../db/schema.js";
import { db } from "../../factory/createDatabase.js";
import type { CreateWorkflowStepInput } from "./types.js";

export const getStepsByWorkflowId = async (workflowId: string) => {
  return await db
    .select()
    .from(workflowSteps)
    .where(eq(workflowSteps.workflowId, workflowId))
    .orderBy(asc(workflowSteps.position));
};

export const insertNewWorkflowStep = async (input: CreateWorkflowStepInput) => {
  return await db.transaction(async (tx) => {
    const { workflowId, title, description } = input;

    await tx.execute(
      sql`select pg_advisory_xact_lock(hashtextextended(${workflowId}, 0))`,
    );

    const existingSteps = await tx
      .select({ position: workflowSteps.position })
      .from(workflowSteps)
      .where(eq(workflowSteps.workflowId, workflowId));
    const nextPosition =
      existingSteps.length === 0
        ? 1
        : Math.max(...existingSteps.map((step) => step.position)) + 1;

    return await tx
      .insert(workflowSteps)
      .values({
        title,
        description,
        position: nextPosition,
        workflowId,
      })
      .returning();
  });
};
