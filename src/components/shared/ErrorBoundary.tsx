import { FC } from "react"
import { ErrorBoundary as NativeErrorBoundary, FallbackProps } from "react-error-boundary"
import ErrorMessage from "./ErrorMessage"




const FallbackRender: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="container-fluid flex items-center justify-center  my-6">
      <div className="w-full max-w-screen-md">
        <ErrorMessage error={error} refetch={resetErrorBoundary} />
      </div>
    </div>
  )

}

interface Props {
  children?: React.ReactNode
}

const ErrorBoundary: FC<Props> = ({ children }) => {
  return (
    <NativeErrorBoundary FallbackComponent={FallbackRender}>
      {children}
    </NativeErrorBoundary>
  )
}

export default ErrorBoundary