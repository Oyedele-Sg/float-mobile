
import { TokenResponse } from 'src/services/Auth/AuthServices.types';

export interface AuthState {
  token: string | null
  refresh_token: string | null
  isLoggedIn: boolean
  isAppConnectedToInternet: boolean
}

export interface AuthActions {
  saveToken: (data: TokenResponse) => void;
  checkNetworkConnection: (networkStatus: boolean) => void;
}

export const initialAuthState: AuthState = {
  token: null,
  refresh_token: null,
  isLoggedIn: false,
  isAppConnectedToInternet: true,
};

export interface AuthSlice
  extends AuthState, AuthActions {}
