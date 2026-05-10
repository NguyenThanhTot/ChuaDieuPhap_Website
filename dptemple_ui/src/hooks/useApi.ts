import { useState, useCallback } from 'react'
import type { AxiosError } from 'axios'

interface State<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T, P = void>(apiFn: (params: P) => Promise<T>) {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (params: P) => {
      setState({ data: null, loading: true, error: null })
      try {
        const data = await apiFn(params)
        setState({ data, loading: false, error: null })
        return data
      } catch (err) {
        const e = err as AxiosError<{ message: string }>
        const message = e.response?.data?.message ?? 'Có lỗi xảy ra'
        setState({ data: null, loading: false, error: message })
        throw err
      }
    },
    [apiFn]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, execute, reset }
}
