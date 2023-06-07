import { Static, Type } from '@fastify/type-provider-typebox';

const ItemParams = Type.Object({
	itemId: Type.String(),
});

type ItemParamsType = Static<typeof ItemParams>;

export { ItemParams };
export type { ItemParamsType };
