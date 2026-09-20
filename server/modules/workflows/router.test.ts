import { afterAll, beforeEach, describe, expect, test, vi } from "vitest";
import createApp from "../../factory/createApp.js";
import {
  createWorkflow,
  getWorkflow,
  getWorkflowByUser,
} from "./db.js";
import { findUser } from "../users/db.js";

vi.mock("./db.js", () => ({
  createWorkflow: vi.fn(),
  getWorkflow: vi.fn(),
  getWorkflowByUser: vi.fn(),
}));

vi.mock("../users/db.js", () => ({
  findUser: vi.fn(),
}));

const app = createApp();

const userId = "11111111-1111-4111-8111-111111111111";
const workflowId = "22222222-2222-4222-8222-222222222222";
const workflow = {
  id: workflowId,
  title: "Test workflow",
  description: "Example",
  owner: userId,
};

beforeEach(() => {
  vi.clearAllMocks();
});

afterAll(async () => {
  await app.close();
});

describe("GET /api/workflows/:workflowId", () => {
  test("rejects an invalid workflow ID", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/workflows/not-a-uuid",
    });

    expect(response.statusCode).toBe(400);
    expect(vi.mocked(getWorkflow)).not.toHaveBeenCalled();
  });

  test("returns a workflow", async () => {
    vi.mocked(getWorkflow).mockResolvedValue([workflow]);

    const response = await app.inject({
      method: "GET",
      url: `/api/workflows/${workflowId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ workflow: [workflow] });
    expect(getWorkflow).toHaveBeenCalledWith(workflowId);
  });

  test("returns 404 when the workflow does not exist", async () => {
    vi.mocked(getWorkflow).mockResolvedValue([]);

    const response = await app.inject({
      method: "GET",
      url: `/api/workflows/${workflowId}`,
    });

    expect(response.statusCode).toBe(404);
  });
});

describe("GET /api/workflows/owner/:userId", () => {
  test("rejects an invalid user ID", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/workflows/owner/not-a-uuid",
    });

    expect(response.statusCode).toBe(400);
    expect(vi.mocked(getWorkflowByUser)).not.toHaveBeenCalled();
  });

  test("returns workflows owned by a user", async () => {
    vi.mocked(getWorkflowByUser).mockResolvedValue([workflow]);

    const response = await app.inject({
      method: "GET",
      url: `/api/workflows/owner/${userId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([workflow]);
    expect(getWorkflowByUser).toHaveBeenCalledWith(userId);
  });
});

describe("POST /api/workflows/create", () => {
  const body = {
    title: "Test workflow",
    description: "Example",
    userId,
  };

  test("rejects an invalid request body", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/workflows/create",
      payload: { ...body, userId: "not-a-uuid" },
    });

    expect(response.statusCode).toBe(400);
    expect(vi.mocked(findUser)).not.toHaveBeenCalled();
  });

  test("returns 400 when the owner does not exist", async () => {
    vi.mocked(findUser).mockResolvedValue([]);

    const response = await app.inject({
      method: "POST",
      url: "/api/workflows/create",
      payload: body,
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({ error: "Unable to find a user" });
    expect(vi.mocked(createWorkflow)).not.toHaveBeenCalled();
  });

  test("creates a workflow", async () => {
    vi.mocked(findUser).mockResolvedValue([{ id: userId }]);
    vi.mocked(createWorkflow).mockResolvedValue([workflow]);

    const response = await app.inject({
      method: "POST",
      url: "/api/workflows/create",
      payload: body,
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual({ data: [workflow] });
    expect(createWorkflow).toHaveBeenCalledWith(body);
  });
});
