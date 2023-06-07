'use client';

import type { TextareaHTMLAttributes } from 'react';

import { forwardRef } from 'react';
import clsx from 'clsx';

import { InputWrapper } from '../input-wrapper';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string;
	label: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	let { error, label, ...rest } = props;

	return (
		<InputWrapper
			error={error}
			label={label}
			name={rest.name}
			required={rest.required}
		>
			<textarea
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

Textarea.displayName = 'Textarea';
export default Textarea;
