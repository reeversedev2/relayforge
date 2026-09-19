import Fastify from "fastify";
import { fastifyEnv } from "@fastify/env";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
    };
  }
}

const fastify = Fastify({
  logger: true,
});

const fastifySchema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const fastifyOptions = {
  dotenv: true,
  schema: fastifySchema,
};

await fastify.register(fastifyEnv, fastifyOptions);

fastify.ready((err) => {
  if (err) {
    fastify.log.error(err);
  }
});

fastify.get("/health", (request, reply) => {
  reply.send({
    message: "Status is healthy",
  });
});

fastify.listen({ port: fastify.config.PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
  }

  console.log(`Server is now running at ${address}`);
});
