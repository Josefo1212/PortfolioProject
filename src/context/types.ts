export interface User {
  id: string;
  email: string;
  name: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (name: string, email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}
