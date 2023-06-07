import { Static, Type } from '@sinclair/typebox';

export const UploadResponse = Type.Object({
	object: Type.String(),
	id: Type.String(),
});

export type UploadResponseType = Static<typeof UploadResponse>;

export const DeleteResponse = Type.Object({
	id: Type.String(),
	object: Type.String(),
	deleted: Type.Boolean(),
});

export type DeleteResponseType = Static<typeof DeleteResponse>;
