import { z } from "@hono/zod-openapi"
import { randomUUID } from "crypto"

export function uuidSchema() {
  return z.object({
    id: z
      .string()
      .uuid()
      .openapi({
        example: randomUUID(),
        param: {
          in: "path",
          name: "id",
        },
        required: ["id"],
      }),
  })
}
