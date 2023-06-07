import type {
	LoginFlow,
	RegistrationFlow,
	RecoveryFlow,
	SettingsFlow,
	VerificationFlow,
	UpdateLoginFlowBody,
	UpdateRegistrationFlowBody,
	UpdateRecoveryFlowBody,
	UpdateSettingsFlowBody,
	UpdateVerificationFlowBody,
} from '@ory/client';

export type Values = Partial<
	| UpdateLoginFlowBody
	| UpdateRegistrationFlowBody
	| UpdateRecoveryFlowBody
	| UpdateSettingsFlowBody
	| UpdateVerificationFlowBody
>;

export type Methods =
	| 'oidc'
	| 'password'
	| 'profile'
	| 'totp'
	| 'webauthn'
	| 'link'
	| 'lookup_secret';

export type Props<T> = {
	// The flow
	flow?:
		| LoginFlow
		| RegistrationFlow
		| SettingsFlow
		| VerificationFlow
		| RecoveryFlow;
	// Only show certain nodes. We will always render the default nodes for CSRF tokens.
	only?: Methods;
	// Is triggered on submission
	onSubmit: (values: T) => Promise<void>;
	// Do not show the global messages. Useful when rendering them elsewhere.
	hideGlobalMessages?: boolean;
};

export type State<T> = {
	values: T;
	isLoading: boolean;
};
