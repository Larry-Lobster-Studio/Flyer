import type { FormEvent } from 'react';
import type { UiNode, UiNodeInputAttributes } from '@ory/client';

type ValueSetter = (
	value: string | number | boolean | undefined
) => Promise<void>;

type FormDispatcher = (e: MouseEvent | FormEvent) => Promise<void>;

interface NodeInputProps {
	node: UiNode;
	attributes: UiNodeInputAttributes;
	value: any;
	disabled: boolean;
	dispatchSubmit: FormDispatcher;
	setValue: ValueSetter;
}

export type { ValueSetter, FormDispatcher, NodeInputProps };
