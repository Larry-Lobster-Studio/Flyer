'use client';

import type { LoginFlow } from '@ory/client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';

import ory, { handleFlowError } from '@/lib/authentication';
import LoginForm from './form';

export function Login() {
	const router = useRouter();
	const params = useParams();
	const [flow, setFlow] = useState<LoginFlow>();

	useEffect(() => {
		if (flow) return;

		if (params.flow) {
			ory
				.getLoginFlow({
					id: String(params.flow),
				})
				.then(({ data }) => {
					console.log('data: ', data);
					setFlow(data);
				})
				.catch(handleFlowError(router, 'login', setFlow));
			return;
		}

		ory
			.createBrowserLoginFlow({
				aal: params.aal,
				refresh: params.refresh ? Boolean(params.refres) : false,
				returnTo: params.return_to,
			})
			.then(({ data }) => setFlow(data))
			.catch(handleFlowError(router, 'login', setFlow));
	}, [flow, params]);

	return (
		<div className={clsx('w-full')}>
			<LoginForm flow={flow} setFlow={setFlow} />
		</div>
	);
}
