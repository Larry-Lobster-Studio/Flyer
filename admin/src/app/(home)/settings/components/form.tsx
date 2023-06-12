import type { Dispatch, SetStateAction } from 'react';
import type { AxiosError } from 'axios';
import type { SettingsFlow, UpdateSettingsFlowBody } from '@ory/client';

import { useRouter } from 'next/navigation';

import ory, { handleFlowError } from '@/lib/authentication';
import { Flow } from '@/components/authentication';
import { isAxiosError } from 'axios';
import clsx from 'clsx';

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

	return (
		<div className={clsx('flex flex-col')}>
			<div
				className={clsx('mb-9 px-6 pt-6 pb-8 bg-white rounded-xl shadow-lg')}
			>
				<h3 className={clsx('mb-4')}> profile </h3>

				<Flow onSubmit={onSubmit} flow={flow} only='profile' />
			</div>
			<div
				className={clsx('mb-9 px-6 pt-6 pb-8 bg-white rounded-xl shadow-lg')}
			>
				<h3 className={clsx('mb-4')}> password </h3>

				<Flow onSubmit={onSubmit} flow={flow} only='password' />
			</div>
			<div
				className={clsx('mb-9 px-6 pt-6 pb-8 bg-white rounded-xl shadow-lg')}
			>
				<h3 className={clsx('mb-4')}> 2FA </h3>

				<Flow onSubmit={onSubmit} flow={flow} only='totp' />
			</div>
		</div>
	);
}
