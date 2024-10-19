import * as HttpStatusCodes from "@/common/constants/http-status-codes.constant"
import {
  createJsonContent,
  createJsonContentOneOf,
  createJsonContentRequired,
} from "@/common/helpers/json-content.helper"
import { errorSchema } from "@/common/schemas/error.schema"
import { notFoundSchema } from "@/common/schemas/not-found.schema"
import uuidSchema from "@/common/schemas/uuid.schema"
import { insertTodosSchema, patchTodosSchema, selectTodosSchema } from "@/db/schemas"
import { createRoute, z } from "@hono/zod-openapi"

const tags = ["Todos v1"]

export const list = createRoute({
  method: "get",
  path: "/todos",
  responses: {
    [HttpStatusCodes.OK]: createJsonContent("The list of todos", z.array(selectTodosSchema)),
  },
  tags,
})

export const create = createRoute({
  method: "post",
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
  tags,
})

export const getOne = createRoute({
  method: "get",
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
  tags,
})

export const patch = createRoute({
  method: "patch",
  path: "/todos/{id}",
  request: {
    body: createJsonContentRequired("The todo updates", patchTodosSchema),
    params: uuidSchema(),
  },
  responses: {
    [HttpStatusCodes.NOT_FOUND]: createJsonContent("Todo not found", notFoundSchema()),
    [HttpStatusCodes.OK]: createJsonContent("The updated todo", selectTodosSchema),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: createJsonContentOneOf("The validation error(s)", [
      errorSchema(uuidSchema()),
      errorSchema(patchTodosSchema),
    ]),
  },
  tags,
})

export const destory = createRoute({
  method: "delete",
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
  tags,
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type DestoryRoute = typeof destory
