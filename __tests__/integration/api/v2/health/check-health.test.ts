import { v2HealthRoute } from "@/api/v2/health"
import { HttpStatusCodes } from "@/common/constants/http-status.constant"
import { createApp } from "@/common/create-app"
import { testClient } from "hono/testing"
import { describe, expect, it } from "vitest"

const client = testClient(createApp().route("/", v2HealthRoute))

describe("Health Check API", () => {
  it("should return 200 OK and a healthy status message", async () => {
    const response = await client.health.$get()
    const result = await response.json()

    expect(response.status).toBe(HttpStatusCodes.OK)
    expect(result.status).toBe("healthy")
  })
})
