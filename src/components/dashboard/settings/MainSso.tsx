import { Checkbox, Empty, Skeleton } from 'antd'
import React, { useState } from 'react'
import SsoForm from './SsoForm'

import { ErrorMessage } from '@/components/shared'
import { useTranslation } from 'react-i18next'

const MainSso = () => {
    const [checked, setChecked] = useState(false)

    const { t } = useTranslation()


    // if(isLoading) return <Skeleton.Input active className='!w-full !h-[900px]'/>

    // if(error ) return <ErrorMessage error={error} refetch={refetch}/>

    // if(!data) return <Empty />

    return (
        <div className='flex flex-col gap-3'>
            <h3 className='text-base font-normal text-text'>{t('ssoSettingsDescription')}</h3>


            <div>
                <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className='text-text-dark text-base'

                >{t('enableSSO')}</Checkbox>
            </div>

            <div>
                <SsoForm data={"data"} checked={checked} />
            </div>
        </div>
    )
}

export default MainSso