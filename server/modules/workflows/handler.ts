import type { FastifyReply, FastifyRequest } from "fastify";
import { createWorkflow, getAllWorkflows } from "./db.js";
import type { CreateWorkflowInput } from "./types.js";
import { findUser } from "../users/db.js";
import z from "zod";

export const getAllWorkflowsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const data = await getAllWorkflows();
  return data;
};

const CreateWorkflowSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(1),
  userId: z.uuid(),
});

export const createWorflowHandler = async (
  request: FastifyRequest<{ Body: CreateWorkflowInput }>,
  reply: FastifyReply,
) => {
  const validation = CreateWorkflowSchema.safeParse(request.body);

  if (!validation.success) {
    return reply.status(400).send({
      error: validation.error.flatten(),
    });
  }

  const { title, description, userId } = validation.data;

  const isUser = await findUser(userId);

  if (!isUser) {
    reply.status(400).send({
      error: "Unable to find a user",
    });
    return;
  }

  const data = await createWorkflow({
    title,
    description,
    userId,
  });
  return data;
};
