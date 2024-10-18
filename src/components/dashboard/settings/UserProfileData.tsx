
import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'

const UserProfileData = ({ data }: { data?: any }) => {
    const { t } = useTranslation()
    return (
        <div className='card p-3 !border-0 flex flex-col gap-2.5'>
            <div>
                <h4 className='text-xl font-normal text-text-dark'>{t('yourData')}</h4>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2.5'>
                <div className='flex flex-col gap-2.5'>
                    <h6 className='text-base font-normal text-text-dark'>{t('firstName')}</h6>
                    <p className='text-base font-normal text-text'>{data?.first_name || '-'}</p>
                </div>
                <div className='flex flex-col gap-2.5'>
                    <h6 className='text-base font-normal text-text-dark'>{t('lastName')}</h6>
                    <p className='text-base font-normal text-text'>{data?.last_name || '-'}</p>
                </div>
                <div className='flex flex-col gap-2.5'>
                    <h6 className='text-base font-normal text-text-dark'>{t('email')}</h6>
                    <p className='text-base font-normal text-text'>{data?.email || '-'}</p>
                </div>
                <div className='flex flex-col gap-2.5'>
                    <h6 className='text-base font-normal text-text-dark'>{t('dateJoined')}</h6>
                    <p className='text-base font-normal text-text'>{data?.date_joined ? dayjs(data?.date_joined).format('DD MMM, YYYY') : '-'}</p>
                </div>
            </div>
        </div>
    )
}

export default UserProfileData