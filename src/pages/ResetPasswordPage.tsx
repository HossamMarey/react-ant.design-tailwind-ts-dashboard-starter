import { LoginContainer, ResetPasswordForm } from "@/components/auth"
import { UiProvider } from "@/services/theme"


const ResetPasswordPage = () => {
  return (
    <UiProvider dark>
      <LoginContainer  >
        <ResetPasswordForm />
      </LoginContainer>
    </UiProvider>
  )
}

export default ResetPasswordPage