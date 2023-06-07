import type { FC, ReactNode } from 'react';

import clsx from 'clsx';

interface Props {
	name?: string;
	label: string;
	required?: boolean;
	children: ReactNode;
	error?: ReactNode;
}

const InputWrapper: FC<Props> = ({
	name,
	label,
	required = false,
	children,
	error,
}) => {
	return (
		<div className={clsx('flex flex-col gap-y-2 w-full mb-4')}>
			<label
				htmlFor={name}
				className={clsx(
					'relative text-sm text-flyer-gray lowercase',
					required && "after:content-['*'] after:ml-0.5 after:text-rose-500"
				)}
			>
				{label}
			</label>

			{children}

			{error && (
				<span className='text-sm lowercase text-rose-600'>{error}</span>
			)}
		</div>
	);
};

export default InputWrapper;
