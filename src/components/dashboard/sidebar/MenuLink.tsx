
import { useSidebarContext } from "@/services/context/SidebarContext"
import { Tooltip } from "antd"
import { ArrowDown2, ArrowLeft2, ArrowRight, ArrowRight2 } from "iconsax-react"
import { FC, ReactNode, useMemo } from 'react'
import { Link, useLocation } from "react-router-dom"



interface MenuLinkProps {
  title: string
  icon: ReactNode,
  to: string
  extraText?: string
  subLinks?: MenuLinkProps[]
  isCondensed?: boolean
  show?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined
  routeKey?: string
}

const MenuLink: FC<MenuLinkProps> = ({ title, icon, to, isCondensed = false, subLinks, onClick, extraText = '', show = true, routeKey }) => {

  const pathname = useLocation().pathname

  const isHasSubLinks = useMemo(() => !!subLinks?.length, [subLinks])

  const isActive = useMemo(() => {

    if (isHasSubLinks) {
      const toParts = to.split("/")
      const pathParts = pathname.split("/")
      let isSame = toParts.length < pathParts.length

      if (isSame && to !== '/dashboard') {

        toParts.forEach((p, ix) => {
          if (p !== pathParts[ix]) {
            isSame = false
          }
        }
        )
        if (isSame) return true
      }

      if (to === '/dashboard' && (toParts.length + 1) === pathParts.length) {
        return true
      }



    }
    // pathname?.startsWith(to) && isHasSubLinks ||
    return pathname === to
  }, [pathname, to, isHasSubLinks])

  const mainHref = useMemo(() => {
    let href = to
    if (isHasSubLinks) {
      let x = false
      subLinks?.forEach(l => {
        if (l.show) {
          if (!x) {
            href = l.to
            x = true
            return
          }
        }
      })
    }

    return href
  }, [subLinks, to, isHasSubLinks])

  if (!show) return null
  return (
    <li className={`list-none  px-4  ${isActive && isHasSubLinks ? 'bg-bg py-2 lg:py-3 ' : ' '}`}
      id={routeKey || to}

    >

      <SingleLink
        title={title}
        icon={icon}
        to={mainHref}
        onClick={onClick}
        isHasSubLinks={isHasSubLinks}
      />


      {isActive && isHasSubLinks && (
        <div className="h-animation flex flex-col gap-1.5 px-1.5 mt-2.5  ">
          {subLinks?.map(({ title, to, show, icon }) => show ? (

            <SingleLink
              icon={icon}
              title={title}
              to={to}
            />

          ) : <>  </>)}

        </div>
      )}

      <div>

      </div>
    </li>
  )
}


const SingleLink = ({ title, to, icon, onClick, isHasSubLinks }: { title: string, to: string, icon: ReactNode, onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined, isHasSubLinks?: boolean }) => {

  const pathname = useLocation().pathname
  const isActive = pathname === to
  const isOutside = to?.startsWith('http')


  const { isCondensed } = useSidebarContext()


  return (
    <Tooltip title={isCondensed ? title : ''}
      placement="right"
    >
      <Link key={to} to={to}
        target={isOutside ? '_blank' : '_self'}
        className={`    
      capitalize  text-sm flex items-center gap-3 p-2  rounded-xl 
      hover:text-opacity-90 
      ${isCondensed ? ' justify-center ' : ''}
      ${isActive && !isHasSubLinks ? 'blue-gradient text-primary font-bold' : ' '}
      ${isActive && isHasSubLinks ? 'text-text-dark' : ' '}
       hover:text-text hover:opacity-80 hover:bg-primary-light
      `}
        onClick={onClick}
      >
        {!!icon && (
          <>
            {icon}
          </>
        )}

        {isCondensed && !icon && (
          <div className="text-xl uppercase font-extrabold">
            {title[0]}
          </div>
        )}
        {!isCondensed && (
          <span className="inline-block flex-1 ">
            {title}
          </span>
        )}

        {isHasSubLinks && (
          <>
            {isActive ? (
              <ArrowDown2 size={16} />
            ) : (
              <>
                <ArrowRight2 size={16} className="ltr:inline-block rtl:hidden" />
                <ArrowLeft2 size={16} className="rtl:inline-block ltr:hidden" />
              </>
            )}
          </>
        )}
      </Link>
    </Tooltip>
  )
}


export default MenuLink