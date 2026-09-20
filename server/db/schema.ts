import { sql, type SQL } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

const timeStamps = {
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const workflows = pgTable("workflows", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  owner: uuid("workflow_owner")
    .notNull()
    .references(() => users.id),
  ...timeStamps,
});

export const workflowSteps = pgTable(
  "workflow_steps",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description").notNull(),
    position: integer("position").notNull(),
    workflowId: uuid("workflow_uuid")
      .notNull()
      .references(() => workflows.id),
    ...timeStamps,
  },
  (table) => [
    unique("workflow_steps_workflow_position_unique").on(
      table.workflowId,
      table.position,
    ),
  ],
);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  email: text("email").unique().notNull(),
  ...timeStamps,
});

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
