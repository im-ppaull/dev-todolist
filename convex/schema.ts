import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  todos: defineTable({
    user: v.string(),
    text: v.string(),
    category: v.optional(v.string()),
    completed: v.boolean()
  }),

  users: defineTable({
    clerkId: v.string(),
    isOnline: v.boolean(),
    name: v.optional(v.string())
  }),

  chatMessages: defineTable({
    userId: v.string(),
    username: v.string(),
    content: v.string(),
    timestamp: v.string()
  })
})