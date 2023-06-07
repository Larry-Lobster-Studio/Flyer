import { AddressResponse, Nullable } from '@/common/types';
import { Static, Type } from '@fastify/type-provider-typebox';
import { ExpenseStatus } from '@prisma/client';

export const ListExpensesResponse = Type.Object({
	object: Type.String(),
	has_more: Type.Boolean(),
	total: Type.Integer(),
	items: Type.Array(
		Type.Object({
			id: Type.String(),
			total: Type.String(),
			currency: Type.String(),
			status: Type.String(ExpenseStatus),
			contact: Type.Object({
				id: Type.String(),
				name: Type.String(),
				email: Type.String(),
			}),
		})
	),
});

export type ListExpensesResponseType = Static<typeof ListExpensesResponse>;

export const GetExpenseResponse = Type.Object({
	id: Type.String(),
	sub_total: Type.String(),
	tax_amount: Type.String(),
	total: Type.String(),
	due_date: Nullable(Type.String({ format: 'date-time' })),
	currency: Type.String(),
	status: Type.String(ExpenseStatus),
	notes: Nullable(Type.String()),
	terms: Nullable(Type.String()),
	contact: Type.Object({
		id: Type.String(),
		name: Type.String(),
		email: Type.String(),
		phone: Nullable(Type.String()),
		vat: Type.String(),
		website: Nullable(Type.String()),
		billing_address: Nullable(AddressResponse),
		shipping_address: Nullable(AddressResponse),
	}),
	items: Type.Array(
		Type.Object({
			id: Type.String(),
			category: Type.String(),
			description: Nullable(Type.String()),
			metadata: Nullable(Type.Object({})),
			sub_total: Type.String(),
			total: Type.String(),
			tax_amount: Type.String(),
		})
	),
	document: Nullable(
		Type.Object({
			id: Type.String(),
			file_name: Type.String(),
			url: Type.String(),
		})
	),
});

export type GetExpenseResponseType = Static<typeof GetExpenseResponse>;
