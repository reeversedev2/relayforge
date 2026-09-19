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

app.ready((err) => {
  if (err) {
    app.log.error(err);
  }
});

app.listen({ port: app.config.PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Server is now running at ${address}`);
});
