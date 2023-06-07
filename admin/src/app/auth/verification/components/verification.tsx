'use client';

import type { AxiosError } from 'axios';
import type { VerificationFlow } from '@ory/client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { isAxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';

import ory, { handleFlowError } from '@/lib/authentication';
import VerificationForm from './form';

export function Verification() {
	const router = useRouter();
	const params = useParams();
	const [flow, setFlow] = useState<VerificationFlow>();

	useEffect(() => {
		if (flow) return;

		if (params.flow) {
			ory
				.getVerificationFlow({
					id: String(params.flow),
				})
				.then(({ data }) => {
					setFlow(data);
				})
				.catch((err: Error | AxiosError) => {
					if (isAxiosError(err)) {
						switch (err.response?.status) {
							case 410:
							case 403:
								return router.push('/auth/verification');
						}
					}
					throw err;
				});
			return;
		}

		ory
			.createBrowserVerificationFlow({
				returnTo: params.return_to,
			})
			.then(({ data }) => setFlow(data))
			.catch((err: AxiosError) => {
				switch (err.response?.status) {
					case 400:
						// Status code 400 implies the user is already signed in
						return router.push('/');
				}

				throw err;
			});
	}, [flow, params]);

	return (
		<div>
			<VerificationForm flow={flow} setFlow={setFlow} />
		</div>
	);
}
