import type { FastifyReply, FastifyRequest } from "fastify";
import { getAllWorkflows } from "./db.js";

export const getAllWorkflowsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  let data;
  try {
    data = await getAllWorkflows();
  } catch (err) {
  } finally {
    return data;
  }
};
