import { CONTENT_TYPE_JSON } from "@/common/constants/app.constant"
import { ZodSchema } from "zod"

/**
 * Creates a JSON content object.
 *
 * @param description - A description of the content.
 * @param schema - A Zod schema that defines the structure of the content.
 * @returns An object representing the content.
 */
export function createJsonContent<T extends ZodSchema>(description: string, schema: T) {
  return {
    content: {
      [CONTENT_TYPE_JSON]: {
        schema,
      },
    },
    description,
  }
}

/**
 * Creates a required JSON content object.
 *
 * @param description - A description of the content.
 * @param schema - A Zod schema that defines the structure of the content.
 * @returns An object representing the required content.
 */
export function createJsonContentRequired<T extends ZodSchema>(description: string, schema: T) {
  return {
    ...createJsonContent(description, schema),
    required: true,
  }
}
