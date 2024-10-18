
import { DashMenu, MenuSideBar } from "@/components/dashboard/sidebar"
import { DashboardHeader, DashMiniHeader, MainLogo } from "@/components/layout"
import { ErrorBoundary } from "@/components/shared"
import ThemeChanger from "@/components/shared/ThemeChanger"
import { useSidebarContext } from "@/services/context/SidebarContext"
import { Drawer } from "antd"
import { ArrowSquareLeft, ArrowSquareRight, CloseSquare, HambergerMenu } from "iconsax-react"
import { useEffect, useState, useRef } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"


const DashLayout = ({ redirect }: { redirect?: string }) => {

  const headerRef = useRef<HTMLDivElement>(null)

  const { isCondensed, toggleCondensed, toggleSidebar, isOpen } = useSidebarContext()

  if (redirect) return <Navigate to={redirect} />

  return (

    <div className="w-screen  ">


      <main className=" max-w-[100vw]  h-screen  flex  flex-col md:flex-row "

      >
        <aside className=" md:h-screen  p-3    "  >
          <div className="bg-card  rounded-lg shadow-sm max-h-full h-full flex flex-col ">

            <div ref={headerRef} className={`p-5 lg:p-6 md:mb-2 lg:mb-3 flex items-center justify-between ${isCondensed ? 'gap-1' : 'gap-9 lg:gap-10 xl:gap-11'}`}

            >
              <MainLogo isLight size={48} isCondensed={isCondensed} />

              {/* /// md: screen */}
              <div className="hidden md:flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 hover:opacity-80 "
                onClick={() => {
                  toggleCondensed(!isCondensed)
                }}
              >
                {isCondensed ? (<>
                  <ArrowSquareRight size={24} variant="Bulk" className="ltr:inline-block rtl:hidden" />
                  <ArrowSquareLeft size={24} variant="Bulk" className="rtl:inline-block ltr:hidden" />
                </>) : (
                  <CloseSquare size={24} variant="Bulk" />
                )}
              </div>

              <div className="flex md:hidden items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 hover:opacity-80"
                onClick={() => toggleSidebar(true)}
              >
                <HambergerMenu size={24} />
              </div>



            </div>
            <div
              className="overflow-y-auto flex-1  hidden md:block"
              style={{
                // maxHeight: `calc(100vh - ${headerHeight}px)`,
                // height: `calc(100vh - ${headerHeight}px)`,
              }}
            >
              {/* <div className="h-screen"> sss </div>  */}
              <MenuSideBar   >
                <DashMenu />
              </MenuSideBar>
            </div>
          </div>
        </aside>
        <div className="flex-1 overflow-y-auto  relative z-[2] min-h-screen "
        >
          <ErrorBoundary  >

            <DashMiniHeader className="mt-3" />
            <Outlet />
          </ErrorBoundary>
        </div>
      </main >

      <Drawer
        open={isOpen}
        placement={'left'}
        closable={false}
        bodyStyle={{ padding: 0 }}
        onClose={() => toggleSidebar(false)}
        className="header-drawer "
        rootClassName="md:hidden  "
        contentWrapperStyle={{ maxWidth: "90vw" }}
      >
        <div className="h-screen overflow-y-auto  bg-bg-sidebar mb-side-menu pt-6  ">

          <MenuSideBar   >
            <DashMenu />
          </MenuSideBar>
        </div>
      </Drawer>
      <ThemeChanger />
    </div >

  )

}

export default DashLayout