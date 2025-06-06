import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, role } = useAuth();

  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - loading:', loading);
  console.log('ProtectedRoute - role:', role);
  console.log('ProtectedRoute - requiredRole:', requiredRole);

  if (loading || (requiredRole && role === null)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
