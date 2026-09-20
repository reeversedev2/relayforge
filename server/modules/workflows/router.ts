import type { FastifyInstance } from "fastify";
import {
  createWorflowHandler,
  getAllWorkflowsByUserIdHandler,
  getWorkflowById,
} from "./handler.js";

export const workflowRouter = (fastify: FastifyInstance) => {
  fastify.get("/:workflowId", getWorkflowById);
  fastify.get("/owner/:userId", getAllWorkflowsByUserIdHandler);

  fastify.post("/create", createWorflowHandler);
};
