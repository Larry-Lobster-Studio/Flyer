import type {
	FastifyError,
	FastifyInstance,
	FastifyPluginOptions,
} from 'fastify';

function fileRoutes(
	app: FastifyInstance,
	_: FastifyPluginOptions,
	done: (err?: FastifyError) => void
) {
	app.register(require('./private.routes'));

	done();
}

export default fileRoutes;
