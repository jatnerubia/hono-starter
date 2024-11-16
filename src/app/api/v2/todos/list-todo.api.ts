import { TAG_TODOS_v2 } from "@/common/constants/app.constant"
import { HttpStatusCodes } from "@/common/constants/http-status.constant"
import { createRouter } from "@/common/create-app"
import { createJsonContent } from "@/common/helpers/json-content.helper"
import { AppRouteHandler } from "@/common/types/app.type"
import { HttpMethod } from "@/common/types/http-method.type"
import db from "@/db"
import { selectTodosSchema } from "@/db/schemas"
import { createRoute, z } from "@hono/zod-openapi"

const route = createRoute({
  method: HttpMethod.GET,
  path: "/todos",
  responses: {
    [HttpStatusCodes.OK]: createJsonContent("The list of todos", z.array(selectTodosSchema)),
  },
  tags: [TAG_TODOS_v2],
})

const handler: AppRouteHandler<typeof route> = async (c) => {
  c.var.logger.debug("List todos debug")
  const todos = await db.query.todos.findMany()
  return c.json(todos)
}

export const listTodo = createRouter().openapi(route, handler)
