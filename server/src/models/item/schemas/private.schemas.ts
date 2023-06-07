import { DeleteItemResponse, ErrorResponse, MainQuery } from '@/common/types';
import {
	CreateItemBody,
	GetItemResponse,
	ItemParams,
	ListItemsResponse,
	UpdateItemBody,
} from '../interfaces';

export const CreateItemSchema = {
	description: 'create new item',
	operationId: 'createItem',
	tags: ['item'],
	body: CreateItemBody,
	response: {
		201: GetItemResponse,
		500: ErrorResponse,
	},
};

export const UpdateItemSchema = {
	description: 'update new item',
	operationId: 'updateItem',
	tags: ['item'],
	params: ItemParams,
	body: UpdateItemBody,
	response: {
		201: GetItemResponse,
		500: ErrorResponse,
	},
};

export const GetItemSchema = {
	description: 'get item',
	operationId: 'getItem',
	tags: ['item'],
	params: ItemParams,
	response: {
		200: GetItemResponse,
		500: ErrorResponse,
	},
};

export const DeleteItemSchema = {
	description: 'delete item',
	operationId: 'deleteItem',
	tags: ['item'],
	params: ItemParams,
	response: {
		200: DeleteItemResponse,
		500: ErrorResponse,
	},
};

export const ListItemsSchema = {
	description: 'list all items',
	operationId: 'listItems',
	tags: ['item'],
	querystring: MainQuery,
	response: {
		200: ListItemsResponse,
		500: ErrorResponse,
	},
};
