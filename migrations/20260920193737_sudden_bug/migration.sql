CREATE TYPE "workflow_steps_type" AS ENUM('http_request', 'transform', 'notify');
ALTER TABLE "workflow_steps" ADD COLUMN "type" "workflow_steps_type";
ALTER TABLE "workflow_steps" ADD COLUMN "configuration" jsonb NOT NULL;