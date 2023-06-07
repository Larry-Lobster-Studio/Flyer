import { Static, Type } from '@fastify/type-provider-typebox';

const InvoicesQuery = Type.Object({
	page: Type.Optional(Type.Number({ default: 0 })),
	per_page: Type.Optional(Type.Number({ default: 25, maximum: 50 })),
	search: Type.Optional(Type.String()),
	category: Type.Optional(Type.String({})),
});

export { InvoicesQuery };

export type InvoicesQueryType = Static<typeof InvoicesQuery>;
