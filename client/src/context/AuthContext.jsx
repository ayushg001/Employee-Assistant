import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL, parseResponse } from '../config/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('pulseai_token') || null);
  const [loading, setLoading] = useState(true);

  // Logout function
  const logout = React.useCallback(() => {
    localStorage.removeItem('pulseai_token');
    setToken(null);
    setUser(null);
  }, []);

  // Fetch current user profile whenever token changes or on initial load
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await parseResponse(response);
          setUser(data.user);
        } else {
          // Token is invalid or expired
          logout();
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, logout]);

  // Login function
  const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseResponse(response);

    if (!response.ok || !data || !data.token || !data.user) {
      throw new Error(
        data?.message ||
          'Backend API is not responding. Please make sure your backend is running and connected.'
      );
    }

    localStorage.setItem('pulseai_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  // Register function
  const register = async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await parseResponse(response);

    if (!response.ok || !data || !data.token || !data.user) {
      throw new Error(
        data?.message ||
          'Backend API is not responding. Please make sure your backend is running and connected.'
      );
    }

    localStorage.setItem('pulseai_token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };


  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
