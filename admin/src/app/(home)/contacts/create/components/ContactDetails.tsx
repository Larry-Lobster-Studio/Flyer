import type { FormValues } from '../types/types';

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@/components/input';

interface Props {
	isLoading: boolean;
}

export default function ContactDetails({ isLoading }: Props) {
	const { register } = useFormContext<FormValues>();

	return (
		<div className={clsx('mt-6')}>
			<div className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}>
				<TextInput
					label='name'
					type='text'
					placeholder='name'
					disabled={isLoading}
					{...register('name')}
				/>

				<TextInput
					label='vat'
					type='text'
					placeholder='vat'
					disabled={isLoading}
					{...register('vat')}
				/>
			</div>
			<div className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}>
				<TextInput
					label='email'
					type='email'
					disabled={isLoading}
					{...register('email')}
				/>

				<TextInput
					label='phone'
					type='tel'
					disabled={isLoading}
					{...register('phone')}
				/>
			</div>
		</div>
	);
}
