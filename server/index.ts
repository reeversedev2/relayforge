import { fastifyEnv } from "@fastify/env";
import createApp from "./app/createApp.js";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
    };
  }
}

const app = createApp();

const fastifySchema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },
  },
};

const fastifyOptions = {
  dotenv: true,
  schema: fastifySchema,
};

await app.register(fastifyEnv, fastifyOptions);

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
