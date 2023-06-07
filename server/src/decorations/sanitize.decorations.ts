import type { FastifyRequest, FastifyReply } from 'fastify';

import xss from 'xss';

export async function sanitize(request: FastifyRequest, _reply: FastifyReply) {
	if (request.body) {
		const body = JSON.stringify(request.body);
		request.body = JSON.parse(xss(body));
	}

	if (request.params) {
		const params = JSON.stringify(request.params);
		request.params = JSON.parse(xss(params));
	}

	if (request.query) {
		const query = JSON.stringify(request.query);
		request.query = JSON.parse(xss(query));
	}

	return;
}
