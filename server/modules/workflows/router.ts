import type { FastifyInstance } from "fastify";
import { createWorflowHandler, getAllWorkflowsHandler } from "./handler.js";

export const workflowRouter = (fastify: FastifyInstance) => {
  fastify.get("/", getAllWorkflowsHandler);
  fastify.post("/create", createWorflowHandler);
};
