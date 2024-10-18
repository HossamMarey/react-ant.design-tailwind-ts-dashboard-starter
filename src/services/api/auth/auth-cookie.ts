
import { AUTH_COOKIE_TOKEN, } from "@/services/constants"
import Cookies from 'js-cookie'

export const setAuthCookie = (token: string) => {
  Cookies.set(AUTH_COOKIE_TOKEN, token, { expires: 30 })
}

export const getAuthCookie = () => {
  return Cookies.get(AUTH_COOKIE_TOKEN) || ''
}

export const removeAuthCookie = () => {
  Cookies.remove(AUTH_COOKIE_TOKEN)
}

export const isAuthCookieSet = () => {
  return !!Cookies.get(AUTH_COOKIE_TOKEN)
}
