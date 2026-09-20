import Fastify from "fastify";
import { workflowRouter } from "../modules/workflows/router.js";

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

  return app;
};

export default createApp;
