import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const registerUser = mutation({
    args: {},
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return;

        const existing = await ctx.db.query("users")
            .filter(q => q.eq(q.field("clerkId"), identity.subject))
            .unique()

        if (!existing) {
            ctx.db.insert("users", {
                clerkId: identity.subject,
                isOnline: true,
                name: identity.name
            })
        }
    }
})

export const getUserCount = query({
    args: { online: v.optional(v.boolean()) },
    handler: async (ctx, args) => {
        const users = await ctx.db.query("users").collect();
        const onlineUsers = users.filter(user => user.isOnline);

        return args.online ? onlineUsers.length : users.length;
    }
})

export const setUserOnlineStatus = mutation({
    args: { status: v.boolean(), clerkId: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        const user = await ctx.db.query("users")
            .filter(q => q.eq(q.field("clerkId"), identity?.subject || args.clerkId))
            .unique()

        if (user) {
            ctx.db.patch(user._id, { isOnline: args.status });
        }
    }
})