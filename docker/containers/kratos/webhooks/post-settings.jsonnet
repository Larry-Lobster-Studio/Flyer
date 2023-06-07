function(ctx) {
    all: ctx,
    object: "event",
    type: "user.updated",
    data: {
        auth_id: ctx.identity.id,
        company: ctx.identity.traits.company,
        user: {
            email:ctx.identity.traits.email,
            name: {
                first: ctx.identity.traits.name.first,
                last: ctx.identity.traits.name.last
            }
        }
    }
}