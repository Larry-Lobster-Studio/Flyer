import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	withCredentials: true,
});

AXIOS_INSTANCE.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return error;
	}
);

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
	config: AxiosRequestConfig,
	options?: AxiosRequestConfig
): Promise<T> => {
	const source = Axios.CancelToken.source();
	const promise = AXIOS_INSTANCE({
		...config,
		...options,
		cancelToken: source.token,
	}).then(({ data }) => data);

	// @ts-ignore
	promise.cancel = () => {
		source.cancel('Query was cancelled');
	};

	return promise;
};

export default customInstance;

export interface ErrorType<Error> extends AxiosError<Error> {}
