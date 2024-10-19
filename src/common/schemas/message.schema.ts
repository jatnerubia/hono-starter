import { z } from "@hono/zod-openapi"

export function messageSchema(message: string = "Hello world") {
  return z
    .object({
      message: z.string(),
    })
    .openapi({
      example: {
        message,
      },
    })
}
