import type { FastifyInstance } from "fastify";
import { createWorkflowStep, getWorkflowStepsByWorkflowId } from "./handler.js";

export const workflowStepsRouter = (fastify: FastifyInstance) => {
  fastify.get("/:workflowId", getWorkflowStepsByWorkflowId);

  fastify.post("/create", createWorkflowStep);
};
