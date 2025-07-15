import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (username, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.msg || 'Login failed');
      error.response = { data: errorData };
      throw error;
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    setToken(data.token);
  };

  const register = async (username, password) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const errorData = await res.json();
      const error = new Error(errorData.msg || 'Registration failed');
      error.response = { data: errorData };
      throw error;
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
} 