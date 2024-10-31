import env from "@/common/env"
import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"

import * as schema from "./schemas"

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
})

const db = drizzle({
  casing: "snake_case",
  client: pool,
  logger: env.DATABASE_LOGGER,
  schema,
})

export default db
