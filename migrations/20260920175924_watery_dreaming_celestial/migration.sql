CREATE TABLE "workflow_steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"position" integer NOT NULL,
	"workflow_uuid" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "workflow_steps_workflow_position_unique" UNIQUE("workflow_uuid","position")
);
