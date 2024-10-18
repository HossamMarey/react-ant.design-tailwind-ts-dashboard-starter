
import { useTranslation } from "react-i18next"

const Single = ({ values }: { values: [string, boolean] }) => {
    const { t } = useTranslation()
    return (
        <div className='flex items-center gap-3'>
            <span className='bg-[#EAF0FE] text-primary text-sm font-normal py-1.5 px-3 rounded-lg'>{values[1] && t('builtin')}</span>
            <span className='text-text text-base font-normal'>{values[0]}</span>
        </div>
    )
}

const UserGroups = ({ data }: { data?: any }) => {
    const { t } = useTranslation()
    return (
        <div className='card p-3 !border-0 flex flex-col gap-2.5'>
            <div>
                <h4 className='text-xl font-normal text-text-dark'>{t('myUserGroups')}</h4>
            </div>
            <div className='flex flex-col gap-2.5'>
                {/** @ts-expect-error types */}
                {data?.user_groups?.map((ug, i) => <Single key={ug[0] + i} values={ug} />)}


            </div>
        </div>
    )
}

export default UserGroups