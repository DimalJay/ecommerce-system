import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminMeQuery } from '../../hooks/useAdminAuth';

export interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

/**
 * Guard component for restricting access to authenticated admin users only.
 * Checks GET /admin/me session and redirects to /admin/login if unauthenticated or unauthorized.
 */
export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { data, isLoading, isError } = useAdminMeQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.success || !data?.data) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
