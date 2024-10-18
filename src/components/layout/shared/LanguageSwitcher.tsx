import { Dropdown, MenuProps } from "antd"
import { useMemo } from 'react'

import { LanguageSquare, ArrowLeft2, ArrowRight2 } from "iconsax-react"

import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/services/i18n";
import { useInitLanguage } from "@/services/hooks";
import clientApi from "@/services/api/clientApi";
import ReactCountryFlag from "react-country-flag"


const CFlag = ({ code, size = 16 }: { code: string, size?: number }) => <span className="flex items-center justify-center"
  style={{
    fontSize: size + 'px',
  }}
>
  <ReactCountryFlag countryCode={code} svg />
</span>

const LanguageSwitcher = ({ isShort = false }) => {

  const { changeLanguage, language, setLangToLocalStorage } = useInitLanguage()
  const { t } = useTranslation();


  const menuProps: MenuProps = useMemo(() => {
    const items = LANGUAGES.map(lang => (
      {
        key: lang.key,
        label: (<div className="flex items-center gap-1 p-0.5"> <CFlag code={lang.countryCode} size={22} /> {lang.label}  ({t(lang.name)})  </div>),
        className: '!p-1'


      }
    ))

    return {

      items,
      onClick: (e) => {
        changeLanguage(e.key)
        setLangToLocalStorage(e.key)
        clientApi.defaults.headers.common['Accept-Language'] = e.key
      },
    }
  }, [changeLanguage, t])


  const activeLang = useMemo(() => {
    const lng = LANGUAGES.find(l => l.key === language)
    return lng
  }, [language])
  const langTitle = useMemo(() => {

    if (!activeLang) return 'Choose Language'

    if (isShort) return ''
    return `${activeLang.label} (${t(activeLang.name)})`
  }, [language, t])

  return (
    <div>
      <Dropdown
        menu={menuProps}
        className="!border-border w-full cursor-pointer transition-all duration-300 hover:opacity-80 "

      >
        <div className="!h-auto   !rounded-lg   bg-transparent flex items-center gap-2 !py-2 !px-3 !text-base capitalize justify-between ">
          <div className="flex items-center gap-2">
            {activeLang ? <CFlag code={activeLang.countryCode} size={22} /> : <LanguageSquare size={22} />}

            {langTitle}
          </div>
          {!isShort && (
            <>
              <ArrowRight2 size={14} className="rtl:hidden ltr:inline-block" />
              <ArrowLeft2 size={14} className="ltr:hidden rtl:inline-block" />
            </>
          )}
        </div>
      </Dropdown>
    </div>
  )
}

export default LanguageSwitcher