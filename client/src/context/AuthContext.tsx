import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../services/api';

interface AuthContextProps {
  recruiter: { id: string; name: string; email: string; company: string } | null;
  loading: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  register: (payload: { name: string; email: string; password: string; company?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [recruiter, setRecruiter] = useState<AuthContextProps['recruiter']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hiregenius_recruiter');
    if (stored) {
      setRecruiter(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (payload: { email: string; password: string }) => {
    const { data } = await authApi.login(payload);
    localStorage.setItem('hiregenius_token', data.token);
    localStorage.setItem('hiregenius_recruiter', JSON.stringify(data.recruiter));
    setRecruiter(data.recruiter);
  };

  const register = async (payload: { name: string; email: string; password: string; company?: string }) => {
    const { data } = await authApi.register(payload);
    localStorage.setItem('hiregenius_token', data.token);
    localStorage.setItem('hiregenius_recruiter', JSON.stringify(data.recruiter));
    setRecruiter(data.recruiter);
  };

  const logout = () => {
    localStorage.removeItem('hiregenius_token');
    localStorage.removeItem('hiregenius_recruiter');
    setRecruiter(null);
  };

  return (
    <AuthContext.Provider value={{ recruiter, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
