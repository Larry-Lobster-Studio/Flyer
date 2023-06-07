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
  CreateItem201,
  CreateItem500,
  CreateItemBody,
  ListItems200,
  ListItems500,
  ListItemsParams,
  UpdateItem201,
  UpdateItem500,
  UpdateItemBody,
  GetItem200,
  GetItem500,
  DeleteItem200,
  DeleteItem500,
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
 * create new item
 */
export const createItem = (
  createItemBody: CreateItemBody,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<CreateItem201>(
    {
      url: `/v1/items`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: createItemBody,
    },
    options
  );
};

export const getCreateItemMutationOptions = <
  TError = ErrorType<CreateItem500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createItem>>,
    TError,
    { data: CreateItemBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof createItem>>,
  TError,
  { data: CreateItemBody },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createItem>>,
    { data: CreateItemBody }
  > = (props) => {
    const { data } = props ?? {};

    return createItem(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateItemMutationResult = NonNullable<
  Awaited<ReturnType<typeof createItem>>
>;
export type CreateItemMutationBody = CreateItemBody;
export type CreateItemMutationError = ErrorType<CreateItem500>;

export const useCreateItem = <
  TError = ErrorType<CreateItem500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createItem>>,
    TError,
    { data: CreateItemBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getCreateItemMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * list all items
 */
export const listItems = (
  params?: ListItemsParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ListItems200>(
    { url: `/v1/items`, method: "get", params, signal },
    options
  );
};

export const getListItemsQueryKey = (params?: ListItemsParams) =>
  [`/v1/items`, ...(params ? [params] : [])] as const;

export const getListItemsQueryOptions = <
  TData = Awaited<ReturnType<typeof listItems>>,
  TError = ErrorType<ListItems500>
>(
  params?: ListItemsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof listItems>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryOptions<Awaited<ReturnType<typeof listItems>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getListItemsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof listItems>>> = ({
    signal,
  }) => listItems(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type ListItemsQueryResult = NonNullable<
  Awaited<ReturnType<typeof listItems>>
>;
export type ListItemsQueryError = ErrorType<ListItems500>;

export const useListItems = <
  TData = Awaited<ReturnType<typeof listItems>>,
  TError = ErrorType<ListItems500>
>(
  params?: ListItemsParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof listItems>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getListItemsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * update new item
 */
export const updateItem = (
  itemId: string,
  updateItemBody: UpdateItemBody,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<UpdateItem201>(
    {
      url: `/v1/items/${itemId}`,
      method: "put",
      headers: { "Content-Type": "application/json" },
      data: updateItemBody,
    },
    options
  );
};

export const getUpdateItemMutationOptions = <
  TError = ErrorType<UpdateItem500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateItem>>,
    TError,
    { itemId: string; data: UpdateItemBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateItem>>,
  TError,
  { itemId: string; data: UpdateItemBody },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateItem>>,
    { itemId: string; data: UpdateItemBody }
  > = (props) => {
    const { itemId, data } = props ?? {};

    return updateItem(itemId, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdateItemMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateItem>>
>;
export type UpdateItemMutationBody = UpdateItemBody;
export type UpdateItemMutationError = ErrorType<UpdateItem500>;

export const useUpdateItem = <
  TError = ErrorType<UpdateItem500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateItem>>,
    TError,
    { itemId: string; data: UpdateItemBody },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getUpdateItemMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * get item
 */
export const getItem = (
  itemId: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<GetItem200>(
    { url: `/v1/items/${itemId}`, method: "get", signal },
    options
  );
};

export const getGetItemQueryKey = (itemId: string) =>
  [`/v1/items/${itemId}`] as const;

export const getGetItemQueryOptions = <
  TData = Awaited<ReturnType<typeof getItem>>,
  TError = ErrorType<GetItem500>
>(
  itemId: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItem>>, TError, TData>;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryOptions<Awaited<ReturnType<typeof getItem>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetItemQueryKey(itemId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getItem>>> = ({
    signal,
  }) => getItem(itemId, requestOptions, signal);

  return { queryKey, queryFn, enabled: !!itemId, ...queryOptions };
};

export type GetItemQueryResult = NonNullable<
  Awaited<ReturnType<typeof getItem>>
>;
export type GetItemQueryError = ErrorType<GetItem500>;

export const useGetItem = <
  TData = Awaited<ReturnType<typeof getItem>>,
  TError = ErrorType<GetItem500>
>(
  itemId: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getItem>>, TError, TData>;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetItemQueryOptions(itemId, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * delete item
 */
export const deleteItem = (
  itemId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<DeleteItem200>(
    { url: `/v1/items/${itemId}`, method: "delete" },
    options
  );
};

export const getDeleteItemMutationOptions = <
  TError = ErrorType<DeleteItem500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteItem>>,
    TError,
    { itemId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteItem>>,
  TError,
  { itemId: string },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteItem>>,
    { itemId: string }
  > = (props) => {
    const { itemId } = props ?? {};

    return deleteItem(itemId, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteItemMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteItem>>
>;

export type DeleteItemMutationError = ErrorType<DeleteItem500>;

export const useDeleteItem = <
  TError = ErrorType<DeleteItem500>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteItem>>,
    TError,
    { itemId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getDeleteItemMutationOptions(options);

  return useMutation(mutationOptions);
};
