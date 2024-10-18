

import { MenuSideBar } from "@/components/dashboard/sidebar";
import { MainLogo } from "@/components/layout";
import { ErrorBoundary } from "@/components/shared";
import { useSidebarContext } from "@/services/context/SidebarContext";

import { Drawer } from "antd";
import { ArrowLeft2, ArrowRight, ArrowRight3, ArrowSquareLeft, ArrowSquareRight, CloseSquare, HambergerMenu } from "iconsax-react";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"



interface Props {
  headerChildren?: React.ReactNode
  menuChildren?: React.ReactNode

}


const MainLayout: FC<Props> = ({ headerChildren, menuChildren }) => {

  const headerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setMounted] = useState(false)
  const pathname = useLocation().pathname


  const { isCondensed, toggleCondensed, toggleSidebar, isOpen } = useSidebarContext()

  useEffect(() => {
    setMounted(true)
  }, [])

  const headerHeight = useMemo(() => {
    if (!headerRef.current) return 0
    return Math.min(headerRef.current.clientHeight, 50)
  }, [headerRef.current, isMounted, pathname])


  return (
    <div className="w-screen  ">


      <main className=" max-w-[100vw]  h-screen  flex  flex-col md:flex-row "

      >
        <aside className=" md:h-screen  p-3 md:py-5 lg:py-6 2xl:py-7   "  >
          <div className="bg-bg-lighter rounded-lg shadow-sm max-h-full h-full flex flex-col ">

            <div ref={headerRef} className={`p-5 lg:p-6 md:mb-2 lg:mb-3 flex items-center justify-between ${isCondensed ? 'gap-1' : 'gap-9 lg:gap-10 xl:gap-11'}`}

            >
              <MainLogo isLight size={48} isCondensed={isCondensed} />

              {/* /// md: screen */}
              <div className="hidden md:flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 hover:opacity-80 "
                onClick={() => toggleCondensed(!isCondensed)}
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
                {menuChildren}
              </MenuSideBar>
            </div>
          </div>
        </aside>
        <div className="flex-1 overflow-y-auto  relative z-[2] min-h-screen "
        >
          <ErrorBoundary  >
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
            {menuChildren}
          </MenuSideBar>
        </div>
      </Drawer>

    </div >
  )
}

export default MainLayout