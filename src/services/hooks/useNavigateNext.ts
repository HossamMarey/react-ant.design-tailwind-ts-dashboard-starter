import React from 'react'
import { useSetSingleSearchParam } from "./ui"
import { useNavigate } from "react-router-dom"

export const useNavigateNext = () => {

  const [searchParams] = useSetSingleSearchParam()
  const navigate = useNavigate()

  const navigateNext = () => {
    const nextUrl = searchParams.get('next')
    if (nextUrl) {
      navigate(nextUrl, { replace: true })
      return
    }
  }

  return { navigateNext }
}
