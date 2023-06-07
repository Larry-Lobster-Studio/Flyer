import { ErrorResponse, MainQuery } from '@/common/types';
import { DeleteResponse, FileParams, UploadResponse } from '../interfaces';

export const UploadFileSchema = {
	description: 'Upload new file',
	tags: ['file'],
	consumes: ['multipart/form-data'],
	response: {
		200: UploadResponse,
		500: ErrorResponse,
		413: ErrorResponse,
	},
};

export const DeleteFileSchema = {
	description: 'Delete file content',
	operationId: 'deleteFile',
	tags: ['file'],
	params: FileParams,
	response: {
		200: DeleteResponse,
		500: ErrorResponse,
	},
};

export const GetFileSchema = {
	description: 'Get file content',
	operationId: 'getFile',
	tags: ['file'],
	params: FileParams,
};
