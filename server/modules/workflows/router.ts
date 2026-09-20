import type { FastifyInstance } from "fastify";
import {
  createWorflowHandler,
  getAllWorkflowsByUserIdHandler,
} from "./handler.js";

export const workflowRouter = (fastify: FastifyInstance) => {
  fastify.get("/:userId", getAllWorkflowsByUserIdHandler);
  fastify.post("/create", createWorflowHandler);
};
