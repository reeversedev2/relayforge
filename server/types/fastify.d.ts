import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
      DATABASE_URL: string;
    };
  }
}
