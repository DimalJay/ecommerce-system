import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
  Guard component to restrict access to authenticated users only.
  Redirects unauthenticated users to home page.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useCart();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
