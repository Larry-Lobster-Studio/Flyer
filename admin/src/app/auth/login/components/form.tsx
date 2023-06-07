import type { Dispatch, SetStateAction } from 'react';
import type { AxiosError } from 'axios';
import type { LoginFlow, UpdateLoginFlowBody } from '@ory/client';

import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';

import ory, { handleFlowError } from '@/lib/authentication';
import { Flow } from '@/components/authentication';

interface Props {
	flow: LoginFlow | undefined;
	setFlow: Dispatch<SetStateAction<LoginFlow | undefined>>;
}
export default function LoginForm({ flow, setFlow }: Props) {
	const router = useRouter();

	const onSubmit = async (values: UpdateLoginFlowBody) => {
		router.replace(`/auth/login?flow=${flow?.id}`, {});

		ory
			.updateLoginFlow({
				flow: String(flow?.id),
				updateLoginFlowBody: values,
			})
			.then((res) => {
				if (flow?.return_to) {
					window.location.href = flow?.return_to;
					return;
				}
				router.push('/');
			})
			.then(() => {})
			.catch(handleFlowError(router, 'login', setFlow))
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
