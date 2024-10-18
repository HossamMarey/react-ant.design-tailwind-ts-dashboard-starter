
import {
  AddCircle,
} from 'iconsax-react'
import MenuLink from './MenuLink'
import { DASHBOARD_ROUTES } from '@/services/constants'
import { Button } from "antd"

import { useTranslation } from "react-i18next"
import { useSidebarContext } from "@/services/context/SidebarContext"
import ProfileDropdown from "@/components/layout/shared/ProfileDropdown"



const DashMenu = () => {

  const { isCondensed } = useSidebarContext()
  const { t } = useTranslation()

  return (
    <div className="h-full flex flex-col   overflow-y-auto ">

      <ul className="  flex-1 flex flex-col gap-2">

        {DASHBOARD_ROUTES.map((r, ix) => (
          <MenuLink
            key={ix}
            title={t(r.label)}
            routeKey={'dashboard-' + r.key}
            to={'/dashboard' + r.path}
            icon={r.icon}
            extraText={r.tag}
            isCondensed={isCondensed}
            show={r.inMenu}
            subLinks={r.subRoutes ? r.subRoutes.map((l) => ({
              title: t(l.label),
              to: '/dashboard' + r.path + l.path,
              icon: l.icon,
              show: l.inMenu,
            })) : []}
          />
        ))}


      </ul>

      <div className="p-4 border-t border-border flex flex-col gap-3">


        <Button type="primary" block  >
          <div className="flex items-center gap-2 justify-center">
            <AddCircle />
            {!isCondensed && (
              <>
                {t('addProject')}
              </>
            )}
          </div>
        </Button>

        <ProfileDropdown iconOnly={isCondensed} />

      </div>

    </div>
  )
}

export default DashMenu
