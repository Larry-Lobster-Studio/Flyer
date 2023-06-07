export function convertDecimalToScale(decimal: Number) {
	const str = decimal.toString();
	const decimalIndex = str.indexOf('.');
	const scale = decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
	const wholeNumber = parseInt(decimal.toString().replace('.', ''));
	return {
		amount: wholeNumber,
		scale: scale,
	};
}

export function convertScaleToDecimal({
	amount,
	scale,
}: {
	amount: number;
	scale: number;
}): number {
	return amount / 10 ** scale;
}
