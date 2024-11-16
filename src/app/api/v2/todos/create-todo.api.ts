import { TAG_TODOS_v2 } from "@/common/constants/app.constant"
import { HttpStatusCodes } from "@/common/constants/http-status.constant"
import { createRouter } from "@/common/create-app"
import { createJsonContent, createJsonContentRequired } from "@/common/helpers/json-content.helper"
import { errorSchema } from "@/common/schemas/error.schema"
import { AppRouteHandler } from "@/common/types/app.type"
import { HttpMethod } from "@/common/types/http-method.type"
import db from "@/db"
import { insertTodosSchema, selectTodosSchema, todos } from "@/db/schemas"
import { createRoute } from "@hono/zod-openapi"

const route = createRoute({
  method: HttpMethod.POST,
  path: "/todos",
  request: {
    body: createJsonContentRequired("The todo to create", insertTodosSchema),
  },
  responses: {
    [HttpStatusCodes.OK]: createJsonContent("The created todo", selectTodosSchema),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: createJsonContent(
      "The validation error(s)",
      errorSchema(insertTodosSchema)
    ),
  },
  tags: [TAG_TODOS_v2],
})

const handler: AppRouteHandler<typeof route> = async (c) => {
  const todo = c.req.valid("json")
  const [inserted] = await db.insert(todos).values(todo).returning()
  return c.json(inserted, HttpStatusCodes.OK)
}

export const createTodo = createRouter().openapi(route, handler)
