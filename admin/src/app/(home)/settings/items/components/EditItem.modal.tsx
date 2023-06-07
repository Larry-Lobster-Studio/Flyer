'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

import { useState } from 'react';
import clsx from 'clsx';
import { multiply } from 'mathjs';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useGetItem, useUpdateItem } from '@/lib/api/item/item';

import { Modal } from '@/components/modal';
import { TextInput, Textarea } from '@/components/input';

interface FormValues {
	name?: string;
	description?: string;
	unit?: string;
	price?: number;
	tax?: number;
}

interface Props {
	itemId: string;
	modalStatus: boolean;
	setModalStatus: Dispatch<SetStateAction<boolean>>;
}

export default function EditItemModal({
	itemId,
	modalStatus,
	setModalStatus,
}: Props) {
	const queryClient = useQueryClient();
	const { data, isSuccess } = useGetItem(itemId);
	const { mutate } = useUpdateItem();
	const [isLoading, setLoading] = useState(false);

	const { register, handleSubmit, reset } = useForm<FormValues>();

	useEffect(() => {
		if (!isSuccess) return;

		reset({
			...data,
			description: data.description ?? undefined,
			tax: Number(data.tax),
			price: Number(data.price),
		});
	}, [data, isSuccess]);

	const createItem: SubmitHandler<FormValues> = async (values) => {
		setLoading(true);
		console.log('values: ', values);
		try {
			mutate(
				{
					itemId,
					data: {
						...values,
						price: values.price ? multiply(values.price, 100) : undefined,
					},
				},
				{
					onSuccess(data, variables, context) {
						setLoading(false);
						reset();
						queryClient.invalidateQueries({
							queryKey: [`/v1/items/${data.id}`],
						});
						queryClient.invalidateQueries({
							queryKey: [`/v1/items`],
						});
						setModalStatus(false);
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
		<Modal isOpen={modalStatus} setIsopen={setModalStatus} title='new item'>
			<form onSubmit={handleSubmit(createItem)} className={clsx('mt-6')}>
				<div>
					<TextInput
						label='name'
						type='text'
						placeholder='item name'
						disabled={isLoading}
						{...register('name')}
					/>
					<Textarea
						label='description'
						placeholder='item description'
						disabled={isLoading}
						{...register('description')}
					/>
				</div>

				<TextInput
					label='price'
					type='number'
					min={0.01}
					step={0.01}
					placeholder='price'
					disabled={isLoading}
					{...register('price', { valueAsNumber: true })}
				/>

				<div
					className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}
				>
					<TextInput
						label='tax'
						type='number'
						min={0.01}
						step={0.01}
						placeholder='tax'
						disabled={isLoading}
						{...register('tax', { valueAsNumber: true })}
					/>
					<TextInput
						label='unit'
						type='text'
						placeholder='item unit'
						disabled={isLoading}
						{...register('unit')}
					/>
				</div>

				<div className={clsx('flex items-center justify-end gap-x-3 mt-8')}>
					<button
						type='reset'
						onClick={() => {
							reset();
							setModalStatus(false);
						}}
						className={clsx(
							'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-white text-flyer-gray',
							'hover:bg-rose-400 hover:border-rose-400 hover:text-flyer-white'
						)}
					>
						<span>cancel</span>
					</button>

					<button
						type='submit'
						className={clsx(
							'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
							'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
						)}
					>
						create item
					</button>
				</div>
			</form>
		</Modal>
	);
}
