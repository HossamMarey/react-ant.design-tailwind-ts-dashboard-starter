import React, { useMemo } from 'react'
import { useSetSingleSearchParam } from "./ui"
import { useNavigate } from "react-router-dom"

export const useNavigateNext = () => {

  const [searchParams] = useSetSingleSearchParam()
  const navigate = useNavigate()

  const nextUrl = useMemo(() => searchParams.get('next'), [searchParams])

  const navigateNext = (to?: string) => {

    if (nextUrl) {
      navigate(nextUrl, { replace: true })
      return
    } else if (to) {
      navigate(to, { replace: true })
      return
    } else {
      navigate(-1)
    }
  }

  return { navigateNext, nextUrl }
}
