
import { ReactNode, createContext, useState, useEffect, useContext } from "react";

interface DarkModeContextType {
  isDark: boolean;
  toggleMode: () => void;
  setDarkMode: (isDark: boolean) => void
}

export const DarkModeContext = createContext<DarkModeContextType>({
  isDark: true,
  toggleMode: () => { },
  setDarkMode: (isDark: boolean) => { }
})

const DARK_MODE = '_DARK_MODE'

const getModeFromLocalStorage = () => {
  const dmode = localStorage.getItem(DARK_MODE)
  const isDark = dmode === 'false' ? false : true
  return isDark
}

const setModeToLocalStorage = ({ isDark }: { isDark: boolean }) => {


  if (typeof window !== 'undefined') {
    localStorage.setItem(DARK_MODE, isDark ? 'true' : 'false')
    if (isDark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }
}


export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(true)

  useEffect(() => {
    const stt = getModeFromLocalStorage()
    setIsDark(stt)
    setModeToLocalStorage({ isDark: stt })
  }, [])

  const toggleMode = () => {
    setIsDark(!isDark)
    setModeToLocalStorage({ isDark: !isDark })
  }

  const setDarkMode = (isD: boolean) => {
    setIsDark(isD)
    setModeToLocalStorage({ isDark: isD })
  }

  return <DarkModeContext.Provider value={{
    isDark, toggleMode, setDarkMode
  }}>
    {children}
  </DarkModeContext.Provider>
}

export const useDarkMode = () => {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
}

