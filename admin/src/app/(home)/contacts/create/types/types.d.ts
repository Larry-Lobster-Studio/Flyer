export interface IAddress {
	name?: string;
	line_1: string;
	line_2?: string;
	city: string;
	postal_code: string;
	state?: string;
	country: string;
}

export interface FormValues {
	name: string;
	email: string;
	vat: string;
	website?: string;
	phone?: string;
	billing_address: IAddress;
	shipping_address: IAddress;
}
