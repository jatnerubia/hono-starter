import env from "@/common/env"
import { Environment } from "@/common/types/environment.type"
import { randomUUID } from "crypto"
import { pinoLogger } from "hono-pino"
import pino from "pino"
import pretty from "pino-pretty"

export const pinoLoggerMiddleware = () => {
  return pinoLogger({
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
