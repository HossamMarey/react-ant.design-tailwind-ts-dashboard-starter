import { LoginContainer, LoginForm } from "@/components/auth"
import { UiProvider } from "@/services/theme"

const LoginPage = () => {
  return (
    <UiProvider  >
      <LoginContainer  >
        <LoginForm />
      </LoginContainer>
    </UiProvider>
  )
}

export default LoginPage