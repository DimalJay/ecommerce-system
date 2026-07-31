import React, { createContext, useContext, useState, useEffect } from 'react';
import { logoutUser } from '../api/authApi';
import { getUserApi } from '../api/userApi';

export interface UserSession {
  email: string;
  name: string;
  id?: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthContextType {
  user: UserSession | null;
  login: (email: string, fullName: string, extra?: { id?: string; first_name?: string; last_name?: string }) => void;
  logout: () => void;
  isLoadingUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const savedUser = localStorage.getItem('auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    getUserApi()
      .then((res) => {
        if (res.success && res.data) {
          const userData = res.data;
          const fullName = `${userData.first_name} ${userData.last_name}`.trim();
          const newUser: UserSession = {
            email: userData.email,
            name: fullName,
            id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
          };
          setUser(newUser);
          localStorage.setItem('auth_user', JSON.stringify(newUser));
        }
      })
      .catch(() => {
        // Session invalid or token expired
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, []);

  const login = (email: string, fullName: string, extra?: { id?: string; first_name?: string; last_name?: string }) => {
    const newUser: UserSession = { email, name: fullName, ...extra };
    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  };

  const logout = () => {
    logoutUser().catch(() => {});
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
