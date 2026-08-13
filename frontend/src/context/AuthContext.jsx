import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // TODO: implement auth state (user, token, login, logout, register)
  const value = {
    user: null,
    token: null,
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
    register: async () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
