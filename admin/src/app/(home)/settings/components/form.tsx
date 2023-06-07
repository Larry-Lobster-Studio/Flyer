import type { Dispatch, SetStateAction } from 'react';
import type { AxiosError } from 'axios';
import type { SettingsFlow, UpdateSettingsFlowBody } from '@ory/client';

import { useRouter } from 'next/navigation';

import ory, { handleFlowError } from '@/lib/authentication';
import { Flow } from '@/components/authentication';
import { isAxiosError } from 'axios';

interface Props {
	flow: SettingsFlow | undefined;
	setFlow: Dispatch<SetStateAction<SettingsFlow | undefined>>;
}
export default function SettingsForm({ flow, setFlow }: Props) {
	const router = useRouter();

	const onSubmit = async (values: UpdateSettingsFlowBody) => {
		router.replace(`/settings?flow=${flow?.id}`, {});

		ory
			.updateSettingsFlow({
				flow: String(flow?.id),
				updateSettingsFlowBody: values,
			})
			.then(({ data }) => {
				setFlow(data);
			})
			.catch(handleFlowError(router, 'settings', setFlow))
			.catch((err: Error | AxiosError) => {
				if (isAxiosError(err) && err.response?.status === 400) {
					setFlow(err.response?.data);
					return;
				}
				return Promise.reject(err);
			});
	};

	return <Flow onSubmit={onSubmit} flow={flow} />;
}
