
import React, { useContext, useEffect } from 'react'


import { useLocation } from "react-router-dom"
import { useIsScreen } from "@/services/hooks"
import { useSidebarContext } from "@/services/context/SidebarContext"
import { useDarkMode } from "@/services/theme"
import { Button, Drawer } from "antd"
import { FiChevronsLeft, FiChevronsRight, FiMenu } from "react-icons/fi"
import MainLogo from "./shared/MainLogo"
import DarkModeSwitcher from "./shared/DarkModeSwitcher"
import ProfileDropdown from "./shared/ProfileDropdown"

const MainHeader = ({
  children,
  rightSide,
  Menu,
  noSideBar
}: {
  children?: React.ReactNode
  rightSide?: React.ReactNode
  Menu: React.ReactNode
  noSideBar?: boolean
}) => {

  const pathname = useLocation().pathname
  const { md } = useIsScreen()

  const { toggleSidebar, isCondensed, toggleCondensed } = useSidebarContext()

  useEffect(() => {

    if (!md) {
      toggleSidebar(false)
    }
  }, [pathname])


  // return null

  return (
    <>

      <div className="flex items-center justify-between gap-4 container-fluid  py-4 md:py-5 lg:py-6 border-b border-border ">
        {!noSideBar ? (

          <div className="flex items-center gap-3">
            <div className="md:hidden flex items-center gap-3">
              <Button
                className="flex items-center justify-center !px-2 h-auto"
                type="text"
                onClick={() => toggleSidebar(true)}
              >
                <FiMenu size={26} />
              </Button>
              {/* <MainLogo /> */}
            </div>

            <div className="hidden md:flex items-center gap-3">


            </div>

          </div>
        ) : (
          <MainLogo isLight={true} isCondensed={isCondensed} />
        )}


        {children}
        <div className="flex items-center gap-3">
          {rightSide}
          <DarkModeSwitcher />
          <ProfileDropdown />
        </div>

      </div>


    </>
  )
}

export default MainHeader