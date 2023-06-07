'use client';

import type { RecoveryFlow } from '@ory/client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';

import ory, { handleFlowError } from '@/lib/authentication';
import RecoveryForm from './form';

export function Recovery() {
	const router = useRouter();
	const params = useParams();
	const [flow, setFlow] = useState<RecoveryFlow>();

	useEffect(() => {
		if (flow) return;

		if (params.flow) {
			ory
				.getRecoveryFlow({
					id: String(params.flow),
				})
				.then(({ data }) => {
					setFlow(data);
				})
				.catch(handleFlowError(router, 'recovery', setFlow));
			return;
		}

		ory
			.createBrowserRecoveryFlow({
				returnTo: params.return_to,
			})
			.then(({ data }) => setFlow(data))
			.catch(handleFlowError(router, 'login', setFlow));
	}, [flow, params]);

	return (
		<div>
			<RecoveryForm flow={flow} setFlow={setFlow} />
		</div>
	);
}
