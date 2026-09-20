import type { FastifyReply, FastifyRequest } from "fastify";
import { createWorkflow, getWorkflow, getWorkflowByUser } from "./db.js";
import type {
  CreateWorkflowInput,
  GetAllWorkflowById,
  GetAllWorkflowsByUserId,
} from "./types.js";
import { findUser } from "../users/db.js";
import z from "zod";

/**
 * GET /api/workflows/:workflowId
 * Accepts workflowId
 */

const GetWorkflowById = z.object({
  workflowId: z.uuid().nonempty(),
});

export const getWorkflowById = async (
  request: FastifyRequest<{ Params: GetAllWorkflowById }>,
  reply: FastifyReply,
) => {
  const validation = GetWorkflowById.safeParse(request.params);

  if (!validation.success) {
    return reply.status(400).send({
      error: validation.error.flatten(),
    });
  }

  const data = await getWorkflow(validation.data.workflowId);

  if (!data) {
    return reply.status(404).send({
      error: "Worlflow not found",
    });
  }

  return reply.status(200).send({
    workflow: data,
  });
};

/**
 * GET /api/workflows/owner/:userId GetAllWorkflowsByUser
 * Accepts userId in params
 */

const GetAllWorkflowsByUserIdSchema = z.object({
  userId: z.uuid().nonempty(),
});

export const getAllWorkflowsByUserIdHandler = async (
  request: FastifyRequest<{ Params: GetAllWorkflowsByUserId }>,
  reply: FastifyReply,
) => {
  const validation = GetAllWorkflowsByUserIdSchema.safeParse(request.params);

  if (!validation.success) {
    return reply.status(400).send({
      error: validation.error.flatten(),
    });
  }

  const data = await getWorkflowByUser(validation.data.userId);
  return data;
};

/**
 * POST /api/workflows/create CreateWorkflow
 * Accepts title, description and userId in request body
 */

const CreateWorkflowSchema = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(1),
  userId: z.uuid(),
});

export const createWorkflowHandler = async (
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

  const foundUser = await findUser(userId);

  if (!foundUser.length) {
    reply.status(400).send({
      error: "Unable to find a user",
    });
    return;
  }

  const createdWorkflow = await createWorkflow({
    title,
    description,
    userId,
  });

  reply.status(201).send({
    data: createdWorkflow,
  });
};
