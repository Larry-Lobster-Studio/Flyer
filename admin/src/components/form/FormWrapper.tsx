import type { ReactNode } from 'react';

import clsx from 'clsx';

interface Props {
	title: string;
	children: ReactNode;
	rightSide?: ReactNode;
}

export default function FormWrapper({ title, children, rightSide }: Props) {
	return (
		<div className={clsx('mb-6 p-4 pb-6 bg-white rounded-lg shadow')}>
			<div className={clsx('flex items-stretch justify-between gap-x-12')}>
				<h3 className={clsx('font-semibold')}> {title} </h3>
				{rightSide}
			</div>

			{children}
		</div>
	);
}
