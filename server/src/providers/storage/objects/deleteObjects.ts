import { DeleteObjectsCommand } from '@aws-sdk/client-s3';

import s3Client from '..';
import { StorageBackendError } from '../utils';

async function deleteObjects(bucket: string, prefixes: string[]): Promise<void> {
    try {
      const s3Prefixes = prefixes.map((ele) => {
        return { Key: ele }
      })

      const command = new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: s3Prefixes,
        },
      })
      await s3Client.send(command)
    } catch (e) {
      throw StorageBackendError.fromError(e)
    }
  }

export { deleteObjects };
