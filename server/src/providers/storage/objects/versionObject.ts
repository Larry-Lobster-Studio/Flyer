import type { ListObjectVersionsCommandInput } from '@aws-sdk/client-s3';

import { ListObjectVersionsCommand } from '@aws-sdk/client-s3';

import s3Client from '..';

export async function versionObject(bucketName: string, key: string) {
	const input: ListObjectVersionsCommandInput = {
		Bucket: bucketName,
		Prefix: key,
	};

	const command = new ListObjectVersionsCommand(input);
	const data = await s3Client.send(command);

	return {
		name: data.Name,
		delimiter: data.Delimiter,
		versions: data.Versions,
	};
}
