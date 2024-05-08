import { debounce } from 'lodash-es'
import { useRef, useState } from 'react'

export function useDebounced<T>(fn: () => T, timeMs: number) {
  const fnRef = useRef(fn)
  fnRef.current = fn
  const [debouncedFn] = useState(() => debounce(() => fnRef.current(), timeMs))

  return debouncedFn
}
