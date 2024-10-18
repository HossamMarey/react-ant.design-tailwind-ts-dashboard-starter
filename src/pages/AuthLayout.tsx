
import { ErrorBoundary } from "@/components/shared"
import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = ({ redirect }: { redirect?: string }) => {

  if (redirect) return <Navigate to={redirect} />

  return (
    <>
      <ErrorBoundary  >
        <Outlet />
      </ErrorBoundary>
    </>
  )
}

export default AuthLayout