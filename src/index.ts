import app from "@/app"
import env from "@/common/env"
import { logger } from "@/lib/pino.lib"
import { serve } from "@hono/node-server"

const port = env.PORT

logger.info(`🚀 Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
