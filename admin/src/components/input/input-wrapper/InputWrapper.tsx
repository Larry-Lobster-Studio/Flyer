import { HTMLAttributes, type FC, type ReactNode, forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { Label } from '@/components/label';

export interface InputWrapperProps extends HTMLAttributes<HTMLDivElement> {
	name?: string;
	label: string;
	required?: boolean;
	children: ReactNode;
	messages?: {
		type: string;
		text: string;
	}[];
}

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(
	({ className, name, label, required, children, messages, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('grid items-center gap-1 w-full', className)}
				{...props}
			>
				<Label
					htmlFor={name}
					className={cn(
						'mb-1',
						required && "after:content-['*'] after:ml-0.5 after:text-rose-500"
					)}
				>
					{label}
				</Label>
				{children}

				<div className={cn('flex flex-col mt-1')}>
					{messages?.map(({ text, type }, index) => {
						return (
							<span
								key={index}
								className={cn(
									'text-sm text-muted-foreground',
									type === 'error' && 'text-red-600'
								)}
							>
								{text}
							</span>
						);
					})}
				</div>
			</div>
		);
	}
);
