import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { recruiter, loading } = useAuth();
  if (loading) return <div className="min-h-screen grid place-items-center text-slate-200">Loading...</div>;
  if (!recruiter) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
