import React, { useMemo } from 'react'
import { Link, LinkProps, useLocation } from "react-router-dom"

const ClientLink: React.FC<LinkProps> = ({ children, to, ...props }) => {

  const pathname = useLocation().pathname

  const nextTo = useMemo(() => {
    if (typeof to === 'string' && !to?.includes('next=')) {
      // 
      if (to?.includes('?')) {
        return to + '&next=' + pathname
      } else {
        return to + '?next=' + pathname
      }
    } else {
      return to
    }
  }, [to, pathname])
  return (
    <Link to={nextTo} {...props}>
      {children}
    </Link>
  )
}

export default ClientLink