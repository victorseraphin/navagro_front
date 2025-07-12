import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios';
import { setAccessToken } from './tokenManager';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await api.post('/login', { username, password });
      setAccessToken(response.data.accessToken);
      setUser(response.data.user); // supondo que o backend retorna info do usuário
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.post('/logout'); // opcional, para invalidar refresh token no backend
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
