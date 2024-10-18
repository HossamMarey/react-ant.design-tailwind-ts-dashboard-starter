
import { ReactNode, createContext, useState, useEffect, useRef, useContext } from "react";
import { useIsScreen } from "../hooks";



interface SidebarContextType {
  isOpen: boolean;
  isCondensed: boolean;
  toggleSidebar: (t: boolean) => void;
  toggleCondensed: (t: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  isCondensed: false,
  toggleSidebar: () => { },
  toggleCondensed: () => { }
})


const getSidebarStateFromLocalStorage = () => {
  // ['isOpen', 'isCondensed'] : [0, 1]
  const sidebarState = localStorage.getItem('sidebarState')
  if (sidebarState) {
    return JSON.parse(sidebarState)
  }

}

const setSidebarStateToLocalStorage = ({ isOpen, isCondensed }: { isOpen: boolean, isCondensed: boolean }) => {
  if (typeof window !== 'undefined') {
    const state = [isOpen ? 1 : 0, isCondensed ? 1 : 0]
    localStorage.setItem('sidebarState', JSON.stringify(state))
  }
}


export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const isMount = useRef(false)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [isCondensed, setIsCondensed] = useState<boolean>(false)

  const { md, lg } = useIsScreen()

  useEffect(() => {
    if (isMount.current) {
      const stt = getSidebarStateFromLocalStorage()

      let is_open = true
      let is_condensed = false
      if (stt && stt.length === 2) {
        if (md) {
          is_open = true
          is_condensed = !!stt[1]
        } else {
          is_open = false
          is_condensed = false
        }


      } else {
        if (md) {
          is_open = true
          if (lg) {
            is_condensed = true
          } else {
            is_condensed = false
          }
        } else {
          is_open = false
          is_condensed = false
        }
        setSidebarStateToLocalStorage({ isOpen: is_open, isCondensed: is_condensed })
      }

      setIsOpen(is_open)
      setIsCondensed(is_condensed)

    } else {
      isMount.current = true
    }
  }, [isMount.current, md, lg])


  useEffect(() => {

    if (!md) {
      toggleSidebar(false)
    }
  }, [window.location.href])


  const toggleSidebar = (t: boolean) => {
    setIsOpen(t)
    setSidebarStateToLocalStorage({ isOpen: t, isCondensed: isCondensed })
  }

  const toggleCondensed = (t: boolean) => {

    setIsCondensed(t)
    setSidebarStateToLocalStorage({ isOpen: isOpen, isCondensed: t })
  }

  return <SidebarContext.Provider value={{
    isOpen,
    isCondensed,
    toggleSidebar,
    toggleCondensed
  }}>
    {children}
  </SidebarContext.Provider>
}



export const useSidebarContext = () => useContext(SidebarContext)