import type { FC, FormEvent, MouseEvent } from 'react';
import type { NodeInputProps } from '../types';

import clsx from 'clsx';

import { getNodeLabel } from '@ory/integrations/ui';
import { Button } from '@/components/controls';

const NodeInputButton: FC<NodeInputProps> = ({
	node,
	attributes,
	setValue,
	disabled,
	dispatchSubmit,
}) => {
	function onClick(e: MouseEvent | FormEvent) {
		if (attributes.onclick) {
			e.stopPropagation();
			e.preventDefault();
			const run = new Function(attributes.onclick);
			run();
			return;
		}

		setValue(attributes.value).then(() => dispatchSubmit(e));
	}

	return (
		<Button
			name={attributes.name}
			onClick={(e) => {
				onClick(e);
			}}
			value={attributes.value || ''}
			disabled={attributes.disabled || disabled}
			variant='outline'
		>
			{getNodeLabel(node)}
		</Button>
	);
};

export default NodeInputButton;
