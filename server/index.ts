import "dotenv/config";
import { fastifyEnv } from "@fastify/env";
import createApp from "./factory/createApp.js";

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
    DATABASE_URL: {
      type: "string",
    },
  },
};

const fastifyOptions = {
  dotenv: true,
  schema: fastifySchema,
};

await fastify.register(fastifyEnv, fastifyOptions);

try {
  await app.listen({ port: app.config.PORT, host: "0.0.0.0" }, (err, address) => {
    console.log(`Server is now running at ${address}`);
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
