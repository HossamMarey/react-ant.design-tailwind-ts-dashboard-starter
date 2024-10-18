
import { ArchiveBox, CloudPlus, Flash, Document, Eye, Folder, Map1, Setting2, ShieldTick, Warning2, Box2, Profile, Profile2User, Hierarchy, User, Chart2, CalendarTick, Star, Driver, Information, Setting3, Diamonds, } from "iconsax-react"


import { } from "@/pages";

const Page = () => <div>

  <h1> <code> Empty page </code></h1> </div>

import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { ChangePasswordPage, EditInfoPage, ProfilePage } from "@/pages/dashboard";
import { DarkModeSwitcher } from "@/components/layout";


const Redirect = ({ path }: { path: string }) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(path, { replace: true })
  }, [])
  return <></>
}


export interface RouteInfo {
  key: string; // Don't change this key in future // unique 
  label: string;
  icon?: JSX.Element;
  inMenu?: boolean;
  path: string;
  element: JSX.Element;
  tag?: string
  subRoutes?: RouteInfo[]
}

export const DASHBOARD_ROUTES: RouteInfo[] = [
  {
    key: 'dashboard-overview',
    label: 'overview',
    // icon: <Home variant="Linear" size={24} />,
    inMenu: true,
    path: '',
    // tag: 'Beta',
    element: <Redirect path="analytics" />,
    subRoutes: [
      {
        key: 'dashboard-analytics',
        label: 'analytics',
        inMenu: true,
        path: '/analytics',
        element: <Page />,
        icon: <Chart2 variant="Bulk" size={24} />,
      },
      {
        key: 'dashboard-calendar',
        label: 'calendar',
        inMenu: true,
        path: '/calendar',
        element: <Page />,
        icon: <CalendarTick variant="Bulk" size={24} />,
      },
    ]
  },
  {
    key: 'context',
    label: 'context',
    // icon: <Buildings2 variant="Linear" size={24} />,
    inMenu: true,
    path: '/context',
    element: <Redirect path="threats" />,
    subRoutes: [
      {
        key: 'context-threats',
        label: 'threats',
        inMenu: true,
        path: '/threats',
        element: <Page />,
        icon: <Information variant="Bulk" size={24} />
      },
      {
        key: 'context-threats-single',
        label: 'Single Context Threat',
        inMenu: false,
        path: '/threats/:id',
        element: <Page />,
      },
      {
        key: 'context-threats-edit',
        label: 'contextThreatsEdit',
        inMenu: false,
        path: '/threats/:id/edit',
        element: <Page />,
        icon: <ArchiveBox variant="Bulk" size={24} />,
      },
      {
        key: 'context-reference-controls',
        label: 'referenceControls',
        inMenu: true,
        path: '/reference-controls',
        element: <Page />,
        icon: <Setting2 variant="Bulk" size={24} />,
      },
      {
        key: 'context-reference-controls-single',
        label: 'contextReferenceControlsSingle',
        inMenu: false,
        path: '/reference-controls/:id',
        element: <Page />,
      }
    ]
  },


  {
    key: 'organization',
    label: 'organization',
    // icon: <Buildings2 variant="Linear" size={24} />,
    inMenu: true,
    path: '/organization',
    element: <Redirect path="domains" />,
    subRoutes: [
      {
        key: 'organization-domains',
        label: 'domains',
        inMenu: true,
        path: '/domains',
        element: <Page />,
        icon: <Hierarchy variant="Bulk" size={24} />,
      },
      {
        key: 'organization-domains-single',
        label: 'domain',
        inMenu: false,
        path: '/domains/:id',
        element: <Page />,
        icon: <ArchiveBox variant="Bulk" size={24} />,
      },
      {
        key: 'organization-domains-edit',
        label: 'domains',
        inMenu: false,
        path: '/domains/:id/edit',
        element: <Page />,
        icon: <ArchiveBox variant="Bulk" size={24} />,
      },

    ]
  },



  {
    key: 'profile',
    label: 'profile',
    // icon: <Buildings2 variant="Linear" size={24} />,
    inMenu: false,
    path: '/profile',
    element: <ProfilePage />,
    subRoutes: [
      {
        key: 'change-password',
        label: 'changePassword',
        inMenu: false,
        path: '/changePassword',
        element: <ChangePasswordPage />,
      },
      {
        key: 'edit-info',
        label: 'editInfo',
        inMenu: false,
        path: '/editInfo',
        element: <EditInfoPage />,
      }
    ]
  },



]


export const getDashboardPathByKey = (key: string) => {
  const base = '/dashboard'
  let path = DASHBOARD_ROUTES.find((route) => route.key === key)?.path
  if (!path?.startsWith('/')) {
    path = '/' + path
  }
  return base + path
}


export const getDashboardSubPath = (key: string, subKey: string) => {
  const base = '/dashboard'
  const main = DASHBOARD_ROUTES.find((route) => route.key === key)
  let path = main?.path || ''
  if (!path?.startsWith('/')) {
    path = '/' + path
  }
  let sub = main?.subRoutes?.find((route) => route.key === subKey)?.path
  if (!sub?.startsWith('/')) {
    sub = '/' + sub
  }

  let full = base + path + sub

  if (full?.includes('/:')) {
    full = full.split('/:')[0]
  }
  return full
}