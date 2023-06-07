'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Plus } from '@phosphor-icons/react';

import CreateItemModal from './CreateItem.modal';

export default function HeaderRight() {
	const [modalStatus, setModalStatus] = useState(false);

	return (
		<>
			<div className={clsx('flex items-center gap-x-3')}>
				<button
					type='button'
					onClick={() => setModalStatus(!modalStatus)}
					className={clsx(
						'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
						'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
					)}
				>
					<Plus size={14} className={clsx('')} />
					<span>item</span>
				</button>
			</div>

			<CreateItemModal
				modalStatus={modalStatus}
				setModalStatus={setModalStatus}
			/>
		</>
	);
}
