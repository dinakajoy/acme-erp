export interface IAuthContextType {
  // Value that returns whether the user is authenticated
  isAuthenticated: boolean;

  // Function that sets a new auth token
  setAuthToken: (token: string) => void;

  // Function that returns the latest auth token
  getAuthToken: () => Promise<string>;
  
  // Function that sets the current logged in user
  setCurrentUser: (user: any) => void;
  
  // Function that returns the current logged in user
  getCurrentUser: () => Promise<any>;

  // Function that redirects to the login page
  redirectLogin: (options: any) => void;

  // Function that triggers the logout
  signout: () => void;
}