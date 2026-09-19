import type { FastifyInstance } from "fastify";
import { getAllWorkflowsHandler } from "./handler.js";

export const workflowRouter = (fastify: FastifyInstance) => {
  fastify.get("/", getAllWorkflowsHandler);
};
