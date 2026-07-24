import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { LoginRequest, ProfileResponse, RegisterRequest } from '@it-master-ai/types';
import { login as loginRequest, register as registerRequest } from '../services/api';

type AuthContextValue = {
  user: ProfileResponse | null;
  token: string | null;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileResponse | null>(() => {
    const stored = window.localStorage.getItem('itma.user');
    return stored ? (JSON.parse(stored) as ProfileResponse) : null;
  });
  const [token, setToken] = useState<string | null>(() => window.localStorage.getItem('itma.token'));

  const persist = (profile: ProfileResponse, nextToken: string) => {
    setUser(profile);
    setToken(nextToken);
    window.localStorage.setItem('itma.user', JSON.stringify(profile));
    window.localStorage.setItem('itma.token', nextToken);
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    login: async (payload) => {
      const response = await loginRequest(payload);
      persist(response.profile, response.token);
    },
    register: async (payload) => {
      const response = await registerRequest(payload);
      persist(response.profile, response.token);
    },
    logout: () => {
      setUser(null);
      setToken(null);
      window.localStorage.removeItem('itma.user');
      window.localStorage.removeItem('itma.token');
    }
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
