import { StateCreator } from 'zustand';
import { AppStore } from '../appStore.types';
import { AuthSlice, initialAuthState } from './authSlice.types';

export const createAuthSlice: StateCreator<
AppStore,
[['zustand/immer', never]],
[],
AuthSlice
> = (set) => ({
  ...initialAuthState,
  saveToken: (data) => {
    // TODO:  PERSIST TOKEN DATA TO STORAGE
    set((state) => ({
      authData: {
        ...state.authData,
        token: data.access_token,
      },
    }));
  },
  checkNetworkConnection: (networkStatus) => {
    set((state) => ({
      authData: {
        ...state.authData,
        isAppConnectedToInternet: networkStatus,
      },
    }));
  },
});
