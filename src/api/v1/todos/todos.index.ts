import { createRouter } from "@/common/create-app"

import * as handlers from "./todos.handlers"
import * as routes from "./todos.routes"

export const v1TodosRoute = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.destory, handlers.destroy)
