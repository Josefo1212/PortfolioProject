import { useState, useCallback, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthResult, StoredUser, User } from './types';

const USERS_KEY = 'portfolio_users';
const SESSION_KEY = 'portfolio_session';

const getUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getSession = (): User | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveSession = (user: User | null) => {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getSession);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      return { success: false, error: 'Credenciales inválidas' };
    }

    const { password: _removed, ...sessionUser } = found;
    void _removed;
    setUser(sessionUser);
    saveSession(sessionUser);
    return { success: true };
  }, []);

  const register = useCallback(
    async (firstName: string, lastName: string, email: string, password: string): Promise<AuthResult> => {
      const users = getUsers();

      if (users.some((u) => u.email === email)) {
        return { success: false, error: 'Este email ya está registrado' };
      }

      const newUser: StoredUser = { id: crypto.randomUUID(), firstName, lastName, email, password };
      saveUsers([...users, newUser]);

      const { password: _removed, ...sessionUser } = newUser;
      void _removed;
      setUser(sessionUser);
      saveSession(sessionUser);
      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    saveSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
