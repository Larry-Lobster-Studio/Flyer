import type { GetObjectCommandInput } from '@aws-sdk/client-s3';

import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import s3Client from '..';

async function privateAssetUrl(
	bucket: string,
	key: string,
	versionId?: string
): Promise<string> {
	const input: GetObjectCommandInput = {
		Bucket: bucket,
		Key: key,
		VersionId: versionId,
	};

	const command = new GetObjectCommand(input);
	return getSignedUrl(s3Client, command, { expiresIn: 600 });
}

export { privateAssetUrl };
