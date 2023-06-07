import type { FC } from 'react';
import type { NodeInputProps } from '../types';

import { TextInput } from '../text-input';

const NodeInputDefault: FC<NodeInputProps> = (props) => {
	const { node, attributes, value = '', setValue, disabled } = props;

	function onClick() {
		if (attributes.onclick) {
			const run = new Function(attributes.onclick);
			run();
		}
	}

	return (
		<TextInput
			title={node.meta.label?.text === 'ID' ? 'Email' : node.meta.label?.text}
			onClick={onClick}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			type={attributes.type}
			name={attributes.name}
			value={value}
			disabled={attributes.disabled || disabled}
			help={node.messages.length > 0}
			state={
				node.messages.find(({ type }) => type === 'error') ? 'error' : undefined
			}
			subtitle={
				<>
					{node.messages.map(({ text, id }, k) => (
						<span key={`${id}-${k}`} data-testid={`ui/message/${id}`}>
							{text}
						</span>
					))}
				</>
			}
		/>
	);
};

export default NodeInputDefault;
