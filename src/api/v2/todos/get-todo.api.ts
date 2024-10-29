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
import { selectTodosSchema } from "@/db/schemas"
import { createRoute } from "@hono/zod-openapi"

const route = createRoute({
  method: HttpMethod.GET,
  path: "/todos/{id}",
  request: {
    params: uuidSchema(),
  },
  responses: {
    [HttpStatusCodes.NOT_FOUND]: createJsonContent("Todo not found", notFoundSchema()),
    [HttpStatusCodes.OK]: createJsonContent("The requested todo", selectTodosSchema),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: createJsonContent(
      "Invalid id error",
      errorSchema(uuidSchema())
    ),
  },
  tags: [TAG_TODOS_v2],
})

const handler: AppRouteHandler<typeof route> = async (c) => {
  const { id } = c.req.valid("param")
  const todo = await db.query.todos.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id)
    },
  })
  if (!todo) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    )
  }
  return c.json(todo, HttpStatusCodes.OK)
}

export const getTodo = createRouter().openapi(route, handler)
