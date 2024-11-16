import {
  CreateRoute,
  DestoryRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
} from "@/app/api/v1/todos/todos.routes"
import * as HttpStatusCodes from "@/common/constants/http-status-codes.constant"
import * as HttpStatusPhrases from "@/common/constants/http-status-phrases.constant"
import { AppRouteHandler } from "@/common/types/app.type"
import db from "@/db"
import { todos } from "@/db/schemas"
import { eq } from "drizzle-orm"

export const list: AppRouteHandler<ListRoute> = async (c) => {
  c.var.logger.debug("List todos debug")
  const todos = await db.query.todos.findMany()
  return c.json(todos)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const todo = c.req.valid("json")
  const [inserted] = await db.insert(todos).values(todo).returning()
  return c.json(inserted, HttpStatusCodes.OK)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
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

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
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

export const destroy: AppRouteHandler<DestoryRoute> = async (c) => {
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
