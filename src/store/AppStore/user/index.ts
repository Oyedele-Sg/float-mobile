import { StateCreator } from 'zustand';
import { AppStore } from '../appStore.types';
import { initialUserState, UserSlice } from './userSlice.types';

export const createUserSlice: StateCreator<
AppStore,
[],
[],
UserSlice
> = (set, get) => ({
  ...initialUserState,
  updateUser: (data) => {
    const { authData } = get();

    if (authData.token) {
      set(() => ({
        authData: {
          ...authData,
          account_user_id: data.account_user_id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone_number: data.phone_number,
          username: data.username,
          selfie_image: data.selfie_image,
          gender: data.gender,
          last_login: data.last_login,
          is_blocked: data.is_blocked
        },
      }));
    }
  },
});
