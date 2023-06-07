export interface FormItemValues {
	no: string;
	name: string;
	description?: string;
	quantity: number;
	unit: string;
	price: number;
	tax: number;
	tax_amount: number;
	sub_total: number;
	total: number;
}

export interface FormValues {
	invoice_number: string;
	reference_number?: string;
	contact: string;
	invoice_date: string;
	due_date: string;
	notes?: string;
	items: FormItemValues[];
}
