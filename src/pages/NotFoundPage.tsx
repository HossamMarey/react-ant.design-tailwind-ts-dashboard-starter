import { ErrorPage } from "@/components/shared"


const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <ErrorPage is404 />
    </main>
  )
}

export default NotFoundPage