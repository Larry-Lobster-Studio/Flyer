import { Static, Type } from '@fastify/type-provider-typebox';

export const CreateItemBody = Type.Object({
	name: Type.String(),
	price: Type.Integer({ minimum: 0 }),
	description: Type.Optional(Type.String()),
	unit: Type.String(),
	tax: Type.Number({ minimum: 0 }),
});

export type CreateItemBodyType = Static<typeof CreateItemBody>;

export const UpdateItemBody = Type.Object({
	name: Type.Optional(Type.String()),
	price: Type.Optional(Type.Integer({ minimum: 0 })),
	description: Type.Optional(Type.String()),
	unit: Type.Optional(Type.String()),
	tax: Type.Optional(Type.Number({ minimum: 0 })),
});

export type UpdateItemBodyType = Static<typeof UpdateItemBody>;
