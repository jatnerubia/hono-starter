import { TAG_TODOS_v2 } from "@/common/constants/app.constant"
import { HttpStatusCodes, HttpStatusPhrases } from "@/common/constants/http-status.constant"
import { createRouter } from "@/common/create-app"
import { createJsonContent, createJsonContentRequired } from "@/common/helpers/json-content.helper"
import { errorSchema } from "@/common/schemas/error.schema"
import { notFoundSchema } from "@/common/schemas/not-found.schema"
import { uuidSchema } from "@/common/schemas/uuid.schema"
import { AppRouteHandler } from "@/common/types/app.type"
import { HttpMethod } from "@/common/types/http-method.type"
import db from "@/db"
import { patchTodosSchema, selectTodosSchema, todos } from "@/db/schemas"
import { createRoute } from "@hono/zod-openapi"
import { eq } from "drizzle-orm"

const route = createRoute({
  method: HttpMethod.PATCH,
  path: "/todos/{id}",
  request: {
    body: createJsonContentRequired("The todo updates", patchTodosSchema),
    params: uuidSchema(),
  },
  responses: {
    [HttpStatusCodes.NOT_FOUND]: createJsonContent("Todo not found", notFoundSchema()),
    [HttpStatusCodes.OK]: createJsonContent("The updated todo", selectTodosSchema),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: createJsonContent(
      "The validation error(s)",
      errorSchema(uuidSchema()).or(errorSchema(patchTodosSchema))
    ),
  },
  tags: [TAG_TODOS_v2],
})

const handler: AppRouteHandler<typeof route> = async (c) => {
  const { id } = c.req.valid("param")
  const updates = c.req.valid("json")
  const [todo] = await db.update(todos).set(updates).where(eq(todos.id, id)).returning()
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

export const updateTodo = createRouter().openapi(route, handler)
