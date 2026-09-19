import "dotenv/config";
import { fastifyEnv } from "@fastify/env";
import createApp from "./factory/createApp.js";
import { workflowRouter } from "./modules/workflows/router.js";

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
await app.register(workflowRouter, { prefix: "/api/workflows" });

try {
  await app.listen({ port: app.config.PORT }, (err, address) => {
    console.log(`Server is now running at ${address}`);
  });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
