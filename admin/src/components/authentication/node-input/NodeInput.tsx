import type { FC } from 'react';
import type { NodeInputProps } from '../types';

import {
	NodeInputButton,
	NodeInputHidden,
	NodeInputCheckbox,
	NodeInputSubmit,
	NodeInputDefault,
} from '..';

const NodeInput: FC<NodeInputProps> = (props) => {
	const { attributes } = props;

	switch (attributes.type) {
		case 'hidden':
			// Render a hidden input field
			return <NodeInputHidden {...props} />;
		case 'checkbox':
			// Render a checkbox. We have one hidden element which is the real value (true/false), and one
			// display element which is the toggle value (true)!
			return <NodeInputCheckbox {...props} />;
		case 'button':
			// Render a button
			return <NodeInputButton {...props} />;
		case 'submit':
			// Render the submit button
			return <NodeInputSubmit {...props} />;
	}

	// Render a generic text input field.
	return <NodeInputDefault {...props} />;
};

export default NodeInput;
