import { ErrorResponse } from '@/common/types';
import { UpdateCompanySettingsBody } from '../interfaces';
import { GetCompanySettingsResponse } from '../interfaces/response';

export const UpdateCompanySettingsSchema = {
	description: 'update company settings',
	operationId: 'updateCompanySettings',
	tags: ['company settings'],
	body: UpdateCompanySettingsBody,
	response: {
		201: GetCompanySettingsResponse,
		500: ErrorResponse,
	},
};

export const GetCompanySettingsSchema = {
	description: 'get company settings',
	operationId: 'getCompanySettings',
	tags: ['company settings'],
	response: {
		200: GetCompanySettingsResponse,
		500: ErrorResponse,
	},
};
