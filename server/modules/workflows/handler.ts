import type { FastifyReply, FastifyRequest } from "fastify";
import { createWorkflow, getAllWorkflows } from "./db.js";
import type { CreateWorkflowInput } from "./types.js";

export const getAllWorkflowsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const data = await getAllWorkflows();
  return data;
};

export const createWorflowHandler = async (
  request: FastifyRequest<{ Body: CreateWorkflowInput }>,
  reply: FastifyReply,
) => {
  const { title, description, userId } = request.body;
  const data = await createWorkflow({
    title,
    description,
    userId,
  });
  return data;
};
