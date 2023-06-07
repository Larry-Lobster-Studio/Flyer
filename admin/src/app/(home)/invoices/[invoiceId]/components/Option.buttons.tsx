'use client';

import { Fragment } from 'react';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import {
	Archive,
	DotsThree,
	DownloadSimple,
	EnvelopeSimple,
	Eraser,
	TrashSimple,
} from '@phosphor-icons/react';

import { useGetInvoice, useSendInvoice } from '@/lib/api/invoice/invoice';

interface Props {
	invoiceId: string;
}

export default function OptionButtons({ invoiceId }: Props) {
	const queryClient = useQueryClient();
	const { data, isSuccess } = useGetInvoice(invoiceId);
	const { mutate } = useSendInvoice();

	return (
		<div className={clsx('flex items-stretch gap-x-3')}>
			{isSuccess && data.status === 'SENT' ? (
				<button
					type='button'
					className={clsx(
						'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
						'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
					)}
				>
					record payment
				</button>
			) : (
				<button
					type='button'
					onClick={() =>
						mutate(
							{ invoiceId, data: {} },
							{
								onSuccess(data, variables, context) {
									queryClient.invalidateQueries({
										queryKey: [`/v1/invoices/${invoiceId}`],
									});
								},
							}
						)
					}
					className={clsx(
						'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-gray text-white',
						'hover:bg-flyer-primary hover:text-flyer-gray hover:border-flyer-primary'
					)}
				>
					send invoice
				</button>
			)}

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
										<button
											type='button'
											onClick={() =>
												mutate(
													{
														invoiceId,
														data: {
															mark_sent: data?.status !== 'SENT' ? true : false,
															resend: data?.status === 'SENT' ? true : false,
														},
													},
													{
														onSuccess(data, variables, context) {
															queryClient.invalidateQueries({
																queryKey: [`/v1/invoices/${invoiceId}`],
															});
														},
													}
												)
											}
											className={clsx(
												'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
												active && 'bg-flyer-gray text-white'
											)}
										>
											<EnvelopeSimple size={16} />

											<p>
												{isSuccess && data.status === 'SENT'
													? 'resend invoice'
													: 'mark as sent'}
											</p>
										</button>
									);
								}}
							</Menu.Item>
						</div>

						<div className={clsx('p-1')}>
							{isSuccess && data.status === 'DRAFT' && (
								<Menu.Item>
									{({ active }) => {
										return (
											<button
												type='button'
												className={clsx(
													'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
													active && 'bg-flyer-gray text-white'
												)}
											>
												<Eraser size={16} />
												<span> edit</span>
											</button>
										);
									}}
								</Menu.Item>
							)}
							<Menu.Item>
								{({ active }) => {
									return (
										<a
											href={data?.document.url}
											download={data?.document.file_name}
											className={clsx(
												'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
												active && 'bg-flyer-gray text-white'
											)}
										>
											<DownloadSimple size={16} />
											<span>download</span>
										</a>
									);
								}}
							</Menu.Item>
						</div>

						<div className={clsx('p-1')}>
							{isSuccess && data.status === 'DRAFT' ? (
								<Menu.Item>
									{({ active }) => {
										return (
											<button
												type='button'
												className={clsx(
													'group flex items-center gap-x-2 w-full p-2 text-sm rounded-md',
													active && 'bg-red-500 text-white'
												)}
											>
												<TrashSimple size={16} />
												<span> delete </span>
											</button>
										);
									}}
								</Menu.Item>
							) : (
								<Menu.Item>
									{({ active }) => {
										return (
											<button
												type='button'
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
							)}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
