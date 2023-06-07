function normalizeContentType(
	contentType: string | undefined
): string | undefined {
	if (contentType?.includes('text/html')) {
		return 'text/plain';
	}
	return contentType;
}

export { normalizeContentType };
