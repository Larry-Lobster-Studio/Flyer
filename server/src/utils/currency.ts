import type { Dinero, DineroSnapshot } from 'dinero.js';
import type { Currency } from '@dinero.js/currencies';

import { toSnapshot, trimScale, dinero, toDecimal } from 'dinero.js';
import * as dCurrencies from '@dinero.js/currencies';

import prisma from '@/providers/database/prisma';

interface IGetCurrency {
	companyId: string;
}

export async function getCurrency({
	companyId,
}: IGetCurrency): Promise<Currency<number>> {
	const settings = await prisma.companySettings.findUnique({
		where: {
			company_id: companyId,
		},
	});

	const currency: Currency<number> = dCurrencies[settings!.currency];

	return currency;
}

export function currencyObject(object: Dinero<number>) {
	return toSnapshot(trimScale(object));
}

interface ICurrencyString {
	amount: number;
	currency: {
		code: string;
		base: number;
		exponent: number;
	};
	scale: number;
}

export function currencyString(object: DineroSnapshot<number>) {
	return toDecimal(dinero(object));
}
