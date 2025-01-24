
import { Navigate } from "react-router-dom"
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics"
import LoadingSpinner from "../../../components/LoadingSpinner"
import useRole from "../../../hooks/useRole"

const Statistics = () => {
  const [role, isLoading] = useRole()
  if (isLoading) return <LoadingSpinner />
  if (role === 'customer') return <Navigate to='/dashboard/my-wishlist' />
  if (role === 'agent') return <Navigate to='/dashboard' />

  return (
    <div>
      <AdminStatistics />
    </div>
  )
}

export default Statistics