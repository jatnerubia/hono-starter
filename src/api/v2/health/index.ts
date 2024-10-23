import { checkHealth } from "@/api/v2/health/check-health.api"
import { createRouter } from "@/common/create-app"

export const v2HealthRoute = createRouter().route("/", checkHealth)
