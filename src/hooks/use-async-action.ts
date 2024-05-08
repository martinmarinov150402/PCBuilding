import { useCallback, useEffect, useRef, useState } from 'react'

interface AsyncState<Result> {
  data: Result | undefined
  loading: boolean
  error: unknown | undefined
  aborted: boolean | undefined
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AsyncResult<Args extends any[], Result>
  extends AsyncState<Result> {
  ref: { current: AsyncState<Result> }
  trigger: (...args: Args) => void
  perform: (...args: Args) => Promise<Result>
  resetError: () => void
  abort: () => void
}

export interface UseAsyncActionOptions<Result> {
  /**
   * Whether to keep the data field populated while loading
   */
  retainDataDuringLoad?: boolean

  /**
   * Initial state
   */
  initialState?: Partial<AsyncState<Result>>
}

export interface ActionMeta<Result> {
  abortController: AbortController
  abortSignal: AbortSignal

  previousState: AsyncState<Result>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsyncAction<Args extends any[], T>(
  action: (meta: ActionMeta<T>, ...args: Args) => Promise<T>,
  {
    retainDataDuringLoad = true,
    initialState = {},
  }: UseAsyncActionOptions<T> = {},
): AsyncResult<Args, T> {
  const [state, setState] = useState<AsyncState<T>>(() => ({
    data: undefined,
    loading: false,
    error: undefined,
    aborted: undefined,
    ...initialState,
  }))

  // We keep the state in a ref as well because we want to be able to access the most recent
  // one independently of the render cycles. For example, when doing frequent checks on
  // `loading` in a scroll handler, if we rely on `useState`, then we can trigger multiple
  // loads at the same time.
  // Plus, we can refer to the state in the `perform` callback without needing to add the state
  // to the dependencies (which would make the function reference non-stable).
  const stateRef = useRef(state)

  const requestIdRef = useRef(0)

  const ref = useRef({ action, retainDataDuringLoad })
  ref.current = { action, retainDataDuringLoad }

  const abortRef = useRef<AbortController | undefined>(undefined)

  const perform = useCallback(async (...args: Args) => {
    requestIdRef.current += 1
    const myRequestId = requestIdRef.current

    if (abortRef.current) {
      abortRef.current.abort()
    }

    abortRef.current = new AbortController()

    const previousState = stateRef.current

    stateRef.current = {
      data: ref.current.retainDataDuringLoad ? previousState.data : undefined,
      loading: true,
      error: undefined,
      aborted: undefined,
    }
    setState(stateRef.current)

    try {
      const result = await ref.current.action(
        {
          abortController: abortRef.current,
          abortSignal: abortRef.current.signal,

          previousState,
        },
        ...args,
      )

      if (requestIdRef.current === myRequestId) {
        stateRef.current = {
          data: result,
          loading: false,
          error: undefined,
          aborted: false,
        }
        setState(stateRef.current)
      }

      return result
    } catch (error) {
      if (requestIdRef.current === myRequestId) {
        const isAbort = (error as { name: string }).name === 'AbortError'

        stateRef.current = {
          data: undefined,
          loading: false,
          error: isAbort ? undefined : error,
          aborted: isAbort,
        }
        setState(stateRef.current)
      }

      // eslint-disable-next-line no-console
      console.error('useAsyncAction', error)

      throw error
    }
  }, [])

  const trigger = useCallback(
    (...args: Args) => {
      perform(...args).catch(() => {
        // Intentionally ignored
      })
    },
    [perform],
  )

  const resetError = useCallback(() => {
    setState(oldState => ({
      data: oldState.data,
      loading: oldState.loading,
      error: undefined,
      aborted: oldState.aborted,
    }))
  }, [])

  const abort = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
    }
  }, [])

  useEffect(() => {
    return () => {
      requestIdRef.current += 1
      abort()
    }
  }, [abort])

  return {
    ...state,
    ref: stateRef,
    trigger,
    perform,
    resetError,
    abort,
  }
}
