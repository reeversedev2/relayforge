import "dotenv/config";
import { fastifyEnv } from "@fastify/env";
import createApp from "./factory/createApp.js";

const app = createApp();

const fastifySchema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
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

await app.register(fastifyEnv, fastifyOptions);

try {
  await app.listen({ port: app.config.PORT, host: "0.0.0.0" }, (err, address) => {
    console.log(`Server is now running at ${address}`);
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
