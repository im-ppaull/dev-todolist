import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity() || { subject: args.userId };

    if (!identity) {
      console.log("No identity found for listing todos");
    }

    const list = ctx.db.query("todos");
    const myList = identity && list.filter(q => q.eq(q.field("user"), identity.subject));

    return { list: await list.collect(), myList: await myList.collect() };
  }
})

export const createTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Not authenticated");
    }

    await ctx.db.insert("todos", {
      user: user.subject,
      text: args.text,
      completed: false
    })
  }
})