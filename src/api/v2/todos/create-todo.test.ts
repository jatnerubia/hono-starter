/* eslint-disable @typescript-eslint/ban-ts-comment */

import { v2TodosRoute } from "@/api/v2/todos"
import { HttpStatusCodes } from "@/common/constants/http-status.constant"
import { createApp } from "@/common/create-app"
import { ZodErrorMessage } from "@/common/types/zod-error-message.type"
import { execSync } from "child_process"
import { testClient } from "hono/testing"
import { beforeAll, describe, expect, it } from "vitest"

const client = testClient(createApp().route("/", v2TodosRoute))

describe("Create Todo API", () => {
  beforeAll(async () => {
    execSync("npm run db:push")
  })

  const name = "Sample"
  const done = false

  it("should create a new todo successfully", async () => {
    const response = await client.todos.$post({
      json: {
        done,
        name,
      },
    })

    if (response.status !== HttpStatusCodes.OK) return

    const result = await response.json()

    expect(result.name).toBe(name)
    expect(result.done).toBe(done)
  })

  it("should fail for missing name field", async () => {
    const response = await client.todos.$post({
      // @ts-expect-error
      json: {
        done,
      },
    })

    if (response.status !== HttpStatusCodes.UNPROCESSABLE_ENTITY) return

    const result = await response.json()

    expect(result.error.issues[0].path[0]).toBe("name")
    expect(result.error.issues[0].message).toBe(ZodErrorMessage.REQUIRED)
  })

  it("should fail for missing done field", async () => {
    const response = await client.todos.$post({
      // @ts-expect-error
      json: {
        name,
      },
    })

    if (response.status !== HttpStatusCodes.UNPROCESSABLE_ENTITY) return

    const result = await response.json()

    expect(result.error.issues[0].path[0]).toBe("done")
    expect(result.error.issues[0].message).toBe(ZodErrorMessage.REQUIRED)
  })
})
