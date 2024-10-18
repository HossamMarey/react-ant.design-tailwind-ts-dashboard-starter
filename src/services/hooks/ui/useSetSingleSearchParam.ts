
import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export const useSetSingleSearchParam = (): [
  URLSearchParams, (key: string, value: string) => void, (sparams: { key: string, value: string }[]) => void
] => {
  const navigate = useNavigate()
  const pathname = useLocation().pathname
  const [searchParams] = useSearchParams()


  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (!searchParams) return ''
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      if (value === '') params.delete(name)
      return params.toString()
    },
    [searchParams]
  )

  const setSingleSearchParam = useCallback(async (key: string, value: string) => {
    const queryString = await createQueryString(key, value)

    await navigate(pathname + '?' + queryString)
  },
    [createQueryString, pathname, navigate]
  );


  const setMultiSearchParams = useCallback((sparams: { key: string, value: string }[]) => {
    let queryString = ''
    if (searchParams) {
      const params = new URLSearchParams(searchParams)
      sparams.forEach(async ({ key, value }) => {
        params.set(key, value)
        if (value === '') params.delete(key)
      })
      queryString = '?' + params.toString()
    }

    navigate(pathname + queryString)
  },
    [pathname, navigate, searchParams]
  );

  return [searchParams, setSingleSearchParam, setMultiSearchParams];
};
