'use client';

import type { FormValues } from './types/types';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { getQueryClient } from '@/lib/query';
import { useCreateContact } from '@/lib/api/contact/contact';

import { PageHeader } from '../../components';
import { FormWrapper } from '@/components/form';
import {
	HeaderRight,
	ContactDetails,
	BillingAddress,
	ShippingAddress,
	BottomButtons,
	CopyBillingButton,
} from './components';

export default function Page() {
	const { back } = useRouter();
	const queryClient = getQueryClient();
	const [isLoading, setLoading] = useState(false);
	const { mutate } = useCreateContact();

	const methods = useForm<FormValues>({});

	const createContact: SubmitHandler<FormValues> = async (values) => {
		setLoading(true);

		try {
			mutate(
				{
					data: values,
				},
				{
					onSuccess(data, variables, context) {
						setLoading(false);
						back();
					},
					onError(error, variables, context) {
						setLoading(false);
					},
				}
			);
		} catch (error) {
			console.error;
			setLoading(false);
		}
	};

	return (
		<main className={clsx('p-4', 'sm')}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(createContact)}>
					<PageHeader title='create contact' children={<HeaderRight />} />

					<div>
						{/* Contact details */}
						<FormWrapper
							title='contact details'
							children={<ContactDetails isLoading={isLoading} />}
						/>

						{/* Billing address */}
						<FormWrapper
							title='Billing address'
							children={<BillingAddress isLoading={isLoading} />}
						/>

						{/* Shipping address */}
						<FormWrapper
							title='Shipping address'
							rightSide={<CopyBillingButton />}
							children={<ShippingAddress isLoading={isLoading} />}
						/>
					</div>

					<BottomButtons />
				</form>
			</FormProvider>
		</main>
	);
}
