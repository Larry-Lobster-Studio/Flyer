import type {
	FastifyError,
	FastifyInstance,
	FastifyPluginOptions,
} from 'fastify';

import * as schema from '../schemas';
import * as controllers from '../controllers';
import { sanitize, verifyAuth } from '@/decorations';

export default function privateRoutes(
	app: FastifyInstance,
	_: FastifyPluginOptions,
	done: (err?: FastifyError) => void
) {
	//* Create single contact
	app.post('/v1/contacts', {
		schema: schema.CreateContactSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.createContact,
	});

	//* Get contact
	app.get('/v1/contacts/:contactId', {
		schema: schema.GetContactSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.getContact,
	});

	//* Update contact
	app.put('/v1/contacts/:contactId', {
		schema: schema.UpdateContactSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.updateContact,
	});

	//* Archive contact
	app.delete('/v1/contacts/:contactId', {
		schema: schema.DeleteContactSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.deleteContact,
	});

	//* list contacts
	app.get('/v1/contacts', {
		schema: schema.ListContactsSchema,
		onRequest: [verifyAuth],
		preHandler: [sanitize],
		handler: controllers.listContacts,
	});

	done();
}
