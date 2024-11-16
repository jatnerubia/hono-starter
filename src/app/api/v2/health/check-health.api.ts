import { TAG_HEALTH_v2 } from "@/common/constants/app.constant"
import { HttpStatusCodes } from "@/common/constants/http-status.constant"
import { createRouter } from "@/common/create-app"
import { createJsonContent } from "@/common/helpers/json-content.helper"
import { AppRouteHandler } from "@/common/types/app.type"
import { HttpMethod } from "@/common/types/http-method.type"
import { createRoute, z } from "@hono/zod-openapi"

const route = createRoute({
  method: HttpMethod.GET,
  path: "/health",
  responses: {
    [HttpStatusCodes.OK]: createJsonContent(
      "Health check",
      z
        .object({
          uptime: z.number(),
          status: z.string(),
          timestamp: z.string(),
        })
        .openapi({
          example: {
            uptime: 0,
            status: "healthy",
            timestamp: "…",
          },
        })
    ),
  },
  tags: [TAG_HEALTH_v2],
})

const handler: AppRouteHandler<typeof route> = async (c) => {
  return c.json(
    {
      uptime: process.uptime(),
      status: "healthy",
      timestamp: new Date().toISOString(),
    },
    HttpStatusCodes.OK
  )
}

export const checkHealth = createRouter().openapi(route, handler)
