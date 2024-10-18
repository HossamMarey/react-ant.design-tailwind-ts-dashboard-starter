
import { ReactNode, createContext, useState, useEffect, useRef, useContext, useMemo } from "react";
import { useIsScreen } from "../hooks";
import { useDarkMode } from "./DarkModeProvider";
import { ANTD_THEME, ANTD_THEME_DARK, MAIN_COLORS } from "./constants";
import { ThemeConfig } from "antd";
import { AliasToken } from "antd/lib/theme/interface";
import { convertColorFromHexToHsl } from "../utils";



interface ColorsContextType {
  AntTheme: ThemeConfig,
  computedColors: {
    light: {
      [key: string]: string;
    };
    dark: {
      [key: string]: string;
    };
  },
  handleChangeColor: ({ key, value, mode }: {
    key: string;
    value: string;
    mode: "light" | "dark";
  }) => void,
  handleResetColors: () => void
}

export const ColorsContext = createContext<ColorsContextType>({
  AntTheme: {},
  computedColors: { light: {}, dark: {} },
  handleChangeColor: () => { },
  handleResetColors: () => { }
})


const getLocalColorVal = ({ key, mode }: { key: string, mode: 'light' | 'dark' }) => {
  const localValue = localStorage.getItem(`${mode}-${key}`)
  if (!localValue) return ''
  if (!localValue?.includes('#')) return ''
  return localValue
}

const setLocalColorVal = ({ key, value, mode }: { key: string, value: string, mode: 'light' | 'dark' }) => {
  localStorage.setItem(`${mode}-${key}`, value)
}


export const ColorsProvider = ({ children, defaultDark }: { children: ReactNode, defaultDark?: boolean }) => {


  const { isDark } = useDarkMode()
  const [updateCounter, setUpdateCounter] = useState(0)

  const computedColors = useMemo(() => {

    const light: { [key: string]: string } = { ...MAIN_COLORS.light }
    const dark: { [key: string]: string } = { ...MAIN_COLORS.dark }

    Object.entries(light).forEach(([key, value]) => {
      const currentValue = getLocalColorVal({ key, mode: 'light' }) || value
      light[key] = currentValue
    })
    Object.entries(dark).forEach(([key, value]) => {
      const currentValue = getLocalColorVal({ key, mode: 'dark' }) || value
      dark[key] = currentValue
    })


    return {
      light,
      dark
    }

  }, [updateCounter])

  const AntTheme = useMemo(() => {

    if (typeof window === 'undefined') return {}
    const activeTheme = (isDark || !!defaultDark) ? ANTD_THEME_DARK : ANTD_THEME

    const activeToken: ThemeConfig['token'] = activeTheme.token || {}
    const localActiveToken: ThemeConfig['token'] = {}
    const activeColors = (isDark || !!defaultDark) ? computedColors.dark : computedColors.light

    activeToken.colorPrimary = activeColors.primary
    activeToken.colorBgBase = activeColors.background
    activeToken.colorTextBase = activeColors.text + 'b6'
    activeToken.colorBorder = activeColors.border



    Object.entries(activeToken).forEach(([key, value]) => {

      const currentValue = getLocalColorVal({ key, mode: isDark ? 'dark' : 'light' })
      let formattedValue
      if (currentValue) {
        if (typeof value === 'number') {
          formattedValue = Number(currentValue)
        } else if (typeof value === 'boolean') {
          formattedValue = currentValue?.toLowerCase() === 'true'
        } else {
          formattedValue = currentValue
        }
      }
      const val = formattedValue || value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      localActiveToken[key as keyof AliasToken] = val

    })

    return { ...activeTheme, token: localActiveToken }


  }, [isDark, defaultDark, updateCounter])



  const handleChangeColor = ({ key, value, mode }: { key: string, value: string, mode: 'light' | 'dark' }) => {


    setLocalColorVal({ key, value, mode })
    setUpdateCounter(c => c + 1)
  }

  const handleResetColors = () => {


    const light: { [key: string]: string } = { ...MAIN_COLORS.light }
    const dark: { [key: string]: string } = { ...MAIN_COLORS.dark }

    Object.entries(light).forEach(([key, value]) => {
      setLocalColorVal({ key, value, mode: 'light' })
    })
    Object.entries(dark).forEach(([key, value]) => {
      setLocalColorVal({ key, value, mode: 'dark' })
    })
    setUpdateCounter(c => c + 1)
    console.log('reset colors', MAIN_COLORS)
  }

  // add css vars to root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.querySelector('html')
      const mainColors = isDark ? { ...computedColors.dark } : { ...computedColors.light }
      if (root) {
        Object.entries(mainColors).forEach(([key, value]) => {
          const hsl = convertColorFromHexToHsl(value as string)
          root.style.setProperty(`--color-${key}`, hsl)
        })
      }
    }
  }, [isDark, updateCounter, computedColors])




  return <ColorsContext.Provider value={{
    AntTheme,
    computedColors,
    handleChangeColor,
    handleResetColors
  }}>
    {children}
  </ColorsContext.Provider>
}



export const useColorsContext = () => useContext(ColorsContext)