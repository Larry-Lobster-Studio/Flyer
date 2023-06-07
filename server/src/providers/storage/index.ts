import https from 'https';

import { S3Client } from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';

import { config } from '@/config/main.config';

const s3Client = new S3Client({
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: String(process.env.S3_ACCESS_KEY),
		secretAccessKey: String(process.env.S3_SECRET_KEY),
	},
	endpoint: String(process.env.S3_HOSTNAME),
	forcePathStyle: true,
	runtime: 'node',
	requestHandler: new NodeHttpHandler({
		httpsAgent: new https.Agent({
			maxSockets: 50,
			keepAlive: true,
		}),
		socketTimeout: 3000,
	}),
});

export default s3Client;
