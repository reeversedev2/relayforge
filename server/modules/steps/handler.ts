import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { getStepsByWorkflowId, insertNewWorkflowStep } from "./db.js";
import type { CreateWorkflowStepInput } from "./types.js";

const GetWorkflowStepsByWorkflowId = z.object({
  workflowId: z.uuid().nonempty(),
});

export const getWorkflowStepsByWorkflowId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const validation = GetWorkflowStepsByWorkflowId.safeParse(request.params);

  if (!validation.success) {
    return reply.status(400).send({
      error: validation.error.flatten(),
    });
  }

  const data = await getStepsByWorkflowId(validation.data.workflowId);

  return reply.status(200).send({
    data: data,
  });
};

const CreateWorkflowStep = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  workflowId: z.uuid().nonempty(),
});

export const createWorkflowStep = async (
  request: FastifyRequest<{ Body: CreateWorkflowStepInput }>,
  reply: FastifyReply,
) => {
  const validation = CreateWorkflowStep.safeParse(request.body);

  if (!validation.success) {
    return reply.status(400).send({
      error: validation.error.flatten(),
    });
  }

  const data = await insertNewWorkflowStep(validation.data);

  return reply.status(201).send({
    data,
  });
};
