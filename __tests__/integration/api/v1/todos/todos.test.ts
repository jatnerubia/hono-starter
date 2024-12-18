import { v1TodosRoute } from "@/app/api/v1/todos/todos.index"
import { HttpStatusCodes } from "@/common/constants/http-status.constant"
import { createApp } from "@/common/create-app"
import { testClient } from "hono/testing"
import { describe, expect, expectTypeOf, it } from "vitest"

describe("todo list", () => {
  it("responds with an array", async () => {
    const testApp = createApp()
    const testRouter = testApp.route("/", v1TodosRoute)
    const client = testClient(testRouter)

    const response = await client.todos.$get()
    const result = await response.json()

    expect(response.status).toBe(HttpStatusCodes.OK)
    expectTypeOf(result).toBeArray()
  })

  it("validates the id param", async () => {
    const testApp = createApp()
    const testRouter = testApp.route("/", v1TodosRoute)
    const client = testClient(testRouter)

    const response = await client.todos[":id"].$get({
      param: {
        id: "wat",
      },
    })

    expect(response.status).toBe(HttpStatusCodes.UNPROCESSABLE_ENTITY)
  })
})
