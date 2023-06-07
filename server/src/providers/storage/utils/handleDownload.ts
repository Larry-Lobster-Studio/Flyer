import type { FastifyReply } from 'fastify';

function handleDownload(reply: FastifyReply<any>, download?: string) {
	if (typeof download !== 'undefined') {
		if (download === '') {
			reply.header('Content-Disposition', 'attachment;');
		} else {
			const encodedFileName = encodeURIComponent(download);

			reply.header(
				'Content-Disposition',
				`inline; filename=${encodedFileName}; filename*=UTF-8''${encodedFileName};`
			);
		}
	}
}

export { handleDownload };
