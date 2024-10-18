

import { useSidebarContext } from "@/services/context/SidebarContext"
import React, { useContext } from 'react'

const MenuSideBar = ({ children }: {
  children?: React.ReactNode
}) => {

  const { isCondensed } = useSidebarContext()

  return (
    <div className=" flex flex-col h-full min-h-full ">
      {/* <div className="px-4 py-5">
        <MainLogo isCondensed={isCondensed} />
      </div> */}
      <div className=" flex-1" >
        {children}
      </div>
    </div>
  )
}

export default MenuSideBar