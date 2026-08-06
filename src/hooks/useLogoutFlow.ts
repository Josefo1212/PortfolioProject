import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth';

const LOGOUT_DURATION = 800;

export const useLogoutFlow = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(() => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      void navigate('/');
    }, LOGOUT_DURATION);
  }, [isLoggingOut, logout, navigate]);

  return { isLoggingOut, handleLogout };
};
