import { useState, useCallback, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthResult, StoredUser, User } from './types';

const USERS_KEY = 'portfolio_users';
const SESSION_KEY = 'portfolio_session';

const getUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as StoredUser[];
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
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    return parsed as User;
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

  const login = useCallback((email: string, password: string): AuthResult => {
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
    (firstName: string, lastName: string, email: string, password: string): AuthResult => {
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
    <AuthContext value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext>
  );
};
