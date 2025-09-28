import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// The schema is entirely optional.
// You can delete this file (schema.ts) and the
// app will continue to work.
// The schema provides more precise TypeScript types.
export default defineSchema({
  todos: defineTable({
    text: v.string(),
    category: v.optional(v.string()),
    completed: v.boolean()
  }).index("by_completed", ["completed"]),
  users: defineTable({
    clerkId: v.string(),
    name: v.optional(v.string())
  })
})