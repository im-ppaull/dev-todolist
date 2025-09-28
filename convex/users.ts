import { mutation, query } from "./_generated/server";

export const registerUser = mutation({
    args: {  },
    handler: async(ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return;

        const existing = await ctx.db.query("users")
            .filter(q => q.eq(q.field("clerkId"), identity.subject))
            .unique()

        if (!existing) {
            ctx.db.insert("users", {
                clerkId: identity.subject,
                name: identity.name
            })
        }
    }
})

export const getUserCount = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        return users.length;
    }
})