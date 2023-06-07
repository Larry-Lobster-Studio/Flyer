import type { FormValues } from '../../types/types';

import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface Props {}

export default function CopyBillingButton({}: Props) {
	const { getValues, setValue } = useFormContext<FormValues>();
	function copyValues() {
		setValue('shipping_address', getValues('billing_address'));
	}

	return (
		<button
			type='button'
			onClick={copyValues}
			className={clsx(
				'flex items-center gap-x-2 px-3 py-2 text-sm rounded-lg border border-flyer-gray bg-flyer-white text-flyer-gray',
				'hover:bg-flyer-gray hover:text-flyer-white'
			)}
		>
			<span>copy billing address</span>
		</button>
	);
}
