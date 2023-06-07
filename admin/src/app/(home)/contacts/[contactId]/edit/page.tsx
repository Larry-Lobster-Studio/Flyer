'use client';

import type { FormValues } from './types/types';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { useGetContact, useUpdateContact } from '@/lib/api/contact/contact';

import { PageHeader } from '@/app/(home)/components';
import { FormWrapper } from '@/components/form';
import {
	HeaderRight,
	ContactDetails,
	BillingAddress,
	CopyBillingButton,
	ShippingAddress,
	BottomButtons,
} from './components';

export default function Page({ params }: { params: { contactId: string } }) {
	const { back } = useRouter();
	const queryClient = useQueryClient();
	const [isLoading, setLoading] = useState(false);
	const { data, isSuccess } = useGetContact(params.contactId);
	const { mutate } = useUpdateContact();
	const methods = useForm<FormValues>({});

	useEffect(() => {
		if (!isSuccess) return;

		methods.reset({
			...data,
			website: data.website ?? undefined,
			phone: data.phone ?? undefined,
			billing_address: data.billing_address
				? {
						name: data.billing_address.name ?? undefined,
						line_1: data.billing_address.line_1,
						line_2: data.billing_address.line_2 ?? undefined,
						city: data.billing_address.city,
						postal_code: data.billing_address.postal_code,
						state: data.billing_address.state ?? undefined,
						country: data.billing_address.country,
				  }
				: undefined,
			shipping_address: data.shipping_address
				? {
						name: data.shipping_address.name ?? undefined,
						line_1: data.shipping_address.line_1,
						line_2: data.shipping_address.line_2 ?? undefined,
						city: data.shipping_address.city,
						postal_code: data.shipping_address.postal_code,
						state: data.shipping_address.state ?? undefined,
						country: data.shipping_address.country,
				  }
				: undefined,
		});
	}, [data, isSuccess]);

	const updateContact: SubmitHandler<FormValues> = async (values) => {
		setLoading(true);

		try {
			mutate(
				{
					contactId: params.contactId,
					data: values,
				},
				{
					onSuccess(data, variables, context) {
						setLoading(false);
						queryClient.invalidateQueries({
							queryKey: ['/v1/contacts'],
						});
						queryClient.invalidateQueries({
							queryKey: [`/v1/contacts/${params.contactId}`],
						});
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
				<form onSubmit={methods.handleSubmit(updateContact)}>
					<PageHeader title='update contact' children={<HeaderRight />} />

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
