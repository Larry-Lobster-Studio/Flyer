import { Static, Type } from '@fastify/type-provider-typebox';

export const CreateInvoiceBody = Type.Object({
	contact: Type.String(),
	due_date: Type.String({ format: 'date' }),
	invoice_date: Type.String({ format: 'date' }),
	notes: Type.Optional(Type.String()),
	invoice_number: Type.String(),
	reference_number: Type.Optional(Type.String()),
	template: Type.Optional(Type.String()),
	items: Type.Array(
		Type.Object({
			name: Type.String(),
			price: Type.Integer({ minimum: 0 }),
			tax: Type.Number({ minimum: 0 }),
			quantity: Type.Number({ minimum: 0 }),
			description: Type.Optional(Type.String()),
		})
	),
});

export type CreateInvoiceBodyType = Static<typeof CreateInvoiceBody>;

export const UpdateInvoiceBody = Type.Object({
	contact: Type.Optional(Type.String()),
	due_date: Type.Optional(Type.String({ format: 'date' })),
	invoice_date: Type.Optional(Type.String({ format: 'date' })),
	notes: Type.Optional(Type.String()),
	invoice_number: Type.Optional(Type.String()),
	reference_number: Type.Optional(Type.String()),
	template: Type.Optional(Type.String()),
	items: Type.Optional(
		Type.Array(
			Type.Object({
				name: Type.String(),
				price: Type.Integer({ minimum: 0 }),
				tax: Type.Number({ minimum: 0 }),
				quantity: Type.Number({ minimum: 0 }),
				description: Type.Optional(Type.String()),
			})
		)
	),
});

export type UpdateInvoiceBodyType = Static<typeof UpdateInvoiceBody>;

export const SendInvoiceBody = Type.Object({
	mark_sent: Type.Optional(Type.Boolean()),
	resend: Type.Optional(Type.Boolean()),
});

export type SendInvoiceBodyType = Static<typeof SendInvoiceBody>;
