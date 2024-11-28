import React, { useEffect, useMemo } from 'react'
import { DEFAULT_LOCALE, LANGUAGES } from "../i18n"
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


const useLanguage = () => {
  const { t, i18n: { language, changeLanguage: i18nChangeLanguage } } = useTranslation()

  useEffect(() => {

    if (language) {
      clientApi.defaults.headers.common['Accept-Language'] = language
    }

  }, [language])


  const changeLanguage = (lang: string) => {
    clientApi.defaults.headers.common['Accept-Language'] = lang
    setLangToLocalStorage(lang)
    i18nChangeLanguage(lang)
  }


  const activeLangInfo = useMemo(() => {

    return LANGUAGES.find(lang => lang.key === language) || LANGUAGES[0]
  }, [language])


  return { getLangFromLocalStorage, setLangToLocalStorage, language, changeLanguage, t, activeLangInfo }
}

export default useLanguage
