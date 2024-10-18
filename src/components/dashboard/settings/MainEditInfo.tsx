
import EditInfoForm from "./EditInfoForm"

const MainEditInfo = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1> Edit </h1>
      </div>
      <div className="card py-32 !border-0">
        <EditInfoForm />
      </div>
    </div>
  )
}

export default MainEditInfo