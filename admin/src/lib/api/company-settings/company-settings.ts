/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * Flyer Openapi
 * Flyer Openapi version
 * OpenAPI spec version: 1.0.0
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type {
  UpdateCompanySettings201,
  UpdateCompanySettings500,
  UpdateCompanySettingsBody,
  GetCompanySettings200,
  GetCompanySettings500,
} from ".././interfaces";
import { customInstance } from "../../orvalInstance";
import type { ErrorType } from "../../orvalInstance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

/**
 * update company settings
 */
export const updateCompanySettings = (
  updateCompanySettingsBody: UpdateCompanySettingsBody,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UpdateCompanySettings201>(
    {
      url: `/v1/company/settings`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: updateCompanySettingsBody,
    },
    options
  );
};

export const getUpdateCompanySettingsMutationOptions = <
  TError = ErrorType<UpdateCompanySettings500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateCompanySettings>>,
    TError,
    { data: UpdateCompanySettingsBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateCompanySettings>>,
  TError,
  { data: UpdateCompanySettingsBody },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateCompanySettings>>,
    { data: UpdateCompanySettingsBody }
  > = (props) => {
    const { data } = props ?? {};

    return updateCompanySettings(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdateCompanySettingsMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateCompanySettings>>
>;
export type UpdateCompanySettingsMutationBody = UpdateCompanySettingsBody;
export type UpdateCompanySettingsMutationError =
  ErrorType<UpdateCompanySettings500>;

export const useUpdateCompanySettings = <
  TError = ErrorType<UpdateCompanySettings500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateCompanySettings>>,
    TError,
    { data: UpdateCompanySettingsBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getUpdateCompanySettingsMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * get company settings
 */
export const getCompanySettings = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<GetCompanySettings200>(
    { url: `/v1/company/settings`, method: "get", signal },
    options
  );
};

export const getGetCompanySettingsQueryKey = () =>
  [`/v1/company/settings`] as const;

export const getGetCompanySettingsQueryOptions = <
  TData = Awaited<ReturnType<typeof getCompanySettings>>,
  TError = ErrorType<GetCompanySettings500>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getCompanySettings>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryOptions<
  Awaited<ReturnType<typeof getCompanySettings>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetCompanySettingsQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getCompanySettings>>
  > = ({ signal }) => getCompanySettings(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type GetCompanySettingsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getCompanySettings>>
>;
export type GetCompanySettingsQueryError = ErrorType<GetCompanySettings500>;

export const useGetCompanySettings = <
  TData = Awaited<ReturnType<typeof getCompanySettings>>,
  TError = ErrorType<GetCompanySettings500>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getCompanySettings>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetCompanySettingsQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
