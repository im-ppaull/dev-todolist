import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
    args: {
        userId: v.string(),
        username: v.string(),
        content: v.string()
    },
    handler: async (ctx, args) => {
        const messageId = await ctx.db.insert
        ("chatMessages", {
            userId: args.userId,
            username: args.username,
            content: args.content,
            timestamp: new Date().toISOString()
        });
        return messageId;
    }
})

export const getMessages = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("chatMessages")
            .order("desc")
            .take(50)
    }
})