'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { UseFieldArrayAppend } from 'react-hook-form';
import type { FormItemValues, FormValues } from '../../types/types';

import { useState } from 'react';
import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';

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
			append({
				...values,
			});

			reset();
			setModalStatus(false);
		} catch (error) {
			console.error('error: ', error);
		}
	};

	return (
		<Modal isOpen={modalStatus} setIsopen={setModalStatus} title='new item'>
			<form onSubmit={handleSubmit(addItem)}>
				<div>
					<TextInput
						label='category'
						type='text'
						placeholder='category'
						disabled={isLoading}
						{...register('category')}
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
							label='sub total'
							type='number'
							min={0.01}
							step={0.01}
							placeholder='sub total'
							disabled={isLoading}
							{...register('sub_total', { valueAsNumber: true })}
						/>
						<TextInput
							label='total'
							type='number'
							min={0.01}
							step={0.01}
							placeholder='21'
							disabled={isLoading}
							{...register('total', { valueAsNumber: true })}
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
