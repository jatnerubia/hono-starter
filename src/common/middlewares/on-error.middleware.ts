import { HttpStatusCodes } from "@/common/constants/http-status.constant"
import env from "@/common/env"
import { Environment } from "@/common/types/environment.type"
import { ErrorHandler } from "hono"

export const onError: ErrorHandler = (err, c) => {
  return c.json(
    {
      message: err.message,
      stack: env.NODE_ENV === Environment.PRODUCTION ? undefined : err.stack,
    },
    HttpStatusCodes.INTERNAL_SERVER_ERROR
  )
}
