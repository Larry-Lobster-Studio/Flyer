'use client';

import type { InputHTMLAttributes } from 'react';

import { forwardRef } from 'react';
import clsx from 'clsx';

import { InputWrapper } from '../input-wrapper';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	error?: React.ReactNode;
	label: string;
}

const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
	let { error, label, ...rest } = props;

	return (
		<InputWrapper
			error={error}
			label={label}
			name={rest.name}
			required={rest.required}
		>
			<input
				ref={ref}
				className={clsx(
					'block w-full px-3 py-2 text-sm rounded-lg border border-lg border-flyer-gray/30 bg-white',
					'focus:outline-none focus:border-flyer-gray focus:ring-flyer-graborder-flyer-gray',
					error &&
						'outline-none border-rose-600 focus:ring-rose-500 focus:border-rose-600'
				)}
				{...rest}
			/>
		</InputWrapper>
	);
});

TextInput.displayName = 'TextInput';
export default TextInput;
