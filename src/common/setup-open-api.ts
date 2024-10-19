import { AppOpenAPI } from "@/common/types/app.type"
import { apiReference } from "@scalar/hono-api-reference"

import packageJSON from "../../package.json" assert { type: "json" }

export function setupOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    info: {
      title: "My API",
      version: packageJSON.version,
    },
    openapi: "3.0.0",
  })

  app.get(
    "/reference",
    apiReference({
      defaultHttpClient: {
        clientKey: "fetch",
        targetKey: "javascript",
      },
      spec: {
        url: "/doc",
      },
      theme: "kepler",
    })
  )
}
