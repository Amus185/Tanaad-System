/**
 * Auth context — mock login for UI preview.
 * Will switch to real JWT when D1 backend is deployed.
 */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, LoginRequest } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tanaad_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    // Mock login — accepts any username/password for UI testing
    const mockUser: User = {
      id: 1,
      username: credentials.username,
      email: `${credentials.username}@tanaad.edu`,
      role: 'admin',
      is_active: true,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    };
    localStorage.setItem('tanaad_user', JSON.stringify(mockUser));
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('tanaad_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
