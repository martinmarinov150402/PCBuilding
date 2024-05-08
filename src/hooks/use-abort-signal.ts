import { useRef } from 'react'

export function useAbortSignal() {
  const abortControllerRef = useRef<AbortController>()

  return {
    new() {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      return abortControllerRef.current.signal
    },
  }
}
