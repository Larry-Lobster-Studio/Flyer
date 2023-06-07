import type {
	FastifyReply,
	FastifyRequest,
	RawRequestDefaultExpression,
	RawServerDefault,
	RawReplyDefaultExpression,
	ContextConfigDefault,
} from 'fastify';
import type { FastifySchema } from 'fastify/types/schema';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { Session } from '@ory/client';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

import { Type, Static, TSchema } from '@fastify/type-provider-typebox';

export function Nullable<T extends TSchema>(schema: T) {
	return Type.Unsafe<Static<T> | null>({ ...schema, nullable: true });
}

export interface UserSession extends Session {
	company_id: string;
}

export const ErrorResponse = Type.Object({
	status: Type.Number({ default: 500 }),
	error: Type.Optional(Type.String()),
	message: Type.String(),
});

export type ErrorResponseType = Static<typeof ErrorResponse>;

export const MainQuery = Type.Object({
	sort: Type.Optional(Type.String()),
	page: Type.Optional(Type.Number({ default: 0 })),
	per_page: Type.Optional(Type.Number({ default: 25, maximum: 50 })),
	search: Type.Optional(Type.String()),
});

export type MainQueryType = Static<typeof MainQuery>;

export const AddressPayload = Type.Object({
	name: Type.Optional(Type.String()),
	line_1: Type.String(),
	line_2: Type.Optional(Type.String()),
	city: Type.String(),
	postal_code: Type.String(),
	state: Type.Optional(Type.String()),
	country: Type.String(),
});

export type AddressPayloadType = Static<typeof AddressPayload>;

export const AddressResponse = Type.Object({
	id: Type.String(),
	name: Nullable(Type.String()),
	line_1: Type.String(),
	line_2: Nullable(Type.String()),
	city: Type.String(),
	postal_code: Type.String(),
	state: Nullable(Type.String()),
	country: Type.String(),
	geo: Type.Any(),
});

export type AddressResponseType = Static<typeof AddressResponse>;

export const DeleteItemResponse = Type.Object({
	id: Type.String(),
	object: Type.String(),
	deleted: Type.Boolean(),
});

export type DeleteItemResponseType = Static<typeof DeleteItemResponse>;

export type FastifyRequestTypebox<TSchema extends FastifySchema> =
	FastifyRequest<
		RouteGenericInterface,
		RawServerDefault,
		RawRequestDefaultExpression<RawServerDefault>,
		TSchema,
		TypeBoxTypeProvider
	>;

export type FastifyReplyTypebox<TSchema extends FastifySchema> = FastifyReply<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	RouteGenericInterface,
	ContextConfigDefault,
	TSchema,
	TypeBoxTypeProvider
>;
