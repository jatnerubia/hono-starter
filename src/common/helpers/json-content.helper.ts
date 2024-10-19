import { CONTENT_TYPE_JSON } from "@/common/constants/app.constant"
import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
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
 * Creates a JSON content object that supports oneOf schemas.
 *
 * @param description - A description of the content.
 * @param schemas - An array of Zod schemas that define possible structures of the content.
 * @returns An object representing the content.
 */
export function createJsonContentOneOf<T extends ZodSchema>(description: string, schemas: T[]) {
  return {
    content: {
      [CONTENT_TYPE_JSON]: {
        schema: {
          oneOf: oneOf(schemas),
        },
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

/**
 * Creates an array of schemas that support oneOf validation.
 *
 * @param schemas - An array of Zod schemas that define possible structures of the content.
 * @returns An array of OpenAPI schema definitions representing the 'oneOf' constraint.
 */
function oneOf<T extends ZodSchema>(schemas: T[]) {
  const registry = new OpenAPIRegistry()

  schemas.forEach((schema, index) => {
    registry.register(index.toString(), schema)
  })

  const generator = new OpenApiGeneratorV3(registry.definitions)
  const components = generator.generateComponents()

  return components.components?.schemas ? Object.values(components.components!.schemas!) : []
}
