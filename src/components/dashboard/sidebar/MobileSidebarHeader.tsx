
import { MainLogo } from "@/components/layout"
import { useSidebarContext } from "@/services/context/SidebarContext"
import { Button } from "antd"
import { useContext } from 'react'
import { FiX } from "react-icons/fi"

const MobileSidebarHeader = () => {

  const { toggleSidebar, isOpen } = useSidebarContext()

  return (
    <div className=" flex md:hidden items-center justify-between gap-4 p-4 border-b border-border-sidebar ">
      <MainLogo size={40} />
      <Button
        className="flex items-center justify-center !px-1 h-auto"
        type="text"

        onClick={() => toggleSidebar(!isOpen)}
      >
        <div className="flex items-center justify-center">
          <FiX />
        </div>
      </Button>
    </div>
  )
}

export default MobileSidebarHeader