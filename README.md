# Relay Forge

A TypeScript Fastify service.

## Prerequisites

- Node.js
- pnpm 10+

The repository declares its pnpm version in `package.json`.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

The default configuration is:

```env
PORT=3000
```

Start the development server:

```bash
pnpm dev
```

The development server watches the TypeScript source and restarts when files change.

## API

### `GET /health`

Returns the service health status:

```json
{
  "message": "Status is healthy"
}
```

Example request:

```bash
curl http://localhost:3000/health
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Run the development server with watch mode |
| `pnpm test` | Run the Vitest test suite |
| `pnpm build` | Compile TypeScript into `dist/` |
| `pnpm start` | Run the compiled production server |

To run tests once instead of using Vitest's watch mode:

```bash
pnpm test -- --run
```

## Project Structure

```text
server/
  app/
    createApp.ts       Fastify application and routes
    createApp.test.ts  Integration tests for the application
  types/
    fastify.d.ts       Fastify module type augmentation
  index.ts              Application entrypoint and configuration
```

## Production Build

Build the application and start the generated JavaScript:

```bash
pnpm build
pnpm start
```

The compiled output is written to `dist/`, which is intentionally ignored by Git.
