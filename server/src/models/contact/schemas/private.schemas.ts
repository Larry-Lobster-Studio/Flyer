import { DeleteItemResponse, ErrorResponse, MainQuery } from '@/common/types';
import {
	ContactParams,
	CreateContactBody,
	GetContactResponse,
	ListContactsResponse,
	UpdateContactBody,
} from '../interfaces';

export const CreateContactSchema = {
	description: 'create new contact',
	operationId: 'createContact',
	tags: ['contact'],
	body: CreateContactBody,
	response: {
		201: GetContactResponse,
		500: ErrorResponse,
	},
};

export const GetContactSchema = {
	description: 'get contact',
	operationId: 'getContact',
	tags: ['contact'],
	params: ContactParams,
	response: {
		200: GetContactResponse,
		500: ErrorResponse,
	},
};

export const UpdateContactSchema = {
	description: 'update contact',
	operationId: 'updateContact',
	tags: ['contact'],
	params: ContactParams,
	body: UpdateContactBody,
	response: {
		200: GetContactResponse,
		500: ErrorResponse,
	},
};

export const DeleteContactSchema = {
	description: 'delete contact',
	operationId: 'deleteContact',
	tags: ['contact'],
	params: ContactParams,
	response: {
		200: DeleteItemResponse,
		500: ErrorResponse,
	},
};

export const ListContactsSchema = {
	description: 'list all contacts',
	operationId: 'listContacts',
	tags: ['contact'],
	querystring: MainQuery,
	response: {
		200: ListContactsResponse,
		500: ErrorResponse,
	},
};
