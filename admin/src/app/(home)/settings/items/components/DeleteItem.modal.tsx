'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

import { useState } from 'react';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteItem } from '@/lib/api/item/item';

import { Modal } from '@/components/modal';

interface Props {
	itemId: string;
	modalStatus: boolean;
	setModalStatus: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteItemModal({
	itemId,
	modalStatus,
	setModalStatus,
}: Props) {
	const queryClient = useQueryClient();
	const { mutate } = useDeleteItem();
	const [isLoading, setLoading] = useState(false);

	async function deleteItem() {
		setLoading(true);

		try {
			mutate(
				{
					itemId,
				},
				{
					onSuccess(data, variables, context) {
						setLoading(false);
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
	}

	return (
		<Modal isOpen={modalStatus} setIsopen={setModalStatus} title='new item'>
			{/* Content */}
			<div className={clsx('pt-1 pb-4 text-sm')}>
				<p>
					This will permanently remove this category. This action cannot be
					undone.
				</p>
			</div>

			{/* Buttons */}
			<div className={clsx('flex items-center justify-end gap-x-2')}>
				<button
					onClick={() => setModalStatus(false)}
					disabled={isLoading}
					className={clsx(
						'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-white text-flyer-gray',
						'hover:bg-rose-400 hover:border-rose-400 hover:text-flyer-white'
					)}
				>
					<span>cancel</span>
				</button>

				<button
					onClick={() => deleteItem()}
					disabled={isLoading}
					className={clsx(
						'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
						'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
					)}
				>
					{isLoading ? <span>deleting item</span> : 'delete item'}
				</button>
			</div>
		</Modal>
	);
}
