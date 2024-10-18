
import ChangePasswordForm from "./ChangePasswordForm"

const MainChangePassword = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>

        <h1> changePassword </h1>
      </div>
      <div className="card py-32 !border-0">
        <ChangePasswordForm />
      </div>
    </div>
  )
}

export default MainChangePassword