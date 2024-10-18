import { useSetSingleSearchParam } from '@/services/hooks'
import { Tabs } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MainSso from './MainSso'
import { Key } from 'iconsax-react'

const MainSettings = () => {
    const { t } = useTranslation()
    const [searchParams, setSingleSearchParams] = useSetSingleSearchParam()
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'sso')

    const items = [{
        key: 'sso', label: <div className='flex items-center gap-1'>
            <Key
                size={22}
                variant="Bulk"
            />

            <span>{t('sso')}</span>
        </div>
    }]

    const onChange = (key: string) => {
        setActiveTab(key)
        setSingleSearchParams('tab', key)
    };
    return (
        <div className='card p-3'>

            <div className="">

                <Tabs
                    defaultActiveKey={activeTab}
                    onChange={onChange}
                    className="w-full analytics-tabs-container"
                    type="card"
                    items={items}
                />
            </div>
            <div>

                {activeTab === 'sso' && <MainSso />}

            </div>
        </div>
    )
}

export default MainSettings