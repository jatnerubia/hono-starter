import { HttpStatusCodes, HttpStatusPhrases } from "@/common/constants/http-status.constant"
import { NotFoundHandler } from "hono"

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${HttpStatusPhrases.NOT_FOUND} - ${c.req.path}`,
    },
    HttpStatusCodes.NOT_FOUND
  )
}
