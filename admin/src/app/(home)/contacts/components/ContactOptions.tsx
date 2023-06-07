'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { DotsThree, Eraser, TrashSimple } from '@phosphor-icons/react';

import DeleteContactModal from './deleteContact.modal';

interface Props {
	contactId: string;
}

export default function ContactOptions({ contactId }: Props) {
	const [deleteModalStatus, setDeleteModalStatus] = useState(false);

	return (
		<>
			<Menu as='div' className={clsx('relative ')}>
				<Menu.Button
					type='button'
					className={clsx(
						'p-2 h-fit text-sm rounded-lg border border-flyer-gray',
						'hover:bg-flyer-gray hover:text-white'
					)}
				>
					<DotsThree size={14} />
				</Menu.Button>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items
						className={clsx(
							'z-10 fixed origin-top-right right-8 mt-2 w-56 divide-y divide-flyer-gray/20 rounded-md shadow-lg bg-white'
						)}
					>
						<div className={clsx('p-1')}>
							<Menu.Item>
								<Link
									href={`/contacts/${contactId}/edit`}
									className={clsx(
										'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
										'ui-active:bg-flyer-gray ui-active:text-white'
									)}
								>
									<Eraser size={16} />
									<span> edit</span>
								</Link>
							</Menu.Item>
						</div>

						<div className={clsx('p-1')}>
							<Menu.Item>
								<button
									type='button'
									onClick={() => setDeleteModalStatus(!deleteModalStatus)}
									className={clsx(
										'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
										'ui-active:bg-orange-500 ui-active:text-white'
									)}
								>
									<TrashSimple size={16} />
									<span> archive </span>
								</button>
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>

			<DeleteContactModal
				contactId={contactId}
				modalStatus={deleteModalStatus}
				setModalStatus={setDeleteModalStatus}
			/>
		</>
	);
}
