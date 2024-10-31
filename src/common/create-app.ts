import { defaultHook } from "@/common/hooks/default.hook"
import { notFound, onError, pinoLoggerMiddleware } from "@/common/middlewares"
import { AppBindings, AppOpenAPI } from "@/common/types/app.type"
import { OpenAPIHono } from "@hono/zod-openapi"

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
    strict: false,
  })
}

export function createApp() {
  const app = createRouter()

  app.use(pinoLoggerMiddleware())
  app.notFound(notFound)
  app.onError(onError)

  return app
}

export function createTestApp(router: AppOpenAPI) {
  const testApp = createApp()
  testApp.route("/", router)
  return testApp
}
