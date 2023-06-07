export default function generateFollowUpNumber(items: any[]) {
	const lastItem = items[items.length - 1];
	if (!lastItem) {
		return '01';
	}
	const lastNumber = parseInt(lastItem.no, 10);
	if (isNaN(lastNumber)) {
		return '01';
	}
	const nextNumber = lastNumber + 1;
	return nextNumber.toString().padStart(2, '0');
}
