
import { FC } from 'react'


interface MainLogoProps {
  isLight?: boolean
  size?: number
  isHome?: boolean
  isCondensed?: boolean
}
// import logo from '@/assets/images/logo.png'
import logo from '@/assets/images/logo.svg'
import logoDark from '@/assets/images/logo-dark.svg'
import logoCondensed from '@/assets/images/logo-condensed.svg'
import { useIsScreen } from "@/services/hooks"
import { Link } from "react-router-dom"
import { Image } from "antd"

const MainLogo: FC<MainLogoProps> = ({ size = 47, isHome = false, isCondensed = false, isLight = false }) => {

  const { lg } = useIsScreen()

  const imgSize = lg ? size : size * 0.75
  const link = isHome ? '/' : '/dashboard'

  const mainLogo = isLight ? logoDark : logo
  const logoImg = isCondensed ? logoCondensed : mainLogo
  return (
    <Link to={link} className="hover:opacity-75 transition-opacity opacity-90">
      <Image src={logoImg} preview={false} alt="dark atlas logo" height={imgSize} className={`object-contain transition-all `} />
    </Link>
  )
}

export default MainLogo