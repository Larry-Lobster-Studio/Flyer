'use client';

import type { FormValues } from './types/types';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { divide, multiply } from 'mathjs';
import { addDays, format } from 'date-fns';
import {
	useForm,
	SubmitHandler,
	useFieldArray,
	FormProvider,
} from 'react-hook-form';

import {
	useCreateInvoice,
	useNextInvoiceNumber,
} from '@/lib/api/invoice/invoice';

import { FormWrapper } from '@/components/form';
import { PageHeader } from '../../components';
import {
	HeaderRight,
	InvoiceDetails,
	InvoiceItems,
	InvoiceAdditional,
	BottomButtons,
	PreviewInvoice,
	AddItemModal,
} from './components';

export default function Page() {
	const { back } = useRouter();
	const { mutate } = useCreateInvoice();
	const { data, isSuccess } = useNextInvoiceNumber();
	const [isLoading, setLoading] = useState(false);
	const [modalStatus, setModalStatus] = useState(false);
	const [sidebarStatus, setSidebarStatus] = useState(false);

	const methods = useForm<FormValues>({
		defaultValues: {
			invoice_number: data?.number,
			invoice_date: format(Date.now(), 'yyyy-MM-dd'),
			due_date: format(addDays(Date.now(), 30), 'yyyy-MM-dd'),
		},
	});

	const { append, fields, remove, move } = useFieldArray({
		control: methods.control,
		name: 'items',
	});

	useEffect(() => {
		if (!isSuccess) return;

		methods.setValue('invoice_number', data.number);
	}, [data, isSuccess]);

	const createInvoice: SubmitHandler<FormValues> = async (values) => {
		setLoading(true);

		try {
			mutate(
				{
					data: {
						...values,
						items: values.items.map((item) => {
							return {
								...item,
								tax: divide(item.tax, 100),
								price: multiply(item.price, 100),
								sub_total: multiply(item.sub_total, 100),
								total: Number(multiply(item.total, 100)),
								tax_amount: Number(multiply(item.tax_amount, 100)),
							};
						}),
					},
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
				<form onSubmit={methods.handleSubmit(createInvoice)}>
					<PageHeader
						title='create invoice'
						children={<HeaderRight setSidebarStatus={setSidebarStatus} />}
					/>

					<div>
						{/* Invoice details */}
						<FormWrapper
							title='invoice details'
							children={<InvoiceDetails isLoading={isLoading} />}
						/>

						{/* Invoice items */}
						<FormWrapper
							title='item details'
							children={
								<InvoiceItems
									move={move}
									remove={remove}
									fields={fields}
									getValues={methods.getValues}
									setModalStatus={setModalStatus}
								/>
							}
						/>
						{/* Invoice additional details */}
						<FormWrapper
							title='additional'
							children={<InvoiceAdditional isLoading={isLoading} />}
						/>
					</div>

					<BottomButtons />
				</form>
			</FormProvider>

			{sidebarStatus && (
				<PreviewInvoice
					sidebarStatus={sidebarStatus}
					setSidebarStatus={setSidebarStatus}
					invoice={{
						...methods.getValues(),
						items: methods.getValues().items.map((item) => {
							return {
								...item,
								tax: divide(item.tax, 100),
								price: multiply(item.price, 100),
								sub_total: multiply(item.sub_total, 100),
								total: Number(multiply(item.total, 100)),
								tax_amount: Number(multiply(item.tax_amount, 100)),
							};
						}),
					}}
				/>
			)}

			<AddItemModal
				append={append}
				items={methods.getValues('items')}
				modalStatus={modalStatus}
				setModalStatus={setModalStatus}
			/>
		</main>
	);
}
