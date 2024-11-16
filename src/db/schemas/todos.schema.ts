import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const todos = pgTable("todos", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const selectTodosSchema = createSelectSchema(todos)

export const insertTodosSchema = createInsertSchema(todos, {
  name: (schema) => schema.name.min(1).max(255),
})
  .required({
    done: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })

export const patchTodosSchema = insertTodosSchema.partial()
