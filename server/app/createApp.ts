import Fastify from "fastify";

const createApp = () => {
  const app = Fastify({
    logger: true,
  });

  app.get("/health", (_, reply) => {
    reply.send({
      message: "Status is healthy",
    });
  });

  return app;
};

export default createApp;
