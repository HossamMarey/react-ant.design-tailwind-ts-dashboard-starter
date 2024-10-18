import { Button, Dropdown, MenuProps, Modal, Skeleton } from "antd"
import React, { useMemo, useState } from 'react'
import { FiHeadphones } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Setting, Logout, UserSquare, User } from "iconsax-react"
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const ProfileDropdown = ({ iconOnly = false, size = 20 }: { iconOnly?: boolean, size?: number }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation()


  const menuProps: MenuProps = useMemo(() => {


    const items = [
      {
        label: <Link to={`/dashboard/profile`} className="text-base">
          {t('myProfile')}
        </Link>,
        key: '1',
        icon: <Setting size={22} />,

      },
      {
        label: <LanguageSwitcher />,
        key: '2',
        className: "!p-0"
      },
      // {
      //   label: <div onClick={() => setVisible(true)}>About</div>,
      //   key: '3',
      //   icon: <Setting size={22} />,

      // },
      // {
      //   label: <Link to={`/dashboard/Settings`} className="text-base">Online Documentation</Link>,
      //   key: '4',
      //   icon: <Setting size={22} />,

      // },


      {
        label: <Link to="/logout" className="text-base" >
          {t('Logout')}
        </Link>,
        key: '5',
        icon: <Logout size={22} />,


      },
    ]

    if (iconOnly) {
      // remove item index 1
      items.splice(1, 1)
    }

    return {
      items,
      onClick: () => { },
      onMouseEnter: () => { },
      triggerSubMenuAction: 'click',
    }
  }, [t])


  // if (isLoading) return <Skeleton.Button className="!w-32" size="large" active />

  // if (!data) return null

  return (
    <div>
      <Dropdown menu={menuProps} className="!border-border w-full"        >
        <Button size="large" block className="!h-auto !p-2 !rounded-lg bg-card-2 " loading={false}>
          <div className={`flex items-center gap-2 opacity-85 !text-text  w-full ${iconOnly ? 'justify-center' : 'justify-between'}`}>

            <div className="flex items-center gap-2">

              <div className="flex items-center justify-center   rounded-xl blue-gradient-dark  "
                style={{
                  width: (size >= 20 ? 2.25 : 1) + 'rem',
                  height: (size >= 20 ? 2.25 : 1) + 'rem',
                }}

              >
                <User size={size} className=" " />
              </div>

              {/* <span className="capitalize text-sm w-9 h-9 rounded-lg flex items-center justify-center bg-primary/50 font-bold text-white "> {data?.result?.first_name?.slice(0, 1)} </span> */}
              {!iconOnly && (
                <div className="flex-1 flex flex-col text-start text-sm">
                  <strong className="text-text-dark">
                    user name
                  </strong>
                  <span className=" ">
                    user email
                  </span>
                </div>
              )}
            </div>
            {!iconOnly && (
              <FaChevronDown className="me-2  opacity-30 " />
            )}
          </div>

        </Button>
      </Dropdown>

      {/* <Modal closable={false} open={visible} onCancel={() => setVisible(false)} onClose={() => setVisible(false)} footer={false}>
        <AboutModal />
      </Modal> */}
    </div>
  )
}

export default ProfileDropdown