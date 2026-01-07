import React, { use } from 'react';
import { useState,useContext } from 'react';
import './AuthProvider.css';

const AuthContext=useContext();

function AuthProvider({children}) {

  const[isAuthenticated, setIsAuthenticated] = useState(false);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  if (!token) {
    setIsAuthenticated(false);
    setLoading(false);
    return;
  }
  const verifyToken = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_TOKEN_API, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError(err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);
  
  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth=() => {
  return useContext(AuthContext);
}
