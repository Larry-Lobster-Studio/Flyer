import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { isAuthenticated } from './lib/authentication';

export async function middleware(request: NextRequest) {
	const { authenticated, destination } = await isAuthenticated(request);

	if (!authenticated) {
		if (request.nextUrl.pathname.startsWith('/auth'))
			return NextResponse.next();
		else return NextResponse.redirect(new URL(destination, request.url));
	}

	if (authenticated) {
		if (request.nextUrl.pathname.startsWith('/auth')) {
			return NextResponse.redirect(new URL('/', request.url));
		}
	}

	// return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};
