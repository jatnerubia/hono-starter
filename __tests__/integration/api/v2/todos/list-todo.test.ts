import { v2TodosRoute } from "@/app/api/v2/todos"
import { HttpStatusCodes } from "@/common/constants/http-status.constant"
import { createApp } from "@/common/create-app"
import { testClient } from "hono/testing"
import { describe, expect, expectTypeOf, it } from "vitest"

const client = testClient(createApp().route("/", v2TodosRoute))

describe("List Todo API", () => {
  it("should return all todos", async () => {
    const response = await client.todos.$get()
    const result = await response.json()

    expect(response.status).toBe(HttpStatusCodes.OK)
    expectTypeOf(result).toBeArray()
  })
})
