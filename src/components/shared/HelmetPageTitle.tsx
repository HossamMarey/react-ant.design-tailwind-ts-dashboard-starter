import { useLanguage } from "@/services/hooks"
import React from 'react'
import { Helmet } from "react-helmet"


const PageTitle = ({ titleStr, extraStr }: { titleStr?: string, extraStr?: string }) => {
  const { t } = useLanguage()
  return (
    <Helmet>
      <title>  {titleStr ? t(titleStr) + ' | ' : ''} {extraStr ? t(extraStr) + ' | ' : ''} {t('siteName')}  </title>
    </Helmet>
  )
}



const HelmetPageTitle = ({ children, title = '', subTitle = '' }: {
  children?: React.ReactNode
  title?: string
  subTitle?: string
}) => {

  return <>
    <PageTitle titleStr={!subTitle ? title : subTitle} extraStr={subTitle ? title : ''} />
    {children || ''}
  </>
}


export default HelmetPageTitle