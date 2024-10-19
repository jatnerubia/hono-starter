/* eslint-disable @typescript-eslint/no-explicit-any */

import { UNPROCESSABLE_ENTITY } from "@/common/constants/http-status-codes.constant"
import { Hook } from "@hono/zod-openapi"

/**
 * Default hook for handling validation errors.
 *
 * @param result - The validation result, which includes success and error information.
 * @param c - The context object used for sending the response.
 * @returns A JSON response if validation fails; otherwise, proceeds with handler logic.
 */
export const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        error: result.error,
        success: result.success,
      },
      UNPROCESSABLE_ENTITY
    )
  }
}
