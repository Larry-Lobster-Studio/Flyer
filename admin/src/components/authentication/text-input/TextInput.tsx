import type { FC, InputHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import { TextInput as DefTextInput } from '@/components/input';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	subtitle?: ReactNode;
	helper?: ReactNode;
	help?: boolean;
	state?: 'success' | 'error' | 'disabled';
}

const TextInput: FC<Props> = ({
	className,
	title,
	subtitle,
	disabled,
	type = 'text',
	...props
}) => {
	let state = props.state;
	if (disabled) {
		state = 'disabled';
	}

	return (
		<div
			className={clsx(
				className,
				'flex flex-col justify-center gap-y-1 w-full grow shrink mb-3',
				'last:mb-0'
			)}
		>
			<DefTextInput
				label={title ?? ''}
				type={type}
				placeholder={`Enter you ${props.name}`}
				error={state === 'error' && subtitle}
				{...props}
			/>
		</div>
	);
};

export default TextInput;
