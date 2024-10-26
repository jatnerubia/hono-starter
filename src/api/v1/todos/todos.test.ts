import { v1TodosRoute } from "@/api/v1/todos/todos.index"
import * as HttpStatusCodes from "@/common/constants/http-status-codes.constant"
import { createApp, createTestApp } from "@/common/create-app"
import { testClient } from "hono/testing"
import { describe, expect, expectTypeOf, it } from "vitest"

// TODO: Need to set up the environment for GitHub Actions
// TODO: Set up a test database
describe("todo list", () => {
  it.todo("responds with an array", async () => {
    const testRouter = createTestApp(v1TodosRoute)
    const response = await testRouter.request("/todos")
    const result = await response.json()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expectTypeOf(result).toBeArray()
  })

  it.todo("responds with an array again", async () => {
    const testApp = createApp()
    const testRouter = testApp.route("/", v1TodosRoute)
    const client = testClient(testRouter)

    const response = await client.todos.$get()
    const result = await response.json()

    expectTypeOf(result).toBeArray()
  })

  it.todo("validates the id param", async () => {
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
