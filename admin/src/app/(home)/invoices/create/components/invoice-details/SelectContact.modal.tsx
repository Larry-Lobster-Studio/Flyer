'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { FormValues } from '../../types';

import { useState } from 'react';
import clsx from 'clsx';

import { Modal } from '@/components/modal';
import SearchContact from './SearchContact';

interface Props {
	modalStatus: boolean;
	setModalStatus: Dispatch<SetStateAction<boolean>>;
	setValue: UseFormSetValue<FormValues>;
}

export default function SelectContactModal({
	modalStatus,
	setModalStatus,
	setValue,
}: Props) {
	const [isLoading, setLoading] = useState(false);

	return (
		<Modal isOpen={modalStatus} setIsopen={setModalStatus} title='contact'>
			<div className={clsx('mt-6')}>
				<SearchContact setModalStatus={setModalStatus} setValue={setValue} />

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
						type='button'
						onClick={() => {
							setModalStatus(false);
						}}
						className={clsx(
							'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
							'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
						)}
					>
						set contact
					</button>
				</div>
			</div>
		</Modal>
	);
}
