import { z } from "@hono/zod-openapi"
import { Schema, ZodArray } from "zod"

export function errorSchema<T extends Schema>(schema: T) {
  const { error } = schema.safeParse(schema instanceof ZodArray ? [] : {})

  return z.object({
    error: z
      .object({
        issues: z.array(
          z.object({
            code: z.string(),
            message: z.string().optional(),
            path: z.array(z.union([z.string(), z.number()])),
          })
        ),
      })
      .openapi({
        example: error,
      }),
    success: z.boolean().openapi({
      example: false,
    }),
  })
}
