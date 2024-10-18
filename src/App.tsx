import { useEffect } from "react"
import { useInitLanguage } from "@/services/hooks"
import { clientApi } from "@/services/api"
import AppRouter from "./AppRouter"


function App() {

  const { getLangFromLocalStorage, changeLanguage, setLangToLocalStorage } = useInitLanguage()

  useEffect(() => {
    const currentLang = getLangFromLocalStorage()
    changeLanguage(currentLang)
    setLangToLocalStorage(currentLang)
    clientApi.defaults.headers.common['Accept-Language'] = currentLang
  }, [])

  return <AppRouter />

}

export default App
