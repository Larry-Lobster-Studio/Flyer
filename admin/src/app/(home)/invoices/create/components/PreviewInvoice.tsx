'use client';

import type { Dispatch, SetStateAction } from 'react';
import type {
	CreateInvoiceBody,
	GetInvoicePreviewBody,
} from '@/lib/api/interfaces';

import { useEffect, useState, Fragment } from 'react';
import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';

import {
	getInvoicePreview,
	useGetInvoicePreview,
} from '@/lib/api/invoice/invoice';

interface Props {
	sidebarStatus: boolean;
	setSidebarStatus: Dispatch<SetStateAction<boolean>>;
	invoice: GetInvoicePreviewBody;
}

export default function PreviewInvoice({
	invoice,
	sidebarStatus,
	setSidebarStatus,
}: Props) {
	const [pdf, setPdf] = useState<any>(undefined);
	const { mutate } = useGetInvoicePreview();

	useEffect(() => {
		if (!sidebarStatus) return;

		getInvoicePreview({ ...invoice }).then((data) => setPdf(data));
	}, [sidebarStatus]);

	return (
		<Transition.Root show={sidebarStatus} as={Fragment}>
			<Dialog
				as='div'
				onClose={setSidebarStatus}
				className={clsx('z-10 relative')}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-in-out duration-500'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in-out duration-500'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div
						className={clsx(
							'fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
						)}
					/>
				</Transition.Child>

				<div className={clsx('fixed inset-0 overflow-hidden')}>
					<div className={clsx('absolute inset-0 overflow-hidden')}>
						<div
							className={clsx(
								'fixed top-16 bottom-0 right-0 flex max-w-full pl-10'
							)}
						>
							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-700'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-700'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel className={clsx('relative w-screen max-w-xl')}>
									<Transition.Child
										as={Fragment}
										enter='ease-in-out duration-500'
										enterFrom='opacity-0'
										enterTo='opacity-100'
										leave='ease-in-out duration-500'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<div
											className={clsx(
												'absolute left-0 top-0 flex -ml-8 pr-2 pt-4',
												'sm:-ml-10 sm:pr-4'
											)}
										>
											<button
												type='button'
												onClick={() => setSidebarStatus(false)}
												className={clsx('')}
											>
												close
											</button>
										</div>
									</Transition.Child>
									<div
										className={clsx(
											'flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl'
										)}
									>
										<div className={clsx('px-4', 'sm:px-6')}>
											<Dialog.Title className={clsx('')}>
												Preview invoice
											</Dialog.Title>
										</div>

										<div
											className={clsx(
												'relative flex-1 w-full h-full mt-6 px-4',
												'sm:px-6'
											)}
										>
											{pdf && (
												<div className={clsx('w-full h-full')}>
													<object
														data={`${pdf}#&toolbar=0&navpanes=0&view=FitH `}
														width='100%'
														height='100%'
													/>
												</div>
											)}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
