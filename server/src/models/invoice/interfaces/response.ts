import { AddressResponse, Nullable } from '@/common/types';
import { Static, Type } from '@fastify/type-provider-typebox';
import { InvoiceStatus } from '@prisma/client';

export const ListInvoicesResponse = Type.Object({
	object: Type.String(),
	has_more: Type.Boolean(),
	total: Type.Integer(),
	items: Type.Array(
		Type.Object({
			id: Type.String(),
			invoice_number: Type.String(),
			total: Type.String(),
			due_date: Type.String({ format: 'date-time' }),
			currency: Type.String(),
			status: Type.Enum(InvoiceStatus),
			contact: Type.Object({
				id: Type.String(),
				name: Type.String(),
				email: Type.String(),
			}),
		})
	),
});

export type ListInvoicesResponseType = Static<typeof ListInvoicesResponse>;

export const GetInvoiceResponse = Type.Object({
	id: Type.String(),
	invoice_number: Type.String(),
	reference_number: Nullable(Type.String()),
	sub_total: Type.String(),
	tax_amount: Type.String(),
	total: Type.String(),
	invoice_date: Type.String({ format: 'date-time' }),
	due_date: Type.String({ format: 'date-time' }),
	currency: Type.String(),
	status: Type.Enum(InvoiceStatus),
	notes: Nullable(Type.String()),
	items: Type.Array(
		Type.Object({
			id: Type.String(),
			name: Type.String(),
			price: Type.String(),
			quantity: Type.String(),
			tax: Type.String(),
			tax_amount: Type.String(),
			sub_total: Type.String(),
			total: Type.String(),
			description: Nullable(Type.String()),
		})
	),
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
	document: Type.Object({
		id: Type.String(),
		file_name: Type.String(),
		url: Type.String(),
	}),
});

export type GetInvoiceResponseType = Static<typeof GetInvoiceResponse>;

export const NextInvoiceNumberResponse = Type.Object({
	number: Type.String(),
});

export type NextInvoiceNumberResponseType = Static<
	typeof NextInvoiceNumberResponse
>;
