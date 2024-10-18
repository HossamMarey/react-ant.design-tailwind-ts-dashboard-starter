

import { Skeleton } from "antd"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"


const LogoutPage = () => {
  const navigate = useNavigate()
  const mounted = useRef(false)
  // const handleLogout = useLogout()

  // useEffect(() => {
  //   if (!mounted.current) {
  //     handleLogout()
  //     mounted.current = true
  //   }
  // }, [])

  useEffect(() => {
    navigate('/')
  }, [])

  return <>
    <div className="h-[80vh] flex  items-center justify-center ">
      <div className="flex flex-col gap-4 items-center justify-center text-center max-w-md">
        <Skeleton active paragraph={false} />
        <Skeleton active paragraph={false} />
        <Skeleton active paragraph={false} />
        <Skeleton active paragraph={false} />
        <Skeleton active paragraph={false} />
      </div>

    </div>
  </>
}

export default LogoutPage