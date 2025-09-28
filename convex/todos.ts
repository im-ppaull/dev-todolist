import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { count: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db.query("todos").order("desc").take(args.count);
  }
})

export const createTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("todos", {
      text: args.text,
      completed: false
    })
  }
})