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

export const clearMessages = mutation({
    args: {
        userId: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity ||
            identity.subject !== process.env.ADMIN_CLERK_ID) {
            throw new Error("Unauthorized user attempted to clear messages.");
        }

        const allMessages = await ctx.db.query("chatMessages").collect();
        for (const message of allMessages) {
            await ctx.db.delete(message._id);
        }

        return { success: true, length: allMessages.length }
    }
})

export const deleteMessage = mutation({
    args: {
        userId: v.string(),
        messageId: v.id("chatMessages")
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity ||
            identity.subject !== process.env.ADMIN_CLERK_ID) {
            throw new Error("Unauthorized user attempted to delete message.");
        }

        await ctx.db.delete(args.messageId);
    }
})