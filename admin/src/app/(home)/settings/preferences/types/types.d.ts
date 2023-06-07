export interface InvoiceFormValues {
	format: {
		component: {
			name: string;
			description: string;
		};
		value: string;
	}[];
}

export interface ILanguage {
	name: string;
	code: string;
}

export interface ICurrency {
	name: string;
	demonym: string;
	majorSingle: string;
	majorPlural: string;
	ISOnum: number | null;
	symbol: string;
	symbolNative: string;
	minorSingle: string;
	minorPlural: string;
	ISOdigits: number;
	decimals: number;
	numToBasic: number | null;
	code: string;
}
