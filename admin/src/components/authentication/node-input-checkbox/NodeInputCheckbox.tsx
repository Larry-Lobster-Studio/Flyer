import type { FC } from 'react';
import type { NodeInputProps } from '../types';

import { getNodeLabel } from '@ory/integrations/ui';
import { Checkbox } from '@ory/themes';

const NodeInputCheckbox: FC<NodeInputProps> = ({
	node,
	attributes,
	setValue,
	disabled,
}) => {
	return (
		<Checkbox
			name={attributes.name}
			defaultChecked={attributes.value === true}
			onChange={(e: any) => setValue(e.target.checked)}
			disabled={attributes.disabled || disabled}
			label={getNodeLabel(node)}
			state={
				node.messages.find(({ type }) => type === 'error') ? 'error' : undefined
			}
			subtitle={node.messages.map(({ text }) => text).join('\n')}
		/>
	);
};

export default NodeInputCheckbox;
