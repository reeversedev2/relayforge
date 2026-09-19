import { afterAll, describe, expect, test } from "vitest";
import createApp from "./createApp.js";

describe("GET /health", () => {
  const app = createApp();

  afterAll(async () => {
    await app.close();
  });

  test("responds with status healthy", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      message: "Status is healthy",
    });
  });
});
