import { DependencyList, useEffect } from 'react'
import {
  ActionMeta,
  UseAsyncActionOptions,
  useAsyncAction,
} from './use-async-action'

export function useAsync<T>(
  // The type inference doesn't seem to work properly when we have ActionMeta<T> here, even though
  // it works for useAsyncAction. :shrug: If you need this at some point - figure it out.
  fn: (meta: ActionMeta<unknown>) => Promise<T>,
  dependencies: DependencyList,
  options?: UseAsyncActionOptions<T>,
) {
  const { data, error, loading, trigger } = useAsyncAction(fn, {
    initialState: { loading: true },
    ...options,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(trigger, dependencies)

  return {
    data,
    error,
    loading,
    reload: trigger,
  }
}
