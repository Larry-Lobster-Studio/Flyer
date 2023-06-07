import type { FormValues } from '../../types/types';

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@/components/input';

interface Props {
	isLoading: boolean;
}

export default function ShippingAddress({ isLoading }: Props) {
	const { register } = useFormContext<FormValues>();

	return (
		<div className={clsx('mt-6')}>
			<div className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}>
				<TextInput
					label='name'
					type='text'
					placeholder='name'
					disabled={isLoading}
					{...register('shipping_address.name')}
				/>
			</div>
			<div className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}>
				<TextInput
					label='line 1'
					type='text'
					placeholder='name'
					disabled={isLoading}
					{...register('shipping_address.line_1')}
				/>

				<TextInput
					label='line 2'
					type='text'
					placeholder='name'
					disabled={isLoading}
					{...register('shipping_address.line_2')}
				/>
			</div>

			<div className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}>
				<TextInput
					label='Postal code'
					type='text'
					placeholder='name'
					disabled={isLoading}
					{...register('shipping_address.postal_code')}
				/>

				<TextInput
					label='city'
					type='text'
					placeholder='name'
					disabled={isLoading}
					{...register('shipping_address.city')}
				/>
			</div>

			<div className={clsx('flex flex-col gap-y-4 ', 'md:flex-row md:gap-x-4')}>
				<TextInput
					label='state'
					type='text'
					placeholder='name'
					disabled={isLoading}
					{...register('shipping_address.state')}
				/>

				<TextInput
					label='country'
					type='text'
					placeholder='name'
					disabled={isLoading}
					{...register('shipping_address.country')}
				/>
			</div>
		</div>
	);
}
