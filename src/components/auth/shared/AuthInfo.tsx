
import loginImage from '@/assets/images/auth/slider-1.png'

import { Image } from "antd"
import { useTranslation } from "react-i18next"


const AuthInfo = () => {
  const { t } = useTranslation()
  return (
    <div className="auth-gradient p-5 md:p-6 lg:p-7 xl:p-8  items-center justify-center h-full border-e border-border hidden lg:flex  relative">
      <div className="max-w-md mx-auto w-full">

        <div className="w-full   rounded-lg overflow-hidden mt-8">
          <Image src={loginImage} alt="login image" className="!object-contain  !w-full !h-full" preview={false} />
        </div>
        <div className="text-center mt-10 md:mt-11 lg:mt-12 ">

          <h2 className=" "> {t('thisIsWebsiteName')} </h2>
          <p className="  mt-5 lg:mt-6">
            {t('yourStreamlined')}
            {' '}
            <strong>
              {t('oneStopShop')}
            </strong>
            {' '}
            {t('forComplianceRiskManagement')}
          </p>
        </div>
      </div>


    </div>

  )
}

export default AuthInfo