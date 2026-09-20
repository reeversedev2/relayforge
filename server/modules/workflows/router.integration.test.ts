import { afterAll, beforeAll, describe, expect, test } from "vitest";
import createApp from "../../factory/createApp.js";
import { closeDatabase, db } from "../../factory/createDatabase.js";
import { users, workflows } from "../../db/schema.js";

const app = createApp();

beforeAll(async () => {
  await db.delete(workflows);
  await db.delete(users);
});

afterAll(async () => {
  await app.close();
  await closeDatabase();
});

describe("workflow routes with PostgreSQL", () => {
  test("persists and reads a workflow", async () => {
    const [user] = await db
      .insert(users)
      .values({
        firstName: "Integration",
        lastName: "Test",
        email: `integration-${Date.now()}@example.com`,
      })
      .returning();

    if (!user) {
      throw new Error("Failed to create integration test user");
    }

    const createResponse = await app.inject({
      method: "POST",
      url: "/api/workflows/create",
      payload: {
        title: "Integration workflow",
        description: "Stored in PostgreSQL",
        userId: user.id,
      },
    });

    expect(createResponse.statusCode).toBe(201);

    const createdWorkflow = createResponse.json().data[0];
    expect(createdWorkflow).toMatchObject({
      title: "Integration workflow",
      description: "Stored in PostgreSQL",
      owner: user.id,
    });

    const getResponse = await app.inject({
      method: "GET",
      url: `/api/workflows/${createdWorkflow.id}`,
    });

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.json().workflow).toMatchObject(createdWorkflow);

    const ownerResponse = await app.inject({
      method: "GET",
      url: `/api/workflows/owner/${user.id}`,
    });

    expect(ownerResponse.statusCode).toBe(200);
    expect(ownerResponse.json()).toHaveLength(1);
  });
});
