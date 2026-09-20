import Fastify from "fastify";
import { workflowRouter } from "../modules/workflows/router.js";
import { workflowStepsRouter } from "../modules/steps/router.js";

const createApp = () => {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", (_, reply) => {
    reply.send({
      message: "Status is healthy",
    });
  });

  app.register(workflowRouter, { prefix: "/api/workflows" });
  app.register(workflowStepsRouter, { prefix: "/api/workflow-steps" });

  return app;
};

export default createApp;
