'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { UseFieldArrayAppend } from 'react-hook-form';
import type { FormItemValues, FormValues } from '../../types/types';

import { useState } from 'react';
import clsx from 'clsx';
import { evaluate, multiply, subtract } from 'mathjs';
import { useForm, SubmitHandler } from 'react-hook-form';

import generateFollowUpNumber from '@/lib/generateFollowUpNumber';

import SearchItem from './SearchItem';
import { Modal } from '@/components/modal';
import { TextInput, Textarea } from '@/components/input';

interface Props {
	modalStatus: boolean;
	setModalStatus: Dispatch<SetStateAction<boolean>>;
	append: UseFieldArrayAppend<FormValues, 'items'>;
	items: FormItemValues[];
}

export default function AddItemModal({
	modalStatus,
	setModalStatus,
	append,
	items,
}: Props) {
	const [isLoading, setLoading] = useState(false);

	const { register, handleSubmit, reset } = useForm<FormItemValues>();

	const addItem: SubmitHandler<FormItemValues> = async (values) => {
		console.log('values: ', values);
		try {
			const subTotal = multiply(values.price, values.quantity);
			const total = evaluate(`${subTotal} + ${values.tax}%`);
			const taxAmount = subtract(total, subTotal);

			const nextNo = generateFollowUpNumber(items);

			append({
				...values,
				no: nextNo,
				sub_total: subTotal,
				total,
				tax_amount: taxAmount,
			});

			reset();
			setModalStatus(false);
		} catch (error) {
			console.error('error: ', error);
		}
	};

	return (
		<Modal isOpen={modalStatus} setIsopen={setModalStatus} title='new item'>
			<SearchItem reset={reset} />

			<form onSubmit={handleSubmit(addItem)}>
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

					<div
						className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}
					>
						<TextInput
							label='price'
							type='number'
							min={0.01}
							step={0.01}
							placeholder='price'
							disabled={isLoading}
							{...register('price', { valueAsNumber: true })}
						/>
						<TextInput
							label='tax'
							type='number'
							min={0.01}
							step={0.01}
							placeholder='21'
							disabled={isLoading}
							{...register('tax', { valueAsNumber: true })}
						/>
					</div>

					<div
						className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}
					>
						<TextInput
							label='quantity'
							type='number'
							min={0.01}
							step={0.01}
							placeholder='2'
							disabled={isLoading}
							{...register('quantity', { valueAsNumber: true })}
						/>
						<TextInput
							label='unit'
							type='text'
							placeholder='item unit'
							disabled={isLoading}
							{...register('unit')}
						/>
					</div>
				</div>

				<div className={clsx('flex items-center justify-end gap-x-3 mt-8')}>
					<button
						type='button'
						onClick={() => setModalStatus(false)}
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
						add item
					</button>
				</div>
			</form>
		</Modal>
	);
}
