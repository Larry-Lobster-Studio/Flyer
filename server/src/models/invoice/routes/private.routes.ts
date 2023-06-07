import type {
	FastifyError,
	FastifyInstance,
	FastifyPluginOptions,
} from 'fastify';

import * as schemas from '../schemas';
import * as controllers from '../controllers';
import { sanitize, verifyAuth } from '@/decorations';

function privateRoutes(
	app: FastifyInstance,
	_: FastifyPluginOptions,
	done: (err?: FastifyError) => void
) {
	//* Create single invoice
	app.post('/v1/invoices', {
		schema: schemas.CreateInvoiceSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.createInvoice,
	});

	//* Get invoice
	app.get('/v1/invoices/:invoiceId', {
		schema: schemas.GetInvoiceSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.getInvoice,
	});

	//* Send invoice
	app.post('/v1/invoices/:invoiceId/send', {
		schema: schemas.SendInvoiceSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.sendInvoice,
	});

	//* Delete invoice
	app.delete('/v1/invoices/:invoiceId', {
		schema: schemas.DeleteInvoiceSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.deleteInvoice,
	});

	//* list invoices
	app.get('/v1/invoices', {
		schema: schemas.ListInvoicesSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.listInvoices,
	});

	//* Get invoice number
	app.get('/v1/invoices/number', {
		schema: schemas.GetNextInvoiceNumberSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.getNextInvoiceNumber,
	});

	//* Get invoice preview
	app.post('/v1/invoices/preview', {
		schema: schemas.InvoicePreviewSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.getPreview,
	});

	done();
}

export default privateRoutes;
