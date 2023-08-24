import * as React from 'react';
import { IAuthContextType } from '../../interfaces/authContext';

export let AuthContext = React.createContext<IAuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}