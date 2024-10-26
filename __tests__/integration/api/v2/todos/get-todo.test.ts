import { v2TodosRoute } from "@/api/v2/todos"
import { HttpStatusCodes, HttpStatusPhrases } from "@/common/constants/http-status.constant"
import { createApp } from "@/common/create-app"
import { ZodErrorMessage } from "@/common/types/zod-error-message.type"
import { testClient } from "hono/testing"
import { describe, expect, it } from "vitest"

const client = testClient(createApp().route("/", v2TodosRoute))

describe("Get Todo API", () => {
  it("should return a todo successfully", async () => {
    const name = "Sample"
    const done = false

    const createResponse = await client.todos.$post({
      json: {
        done,
        name,
      },
    })

    if (createResponse.status !== HttpStatusCodes.OK) return

    const createdTodo = await createResponse.json()

    const response = await client.todos[":id"].$get({
      param: {
        id: createdTodo.id,
      },
    })

    if (response.status !== HttpStatusCodes.OK) return

    const result = await response.json()

    expect(result.name).toBe(name)
    expect(result.done).toBe(done)
  })

  it("should return 404 for a non-existent todo ID", async () => {
    const response = await client.todos[":id"].$get({
      param: {
        id: "00000000-0000-0000-0000-000000000000",
      },
    })

    if (response.status !== HttpStatusCodes.NOT_FOUND) return

    const result = await response.json()

    expect(result.message).toBe(HttpStatusPhrases.NOT_FOUND)
  })

  it("should return 422 for an invalid todo ID", async () => {
    const response = await client.todos[":id"].$get({
      param: {
        id: "1",
      },
    })

    if (response.status !== HttpStatusCodes.UNPROCESSABLE_ENTITY) return

    const result = await response.json()

    expect(result.error.issues[0].path[0]).toBe("id")
    expect(result.error.issues[0].message).toBe(ZodErrorMessage.INVALID_UUID)
  })
})
