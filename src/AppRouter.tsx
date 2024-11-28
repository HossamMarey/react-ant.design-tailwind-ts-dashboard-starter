import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import {
  AuthLayout,
  ForgetPasswordPage,
  LoginPage,
  LogoutPage,
  NotFoundPage,
  ResetPasswordPage,
  FatherLayout,

} from './pages'

import { DASHBOARD_ROUTES } from "./services/constants"
import { HelmetPageTitle, ScrollToTop } from "./components/shared"
import { DashLayout } from "./pages/dashboard"


const AppRouter = () => {


  const getSubPath = (path = '', sub = '') => {
    const basePath = path?.startsWith('/') ? path.slice(1) : path
    const baseSub = sub?.startsWith('/') ? sub.slice(1) : sub
    const full = (basePath ? basePath + '/' : '') + baseSub
    return full
  }
  return (
    <BrowserRouter>


      <ScrollToTop />
      <Routes>

        <Route element={<FatherLayout />}>

          {/* auth routes */}
          {/* redirect={authRedirect} */}
          <Route element={<AuthLayout />}>
            <Route
              path="/"
              element={
                <HelmetPageTitle title="login" >
                  <LoginPage />
                </HelmetPageTitle>
              }
            />
            <Route
              path="/forget-password"
              element={
                <HelmetPageTitle title="forgetPassword" > <ForgetPasswordPage /> </HelmetPageTitle>
              }
            />
            <Route path="/resetpassword"
              element={
                <HelmetPageTitle title="resetPassword" >
                  <ResetPasswordPage />
                </HelmetPageTitle>
              }
            />
          </Route>

          {/* dashboard routes */}
          {/* redirect={dashRedirect} */}
          <Route
            path="/dashboard"
            element={<DashLayout />}
          >

            {DASHBOARD_ROUTES.map((r, ix) => (
              <>
                <Route
                  key={'dash-' + r.key + '-' + ix}
                  path={r?.path?.startsWith('/') ? r?.path.slice(1) : r?.path}
                  element={
                    <HelmetPageTitle title={r?.label}>
                      {r.element}
                    </HelmetPageTitle>
                  }
                />

                {!!r?.subRoutes?.length && r?.subRoutes?.map((l, lx) => (
                  <Route
                    key={'dash-sub-' + l.key + '-' + lx + r.key}
                    path={getSubPath(r?.path, l?.path)}
                    element={
                      <HelmetPageTitle title={r?.label} subTitle={l?.label}>
                        {l.element}
                      </HelmetPageTitle>
                    }
                  />
                ))}

              </>
            ))}
          </Route>



          <Route path="/logout" element={<LogoutPage />} />
          <Route path="*" element={
            <HelmetPageTitle title="pageNotFound" >
              <NotFoundPage />
            </HelmetPageTitle>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default AppRouter
