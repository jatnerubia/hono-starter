import { HttpStatusCodes, HttpStatusPhrases } from "@/common/constants/http-status.constant"
import { NotFoundHandler } from "hono"

export const notFoundMiddleware: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${HttpStatusPhrases.NOT_FOUND} - ${c.req.path}`,
    },
    HttpStatusCodes.NOT_FOUND
  )
}
