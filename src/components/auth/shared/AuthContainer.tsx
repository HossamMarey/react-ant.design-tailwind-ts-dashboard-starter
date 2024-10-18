import { ReactNode } from 'react'
import AuthInfo from "./AuthInfo"
import { Button } from "antd"
import { DarkModeSwitcher, LanguageSwitcher, MainLogo } from "@/components/layout"



const AuthContainer = ({ children, maxWidth = '64rem' }: { children: ReactNode, maxWidth?: string }) => {
  return (

    <div className="min-h-screen flex flex-col gap-2  ">
      {/* <header className="px-4 md:px-10 lg:px-14 xl:px-16 py-4 md:py-7 lg:py-11 xl:py-12">
        <div className="w-full flex items-center justify-between">
          <MainLogo isHome />
        </div>

      </header> */}
      <main className="flex-1 flex items-center relative  bg-bg/10 ">

        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-screen">



          <div className="p-5 md:p-6 lg:p-7 xl:p-8 flex items-center justify-center h-full  ">

            <div className={` mx-auto w-full ${maxWidth === '64rem' ? 'max-w-md' : ''}`}>

              <div className="mt-8">
                <MainLogo isHome size={48} />
                {children}
              </div>
            </div>
          </div>



          <AuthInfo />


        </div>

        <div className="absolute top-4  end-4 !text-sm scale-75 flex items-center"
        >
          <Button type="text" className="  !px-0" size="small"  >
            <LanguageSwitcher isShort />
          </Button>
          <DarkModeSwitcher size="small" />
        </div>
      </main>
      {/* <footer>
        <p className="text-center py-8 md:py-10 lg:py-12 xl:py-14 opacity-80">
          Buguard @{new Date().getFullYear()}
        </p>
      </footer> */}
    </div>

  )
}

export default AuthContainer