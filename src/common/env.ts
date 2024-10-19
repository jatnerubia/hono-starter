import { Environment } from "@/common/types/environment.type"
import "dotenv/config"
import { z, ZodError } from "zod"

export const EnvSchema = z.object({
  DATABASE_LOGGER: z.coerce.boolean().default(false),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
  NODE_ENV: z.string().default(Environment.DEVELOPMENT),
  PORT: z.coerce.number().default(5000),
})

export type env = z.infer<typeof EnvSchema>

let env: env

try {
  // eslint-disable-next-line n/no-process-env
  env = EnvSchema.parse(process.env)
} catch (e) {
  const error = e as ZodError
  // eslint-disable-next-line no-console
  console.error("❌ Invalid env:", error.flatten().fieldErrors)
  process.exit(1)
}

export default env
