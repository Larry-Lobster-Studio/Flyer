import type { Dispatch, SetStateAction } from 'react';
import type { AxiosError } from 'axios';
import type { VerificationFlow, UpdateVerificationFlowBody } from '@ory/client';

import { useRouter } from 'next/navigation';

import ory from '@/lib/authentication';
import { Flow } from '@/components/authentication';

interface Props {
	flow: VerificationFlow | undefined;
	setFlow: Dispatch<SetStateAction<VerificationFlow | undefined>>;
}
export default function RecoveryForm({ flow, setFlow }: Props) {
	const router = useRouter();

	const onSubmit = async (values: UpdateVerificationFlowBody) => {
		router.replace(`/auth/verification?flow=${flow?.id}`, {});

		ory
			.updateVerificationFlow({
				flow: String(flow?.id),
				updateVerificationFlowBody: values,
			})
			.then(({ data }) => {
				setFlow(data);
			})
			.catch((err: AxiosError) => {
				switch (err.response?.status) {
					case 400:
						setFlow(err.response.data as VerificationFlow | undefined);
						return;
					case 410:
						const data = err.response.data as any;
						const newFlowID = data.use_flow_id;
						router.replace(`/auth/verification?flow=${newFlowID}`);

						ory
							.getVerificationFlow({ id: newFlowID })
							.then(({ data }) => setFlow(data));
						return;
				}

				throw err;
			});
	};

	return <Flow onSubmit={onSubmit} flow={flow} />;
}
