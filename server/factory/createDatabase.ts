import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PRODUCTION ? true : false,
});

export const db = drizzle({ client: pool });

export const closeDatabase = () => pool.end();
