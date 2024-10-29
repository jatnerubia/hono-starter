import { TAG_TODOS_v2 } from "@/common/constants/app.constant"
import { HttpStatusCodes, HttpStatusPhrases } from "@/common/constants/http-status.constant"
import { createRouter } from "@/common/create-app"
import { createJsonContent } from "@/common/helpers/json-content.helper"
import { errorSchema } from "@/common/schemas/error.schema"
import { notFoundSchema } from "@/common/schemas/not-found.schema"
import { uuidSchema } from "@/common/schemas/uuid.schema"
import { AppRouteHandler } from "@/common/types/app.type"
import { HttpMethod } from "@/common/types/http-method.type"
import db from "@/db"
import { todos } from "@/db/schemas"
import { createRoute } from "@hono/zod-openapi"
import { eq } from "drizzle-orm"

const route = createRoute({
  method: HttpMethod.DELETE,
  path: "/todos/{id}",
  request: {
    params: uuidSchema(),
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Todo deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: createJsonContent("Todo not found", notFoundSchema()),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: createJsonContent(
      "Invalid id error",
      errorSchema(uuidSchema())
    ),
  },
  tags: [TAG_TODOS_v2],
})

const handler: AppRouteHandler<typeof route> = async (c) => {
  const { id } = c.req.valid("param")
  const result = await db.delete(todos).where(eq(todos.id, id))
  if (result.rowCount === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }
  return c.body(null, HttpStatusCodes.NO_CONTENT)
}

export const deleteTodo = createRouter().openapi(route, handler)
