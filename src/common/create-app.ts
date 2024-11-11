import { defaultHook } from "@/common/hooks/default.hook"
import { notFoundMiddleware, onErrorMiddleware, pinoLoggerMiddleware } from "@/common/middlewares"
import { AppBindings } from "@/common/types/app.type"
import { OpenAPIHono } from "@hono/zod-openapi"
import { secureHeaders } from "hono/secure-headers"

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
    strict: false,
  })
}

export function createApp() {
  const app = createRouter()

  app.use(secureHeaders())
  app.use(pinoLoggerMiddleware())
  app.notFound(notFoundMiddleware)
  app.onError(onErrorMiddleware)

  return app
}
