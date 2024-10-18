import React from 'react'
import LanguageSwitcher from "./shared/LanguageSwitcher"
import DarkModeSwitcher from "./shared/DarkModeSwitcher"
import ProfileDropdown from "./shared/ProfileDropdown"

const DashMiniHeader = ({ className = '' }) => {
  return (
    <header className={`${className} bg-card shadow-sm p-3 rounded-lg mb-5 me-3`} >
      <div className="flex items-center justify-between">

        <div className="w-full flex items-center gap-3 2xl:gap-4">

          <LanguageSwitcher isShort />
          <div>ss</div>
        </div>

        <div className="w-full flex items-center justify-end gap-3 2xl:gap-4">

          <ProfileDropdown iconOnly size={16} />
          <DarkModeSwitcher size="middle" />
        </div>
      </div>
    </header>
  )
}

export default DashMiniHeader