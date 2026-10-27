import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as service from './authService';
import {
  ROLE_PERMISSIONS,
  type LoginInput,
  type Permission,
  type ProfilePatch,
  type SignUpInput,
  type UserAccount,
} from './types';

interface AuthContextValue {
  user: UserAccount | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: ProfilePatch) => void;
  can: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    service
      .seedDemoUsers()
      .catch(() => undefined)
      .then(() => {
        if (cancelled) return;
        setUser(service.getSessionUser());
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    setUser(await service.login(input));
  }, []);

  const signUp = useCallback(async (input: SignUpInput) => {
    setUser(await service.signUp(input));
  }, []);

  const logout = useCallback(() => {
    service.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback((patch: ProfilePatch) => {
    setUser((current) => (current ? service.updateProfile(current.id, patch) : current));
  }, []);

  const can = useCallback(
    (permission: Permission) => !!user && ROLE_PERMISSIONS[user.role].includes(permission),
    [user],
  );

  const value = useMemo(
    () => ({ user, isLoading, login, signUp, logout, updateProfile, can }),
    [user, isLoading, login, signUp, logout, updateProfile, can],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
