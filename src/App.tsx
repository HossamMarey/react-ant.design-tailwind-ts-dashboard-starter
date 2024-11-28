import { useEffect } from "react"
import { useLanguage } from "@/services/hooks"
import { clientApi } from "@/services/api"
import AppRouter from "./AppRouter"


function App() {

  const { getLangFromLocalStorage, changeLanguage, setLangToLocalStorage } = useLanguage()

  useEffect(() => {
    const currentLang = getLangFromLocalStorage()
    changeLanguage(currentLang)
    setLangToLocalStorage(currentLang)
    clientApi.defaults.headers.common['Accept-Language'] = currentLang
  }, [])

  return <AppRouter />

}

export default App
