import { Static, Type } from '@sinclair/typebox';

export const FileParams = Type.Object({
	fileId: Type.String(),
});

export type FileParamsType = Static<typeof FileParams>;
