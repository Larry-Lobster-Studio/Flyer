import type { NextRequest } from 'next/server';

export async function isAuthenticated(request: NextRequest) {
	try {
		if (!request.cookies.has('flyer-session')) {
			return {
				authenticated: false,
				destination: '/auth/login',
			};
		}

		const cookie = request.cookies.get('flyer-session');

		const session = await fetch(
			`${process.env.NEXT_PUBLIC_ORY_URL}/sessions/whoami`,
			{
				headers: {
					Cookie: `${cookie!.name}=${cookie!.value}`,
				},
			}
		);

		switch (session.status) {
			case 200:
				return {
					authenticated: true,
					destination: '/',
				};
			case 403:
			case 422:
				return {
					authenticated: false,
					destination: '/auth/login?aal=aal2',
				};
			case 401:
				return {
					authenticated: false,
					destination: '/auth/login',
				};
			default:
				return {
					authenticated: false,
					destination: '/auth/login',
				};
		}
	} catch (error) {
		return {
			authenticated: false,
			destination: '/auth/login',
		};
	}
}
