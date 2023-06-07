function(ctx) {
    object: "event",
    type: "user.created",
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