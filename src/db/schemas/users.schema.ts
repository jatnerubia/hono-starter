/* eslint-disable perfectionist/sort-objects */

import { bigserial, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const users = pgTable("users", {
  id: bigserial({ mode: "number" }).primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  fullName: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp(),
})

export const selectUsersSchema = createSelectSchema(users).omit({
  password: true,
})

export const insertUsersSchema = createInsertSchema(users, {
  email: (s) => s.email.email().max(255),
  password: (s) => s.password.min(8).max(255),
  fullName: (s) => s.fullName.min(1).max(255),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export const patchUsersSchema = insertUsersSchema.partial()
