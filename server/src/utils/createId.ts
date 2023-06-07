import { customAlphabet, nanoid } from 'nanoid';

export function createId(prefix: string, length: number = 21): string {
	return `${prefix}_${nanoid(length)}`;
}

export function createS3Key(company: string, length: number = 15): string {
	const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

	return `${company}-${nanoid(length)}`;
}

export function createShortId(length: number): string {
	const nanoid = customAlphabet(
		'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		length
	);

	return nanoid();
}
