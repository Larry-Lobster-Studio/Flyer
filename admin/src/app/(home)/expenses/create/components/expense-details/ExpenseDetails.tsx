import type { FormValues } from '../../types';

import { Dispatch, SetStateAction, useState } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { PlusCircle } from '@phosphor-icons/react';

import { useGetContact } from '@/lib/api/contact/contact';

import { TextInput } from '@/components/input';
import SelectContactModal from './SelectContact.modal';

interface Props {
	isLoading: boolean;
}

export default function ExpenseDetails({ isLoading }: Props) {
	const { register, setValue, watch } = useFormContext<FormValues>();
	const [modalStatus, setModalStatus] = useState(false);

	const WContact = watch('contact');

	return (
		<>
			<div
				className={clsx(
					'flex items-stretch justify-between gap-x-8 mt-6',
					'sm:gap-x-12',
					'md:gap-x-16'
				)}
			>
				<Contact contactId={WContact} setModalStatus={setModalStatus} />

				<div className={clsx('flex items-stretch gap-x-6 w-full')}>
					<div className={clsx('w-full')}>
						<TextInput
							label='expense date'
							type='date'
							disabled={isLoading}
							{...register('expense_date')}
						/>

						<TextInput
							label='due date'
							type='date'
							disabled={isLoading}
							{...register('due_date')}
						/>
					</div>
				</div>
			</div>

			<SelectContactModal
				modalStatus={modalStatus}
				setModalStatus={setModalStatus}
				setValue={setValue}
			/>
		</>
	);
}

const Contact = ({
	setModalStatus,
	contactId,
}: {
	contactId?: string;
	setModalStatus: Dispatch<SetStateAction<boolean>>;
}) => {
	if (!contactId) {
		return (
			<button
				type='button'
				onClick={() => setModalStatus(true)}
				className={clsx(
					'flex items-center justify-center gap-x-2 w-full max-w-xs max-h-20 px-6 py-3 rounded-lg border border-dashed border-flyer-gray'
				)}
			>
				<PlusCircle size={20} />
				<span> add contact </span>
			</button>
		);
	} else {
		const { data } = useGetContact(contactId);
		return (
			<button
				type='button'
				onClick={() => setModalStatus(true)}
				className={clsx(
					'flex flex-col w-full max-w-xs max-h-20 px-6 py-3 rounded-lg border border-flyer-gray'
				)}
			>
				<span>{data?.name} </span>
				<span className={clsx('text-xs text-flyer-gray')}>{data?.email} </span>
				<span className={clsx('text-xs text-flyer-gray')}>{data?.vat} </span>
			</button>
		);
	}
};
