import { HttpStatusPhrases } from "@/common/constants/http-status.constant"
import { messageSchema } from "@/common/schemas/message.schema"

export const notFoundSchema = () => {
  return messageSchema(HttpStatusPhrases.NOT_FOUND)
}
