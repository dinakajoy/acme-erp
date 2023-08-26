import React, { useCallback, useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const TOKEN_NAME = 'demco-token';

function storageSetAuthToken(token: string) {
  localStorage.setItem(TOKEN_NAME, token);
}

function storageGetAuthToken() {
  const token = localStorage.getItem(TOKEN_NAME);
  return token || '';
}

function storageDeleteAuthToken() {
  localStorage.clear();
}

export function AuthProvider({ children }) {
  // Retrieve authentication token
  const [authToken, setAuthToken] = useState(storageGetAuthToken());
  const [user, setUser] = useState({});

  const handleLogout = useCallback(() => {
    storageDeleteAuthToken();
    sessionStorage.clear();
    setAuthToken('');
  }, []);

  // Sync authentication token between different tabs
  useEffect(() => {
    const handleStorage = () => {
      const currentToken = storageGetAuthToken();
      setAuthToken(currentToken);

      // The authentication token is gone
      if (!currentToken && authToken) {
        storageSetAuthToken('');
        setAuthToken('');
        return;
      }

      // The authentication token has changed
      if (authToken !== currentToken) {
        window.location.reload();
      }
    };
    window.addEventListener('storage', handleStorage);
    document.addEventListener('AuthenticationRequiredError', handleLogout);

    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('AuthenticationRequiredError', handleLogout);
    };
  }, [authToken, handleLogout]);

  const value = {
    isAuthenticated: !!authToken,
    setAuthToken: (token: string) => {
      storageSetAuthToken(token);
      setAuthToken(token);
    },
    getAuthToken: () => {
      return new Promise<string>(resolve => {
        const token = storageGetAuthToken() as string;
        resolve(token);
      });
    },
    setCurrentUser: (user: string) => {
      setUser(user);
    },
    getCurrentUser: () => {
      return new Promise<{}>(resolve => {
        resolve(user);
      });
    },
    redirectLogin: (location: any) => {
      return <Navigate to="/" state={{ from: location }} replace />;
    },
    signout() {
      handleLogout();
      storageSetAuthToken('');
      setAuthToken('');
      this.redirectLogin('/');
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
