CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

CREATE TABLE "workflows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"worflow_owner" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

ALTER TABLE "workflows" ADD CONSTRAINT "workflows_worflow_owner_users_id_fkey" FOREIGN KEY ("worflow_owner") REFERENCES "users"("id");