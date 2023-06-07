import type { FC } from 'react';
import type { NodeInputProps } from '../types';

const NodeInputHidden: FC<NodeInputProps> = ({ attributes }) => {
	return (
		<input
			type={attributes.type}
			name={attributes.name}
			value={attributes.value || 'true'}
		/>
	);
};

export default NodeInputHidden;
