import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthState {
  loggedInUser: null | any;
  accessToken: null | string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  loggedInUser: null,
  accessToken: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      const { user, token } = action.payload;
      state.loggedInUser = user;
      state.accessToken = token;
    },
    removeCredentials: (state) => {
      state.loggedInUser = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.loggedInUser;

export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
