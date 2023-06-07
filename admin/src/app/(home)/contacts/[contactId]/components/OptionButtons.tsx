'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { Archive, DotsThree, Pencil } from '@phosphor-icons/react';

import { useDeleteContact, useGetContact } from '@/lib/api/contact/contact';

interface Props {
	contactId: string;
}

export default function OptionButtons({ contactId }: Props) {
	const { back } = useRouter();
	const queryClient = useQueryClient();
	const { data, isSuccess } = useGetContact(contactId);
	const { mutate } = useDeleteContact();

	return (
		<div className={clsx('flex items-stretch gap-x-3')}>
			<Menu as='div' className={clsx('relative ')}>
				<Menu.Button
					type='button'
					className={clsx(
						'flex items-center gap-x-2 px-3 py-2 h-full text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
						'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
					)}
				>
					<DotsThree size={14} className={clsx('')} />
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
							'absolute origin-top-right right-0 mt-2 w-56 divide-y divide-flyer-gray/20 rounded-md shadow-lg bg-white'
						)}
					>
						<div className={clsx('p-1')}>
							<Menu.Item>
								{({ active }) => {
									return (
										<Link
											href={`/contacts/${contactId}/edit`}
											className={clsx(
												'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
												active && 'bg-flyer-gray text-white'
											)}
										>
											<Pencil size={16} />

											<p>edit</p>
										</Link>
									);
								}}
							</Menu.Item>
						</div>

						<div className={clsx('p-1')}>
							<Menu.Item>
								{({ active }) => {
									return (
										<button
											type='button'
											onClick={() =>
												mutate(
													{
														contactId,
													},
													{
														onSuccess(data, variables, context) {
															queryClient.invalidateQueries({
																queryKey: [`/v1/contacts/${contactId}`],
															});
															back();
														},
													}
												)
											}
											className={clsx(
												'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
												active && 'bg-orange-500 text-white'
											)}
										>
											<Archive size={16} />
											<span> archive </span>
										</button>
									);
								}}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
