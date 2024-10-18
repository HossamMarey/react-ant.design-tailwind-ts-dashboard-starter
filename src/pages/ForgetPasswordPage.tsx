import { ForgetPasswordForm, LoginContainer } from "@/components/auth"
import { UiProvider } from "@/services/theme"


const ForgetPasswordPage = () => {
  return (
    <UiProvider  >
      <LoginContainer  >
        <ForgetPasswordForm />
      </LoginContainer>
    </UiProvider>
  )
}

export default ForgetPasswordPage