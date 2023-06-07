import type { FC } from 'react';
import type { NodeInputProps } from '../types';

import { getNodeLabel } from '@ory/integrations/ui';
import { Button } from '@/components/controls';

const NodeInputSubmit: FC<NodeInputProps> = ({
	node,
	attributes,
	setValue,
	disabled,
	dispatchSubmit,
}) => {
	return (
		<Button
			name={attributes.name}
			onClick={(e: any) => {
				// On click, we set this value, and once set, dispatch the submission!
				setValue(attributes.value).then(() => dispatchSubmit(e));
			}}
			value={attributes.value || ''}
			disabled={attributes.disabled || disabled}
			extraClassName={'mt-8 px-8 py-3 w-fit'}
		>
			{getNodeLabel(node)}
		</Button>
	);
};

export default NodeInputSubmit;
