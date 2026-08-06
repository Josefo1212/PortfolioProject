import { use } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextValue } from './types';

export const useAuth = (): AuthContextValue => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
