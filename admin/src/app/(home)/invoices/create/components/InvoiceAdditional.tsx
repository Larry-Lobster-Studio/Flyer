import type { FormValues } from '../types/types';

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { CreditCard } from '@phosphor-icons/react';

import { Textarea } from '@/components/input';

interface Props {
	isLoading: boolean;
}

export default function InvoiceAdditional({ isLoading }: Props) {
	const { register } = useFormContext<FormValues>();

	return (
		<div className={clsx('mt-6')}>
			<Textarea
				label='notes'
				placeholder='your notes'
				disabled={isLoading}
				{...register('notes')}
			/>

			<div className={clsx('mt-10')}>
				<div
					className={clsx(
						'flex items-center justify-center gap-x-2 w-full max-w-xs max-h-20 px-6 py-3 rounded-lg border border-dashed border-flyer-gray'
					)}
				>
					<CreditCard size={20} />
					<span> accept online payment </span>
				</div>
			</div>
		</div>
	);
}
