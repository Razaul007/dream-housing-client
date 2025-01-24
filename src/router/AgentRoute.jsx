import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'

import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

const AgentRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'agent') return children
  return <Navigate to='/dashboard' replace='true' />
}

AgentRoute.propTypes = {
  children: PropTypes.element,
}

export default AgentRoute