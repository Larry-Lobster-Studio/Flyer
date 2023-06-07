import type { Dispatch, SetStateAction } from 'react';
import type { AxiosError } from 'axios';
import type { RecoveryFlow, UpdateRecoveryFlowBody } from '@ory/client';

import { useRouter } from 'next/navigation';

import ory, { handleFlowError } from '@/lib/authentication';
import { Flow } from '@/components/authentication';
import { isAxiosError } from 'axios';

interface Props {
	flow: RecoveryFlow | undefined;
	setFlow: Dispatch<SetStateAction<RecoveryFlow | undefined>>;
}
export default function RecoveryForm({ flow, setFlow }: Props) {
	const router = useRouter();

	const onSubmit = async (values: UpdateRecoveryFlowBody) => {
		router.replace(`/auth/recovery?flow=${flow?.id}`, {});

		ory
			.updateRecoveryFlow({
				flow: String(flow?.id),
				updateRecoveryFlowBody: values,
			})
			.then(({ data }) => {
				setFlow(data);
			})
			.catch(handleFlowError(router, 'recovery', setFlow))
			.catch((err: Error | AxiosError) => {
				if (isAxiosError(err)) {
					switch (err.response?.status) {
						case 400:
							setFlow(err.response?.data);
							return;
					}
				}

				throw err;
			});
	};

	return <Flow onSubmit={onSubmit} flow={flow} />;
}
