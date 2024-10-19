import env from "@/env"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/db/schemas",
  strict: true,
  verbose: true,
})
