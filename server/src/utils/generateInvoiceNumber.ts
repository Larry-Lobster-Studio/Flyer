import { format } from 'date-fns';

export function generateInvoiceNumber(template: string, totalInvoices: number) {
	const components = template.split(/{{(.*?)}}/g);
	let invoiceNumber = '';

	for (let i = 0; i < components.length; i++) {
		const component = components[i];

		if (component.startsWith('SERIES:')) {
			invoiceNumber += component.substring('SERIES:'.length);
		} else if (component.startsWith('DELIMITER:')) {
			invoiceNumber += component.substring('DELIMITER:'.length);
		} else if (component.startsWith('SEQUENCE:')) {
			const sequenceLength = parseInt(component.substring('SEQUENCE:'.length));
			const sequence = (totalInvoices + 1)
				.toString()
				.padStart(sequenceLength, '0');

			invoiceNumber += sequence;
		} else if (component.startsWith('DATE_FORMAT:')) {
			const dateFormat = component.substring('DATE_FORMAT:'.length);
			const currentDate = new Date();
			const formattedDate = format(currentDate, dateFormat);

			invoiceNumber += formattedDate;
		}
	}

	return invoiceNumber;
}
