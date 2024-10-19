import * as HttpStatusCodes from "@/common/constants/http-status-codes.constant"
import { createRouter } from "@/common/create-app"
import { createJsonContent } from "@/common/helpers/json-content.helper"
import { messageSchema } from "@/common/schemas/message.schema"
import { createRoute } from "@hono/zod-openapi"

export const v1IndexRoute = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: createJsonContent("Test API Index", messageSchema("Test API")),
    },
    tags: ["Index"],
  }),
  (c) => {
    return c.json(
      {
        message: "wow",
      },
      HttpStatusCodes.OK
    )
  }
)
