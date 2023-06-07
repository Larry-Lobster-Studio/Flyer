export interface FormItemValues {
	category: string;
	sub_total: number;
	total: number;
	description?: string;
	metadata?: JSON;
}

export interface FormValues {
	contact: string;
	currency: string;
	expense_date: string;
	status: CreateExpenseBodyStatus;
	items: FormItemValues[];
	due_date?: string;
	notes?: string;
	paid_amount?: number;
	paid_date?: string;
	terms?: string;
}
