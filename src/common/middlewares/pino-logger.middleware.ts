import env from "@/common/env"
import { Environment } from "@/common/types/environment.type"
import { randomUUID } from "crypto"
import { logger } from "hono-pino"
import pino from "pino"
import pretty from "pino-pretty"

export const pinoLogger = () => {
  return logger({
    http: {
      reqId: () => randomUUID(),
    },
    pino: pino(
      {
        level: env.LOG_LEVEL,
      },
      env.NODE_ENV === Environment.PRODUCTION ? undefined : pretty()
    ),
  })
}
