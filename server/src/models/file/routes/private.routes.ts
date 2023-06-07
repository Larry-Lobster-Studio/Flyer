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
	//* Upload file
	app.post('/v1/files', {
		schema: schemas.UploadFileSchema,
		onRequest: [verifyAuth],
		handler: controllers.uploadObject,
	});

	//* Delete single file by id
	app.delete('/v1/files/:fileId', {
		schema: schemas.DeleteFileSchema,
		onRequest: [verifyAuth],
		handler: controllers.deleteObject,
	});

	//* Get single file by id
	app.get('/v1/files/:fileId/contents', {
		// helmet: {
		// 	crossOriginResourcePolicy: {
		// 		policy: 'same-site',
		// 	},
		// 	xFrameOptions: {action: }
		// },
		schema: schemas.GetFileSchema,
		onRequest: [verifyAuth],
		handler: controllers.getObject,
	});

	done();
}

export default privateRoutes;
