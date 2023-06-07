import { ErrorResponse } from '@/common/types';
import { GetCompanyResponse, UpdateCompanyBody } from '../interfaces';

export const GetCompanySchema = {
	description: 'get company',
	operationId: 'getCompany',
	tags: ['company'],
	response: {
		200: GetCompanyResponse,
		500: ErrorResponse,
	},
};

export const UpdateCompanySchema = {
	description: 'update new company',
	operationId: 'updateCompany',
	tags: ['company'],
	body: UpdateCompanyBody,
	response: {
		201: GetCompanyResponse,
		500: ErrorResponse,
	},
};
