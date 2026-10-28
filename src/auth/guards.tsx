import React from 'react';
import { useAuth } from './AuthContext';
import type { Permission, UserRole } from './types';

/** Shows children only when signed in; otherwise renders `fallback` (e.g. <AuthPage />). */
export const RequireAuth: React.FC<{ children: React.ReactNode; fallback: React.ReactNode }> = ({
  children,
  fallback,
}) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-600">
        Loading…
      </div>
    );
  }
  return <>{user ? children : fallback}</>;
};

export const RequireRole: React.FC<{
  roles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ roles, children, fallback = null }) => {
  const { user } = useAuth();
  return <>{user && roles.includes(user.role) ? children : fallback}</>;
};

export const Can: React.FC<{
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ permission, children, fallback = null }) => {
  const { can } = useAuth();
  return <>{can(permission) ? children : fallback}</>;
};
