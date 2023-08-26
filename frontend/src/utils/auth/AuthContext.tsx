import * as React from 'react';
import { IAuthContextType } from '../../interfaces/authContext';
import { JSX } from 'react/jsx-runtime';

export let AuthContext = React.createContext<IAuthContextType>({
  isAuthenticated: false,
  setAuthToken() {
    return undefined;
  },
  getAuthToken() {
    return new Promise(resolve => {
      resolve('');
    });
  },
  setCurrentUser() {
    return undefined;
  },
  getCurrentUser() {
    return new Promise(resolve => {
      resolve('');
    });
  },
  redirectLogin() {
    return undefined;
  },
  signout() {
    return undefined;
  }
});

export function useAuthContext() {
  return React.useContext(AuthContext);
}

export function withAuthContext(WrappedComponent: any) {
  return function WithAuthContext(props: JSX.IntrinsicAttributes) {
    return (
      <AuthContext.Consumer>
        {state => <WrappedComponent {...props} authContext={state} />}
      </AuthContext.Consumer>
    );
  };
}
