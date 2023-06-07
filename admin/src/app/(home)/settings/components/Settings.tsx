'use client';

import type { SettingsFlow } from '@ory/client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';

import ory, { handleFlowError } from '@/lib/authentication';
import SettingsForm from './form';

export function Settings() {
	const router = useRouter();
	const params = useParams();
	const [flow, setFlow] = useState<SettingsFlow>();

	useEffect(() => {
		if (flow) return;

		if (params.flow) {
			ory
				.getSettingsFlow({
					id: String(params.flow),
				})
				.then(({ data }) => {
					setFlow(data);
				})
				.catch(handleFlowError(router, 'settings', setFlow));
			return;
		}

		ory
			.createBrowserSettingsFlow({
				returnTo: params.return_to,
			})
			.then(({ data }) => setFlow(data))
			.catch(handleFlowError(router, 'settings', setFlow));
	}, [flow, params]);

	return (
		<div>
			<SettingsForm flow={flow} setFlow={setFlow} />
		</div>
	);
}
