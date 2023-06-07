import { DeleteItemResponse, ErrorResponse, MainQuery } from '@/common/types';
import {
	CreateInvoiceBody,
	GetInvoiceResponse,
	InvoiceParams,
	ListInvoicesResponse,
	NextInvoiceNumberResponse,
	SendInvoiceBody,
	UpdateInvoiceBody,
} from '../interfaces';

export const CreateInvoiceSchema = {
	description: 'create new invoice',
	operationId: 'createInvoice',
	tags: ['invoice'],
	body: CreateInvoiceBody,
	response: {
		201: GetInvoiceResponse,
		500: ErrorResponse,
	},
};

export const GetInvoiceSchema = {
	description: 'get invoice',
	operationId: 'getInvoice',
	tags: ['invoice'],
	params: InvoiceParams,
	response: {
		200: GetInvoiceResponse,
		500: ErrorResponse,
	},
};

export const UpdateInvoiceSchema = {
	description: 'update invoice',
	operationId: 'updateInvoice',
	tags: ['invoice'],
	params: InvoiceParams,
	body: UpdateInvoiceBody,
	response: {
		200: GetInvoiceResponse,
		500: ErrorResponse,
	},
};

export const DeleteInvoiceSchema = {
	description: 'delete invoice',
	operationId: 'deleteInvoice',
	tags: ['invoice'],
	params: InvoiceParams,
	response: {
		200: DeleteItemResponse,
		500: ErrorResponse,
	},
};

export const ListInvoicesSchema = {
	description: 'list all invoices',
	operationId: 'listInvoices',
	tags: ['invoice'],
	querystring: MainQuery,
	response: {
		200: ListInvoicesResponse,
		500: ErrorResponse,
	},
};

export const InvoicePreviewSchema = {
	description: 'get invoice preview',
	operationId: 'getInvoicePreview',
	tags: ['invoice'],
	body: CreateInvoiceBody,
};

export const GetNextInvoiceNumberSchema = {
	description: 'get next invoice number',
	operationId: 'nextInvoiceNumber',
	tags: ['invoice'],
	response: {
		200: NextInvoiceNumberResponse,
		500: ErrorResponse,
	},
};

export const SendInvoiceSchema = {
	description: 'send invoice',
	operationId: 'sendInvoice',
	tags: ['invoice'],
	params: InvoiceParams,
	body: SendInvoiceBody,
	response: {
		500: ErrorResponse,
	},
};
