import { useNavigateNext } from "@/services/hooks"
import { ArrowSquareLeft } from "iconsax-react"
import React from 'react'

const GoBackButton = () => {
  const { navigateNext, nextUrl } = useNavigateNext()

  if (!nextUrl) return null
  return (
    <div className="flex items-center cursor-pointer"
      onClick={() => navigateNext()}
    >
      <ArrowSquareLeft variant="Bulk" className="rtl:rotate-180" />
    </div>
  )
}

export default GoBackButton