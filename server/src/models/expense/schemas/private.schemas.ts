import { DeleteItemResponse, ErrorResponse, MainQuery } from '@/common/types';
import {
	CreateExpenseBody,
	ExpenseParams,
	GetExpenseResponse,
	ListExpensesResponse,
	UpdateExpenseBody,
} from '../interfaces';

export const CreateExpenseSchema = {
	description: 'create new expense',
	operationId: 'createExpense',
	tags: ['expense'],
	body: CreateExpenseBody,
	response: {
		201: GetExpenseResponse,
		500: ErrorResponse,
	},
};

export const GetExpenseSchema = {
	description: 'get expense',
	operationId: 'getExpense',
	tags: ['expense'],
	params: ExpenseParams,
	response: {
		200: GetExpenseResponse,
		500: ErrorResponse,
	},
};

export const UpdateExpenseSchema = {
	description: 'update expense',
	operationId: 'updateExpense',
	tags: ['expense'],
	params: ExpenseParams,
	body: UpdateExpenseBody,
	response: {
		200: GetExpenseResponse,
		500: ErrorResponse,
	},
};

export const DeleteExpenseSchema = {
	description: 'delete expense',
	operationId: 'deleteExpense',
	tags: ['expense'],
	params: ExpenseParams,
	response: {
		200: DeleteItemResponse,
		500: ErrorResponse,
	},
};

export const ListExpensesSchema = {
	description: 'list all expenses',
	operationId: 'listExpenses',
	tags: ['expense'],
	querystring: MainQuery,
	response: {
		200: ListExpensesResponse,
		500: ErrorResponse,
	},
};
