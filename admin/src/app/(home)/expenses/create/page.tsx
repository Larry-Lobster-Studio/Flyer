'use client';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import type { FormValues } from './types';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { addDays, format } from 'date-fns';
import {
	useForm,
	SubmitHandler,
	useFieldArray,
	FormProvider,
} from 'react-hook-form';

import { useCreateExpense } from '@/lib/api/expense/expense';
import { axiosInstance } from '@/lib/axios';

import { FormWrapper } from '@/components/form';
import { PageHeader } from '../../components';
import {
	AddItemModal,
	BottomButtons,
	ExpenseDetails,
	ExpenseItems,
	ExpenseUpload,
	HeaderRight,
} from './components';

export default function Page() {
	const { back } = useRouter();
	const { mutate } = useCreateExpense();
	const [isLoading, setLoading] = useState(false);
	const [files, setFiles] = useState<any[]>([]);
	const [modalStatus, setModalStatus] = useState(false);

	const methods = useForm<FormValues>({
		defaultValues: {
			expense_date: format(Date.now(), 'yyyy-MM-dd'),
			due_date: format(addDays(Date.now(), 30), 'yyyy-MM-dd'),
		},
	});

	const { append, fields, remove, move } = useFieldArray({
		control: methods.control,
		name: 'items',
	});

	const createExpense: SubmitHandler<FormValues> = async (values) => {
		setLoading(true);

		console.log('values: ', values);

		let evidence: string | undefined = undefined;

		if (files[0]) {
			console.log('file 0: ', files[0]);
			let formData = new FormData();
			const blob = new Blob([files[0].file], { type: files[0].file.type });

			formData.append('files', blob);

			let res = await axiosInstance.post('/v1/files', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				withCredentials: true,
			});

			if (res.status === 200) {
				evidence = res.data.id;
			}
		}

		try {
			mutate(
				{
					data: {
						...values,
						status: 'PAID',
						currency: 'EUR',
						document: evidence,
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
		<main className={clsx('p-4 h-full', 'sm')}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(createExpense)}>
					<PageHeader title='create expense' children={<HeaderRight />} />

					<div
						className={clsx(
							'flex flex-col gap-y-4',
							'sm:flex-row sm:justify-between sm:gap-x-8'
						)}
					>
						<div>
							{/* Expense details */}
							<FormWrapper
								title='Expense details'
								children={<ExpenseDetails isLoading={isLoading} />}
							/>

							{/* Expense items */}
							<FormWrapper
								title='item details'
								children={
									<ExpenseItems
										move={move}
										remove={remove}
										fields={fields}
										getValues={methods.getValues}
										setModalStatus={setModalStatus}
									/>
								}
							/>
						</div>

						<div className={clsx('flex-grow')}>
							{/* Upload expense file */}
							<FormWrapper
								title='expense file'
								children={<ExpenseUpload files={files} setFiles={setFiles} />}
							/>
						</div>
					</div>

					<BottomButtons />
				</form>
			</FormProvider>

			<AddItemModal
				append={append}
				items={methods.getValues('items')}
				modalStatus={modalStatus}
				setModalStatus={setModalStatus}
			/>
		</main>
	);
}
