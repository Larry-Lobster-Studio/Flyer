import type { ButtonHTMLAttributes } from 'react';

import clsx, { ClassValue } from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: 'solid' | 'outline' | 'ghost' | 'link';
	extraClassName?: ClassValue;
}

export default function Button({
	children,
	variant = 'solid',
	extraClassName,
	...attributes
}: Props) {
	return (
		<button
			className={clsx(
				'flex items-center gap-x-2 w-full px-3 py-2 text-sm rounded-lg',
				variant === 'solid' && [
					'bg-flyer-gray border border-flyer-gray text-white',
					'hover:bg-flyer-primary hover:border hover:border-flyer-primary hover:text-flyer-gray',
				],
				variant === 'outline' && [
					'border-flyer-gray bg-white text-flyer-gray',
					'hover:bg-flyer-gray hover:text-white',
				],
				extraClassName
			)}
			{...attributes}
		>
			{children}
		</button>
	);
}
