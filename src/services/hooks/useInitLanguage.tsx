import React, { useEffect } from 'react'
import { DEFAULT_LOCALE } from "../i18n"
import { useTranslation } from "react-i18next"
import clientApi from "../api/clientApi"

const LANGUAGE_MODE = '_LANG_MODE'

const getLangFromLocalStorage = () => {
  return localStorage.getItem(LANGUAGE_MODE) || DEFAULT_LOCALE
}


const setLangToLocalStorage = (lang: string) => {
  localStorage.setItem(LANGUAGE_MODE, lang)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.body.setAttribute('dir', dir)
}


const useInitLanguage = () => {
  const { i18n: { language, changeLanguage } } = useTranslation()

  useEffect(() => {

    if (language) {
      clientApi.defaults.headers.common['Accept-Language'] = language
    }

  }, [language])

  return { getLangFromLocalStorage, setLangToLocalStorage, language, changeLanguage }
}

export default useInitLanguage
