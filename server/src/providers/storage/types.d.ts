export interface BrowserCacheHeaders {
	ifModifiedSince?: string;
	ifNoneMatch?: string;
	range?: string;
}

export type ObjectResponse = {
	metadata: ObjectMetadata;
	body?: ReadableStream<any> | Readable | Blob | Buffer;
};

export type ObjectMetadata = {
	cacheControl: string;
	contentLength: number;
	size: number;
	mimetype: string;
	lastModified?: Date;
	eTag: string;
	contentRange?: string;
	httpStatusCode: number;
};

export interface UploaderOptions {
	key: string;
	fileSizeLimit?: number;
	allowedMimeTypes?: string[] | null;
}
