import { afterAll, beforeAll, describe, expect, test } from "vitest";
import createApp from "../../factory/createApp";
import { closeDatabase, db } from "../../factory/createDatabase";
import { workflowSteps } from "../../db/schema";

const app = createApp();

beforeAll(async () => {
  await db.delete(workflowSteps);
});

afterAll(async () => {
  await app.close();
  await closeDatabase();
});

describe("workflow steps with Postgres", () => {
  test("inserts and retrieves workflow steps", async () => {
    const [step] = await db
      .insert(workflowSteps)
      .values({
        title: "Step 1",
        description: "Step description",
        position: 3,
        workflowId: "49460e76-0d9e-40b0-9d65-a5a92991d9c9",
      })
      .returning();

    if (!step) {
      throw new Error("Failed to create integration test workflow step");
    }

    const createResponse = await app.inject({
      method: "POST",
      url: "/api/workflow-steps/create",
      payload: {
        title: "Step 1",
        description: "Step description",
        position: 3,
        workflowId: "49460e76-0d9e-40b0-9d65-a5a92991d9c9",
      },
    });

    expect(createResponse.statusCode).toBe(201);

    const createdWorkflowStep = createResponse.json().data[0];
    expect(createdWorkflowStep).toMatchObject({
      title: "Step 1",
      description: "Step description",
      workflowId: "49460e76-0d9e-40b0-9d65-a5a92991d9c9",
    });

    const getResponse = await app.inject({
      method: "GET",
      url: `/api/workflow-steps/49460e76-0d9e-40b0-9d65-a5a92991d9c9`,
    });

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.json().data).toContainEqual(createdWorkflowStep);
  });
});
