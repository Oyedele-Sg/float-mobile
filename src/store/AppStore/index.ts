import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AppStore } from './appStore.types';
import { createAuthSlice } from './auth';
import { createUserSlice } from './user';
// import { createSignupSlice } from './signup';
import {
  userLogin, userLogout, saveUserDetails,
} from './multipleStates';
import { createSendSlice } from './send';

export const useAppStore = create<AppStore>()(
  immer((set, get, api) => ({
    authData: createAuthSlice(set, get, api),
    userData: createUserSlice(set, get, api),
    userLogin: userLogin(set, get),
    // signupData: createSignupSlice(set, get, api),
    // saveUserDetails: saveUserDetails(set, get),
    userLogout: userLogout(set, get),
    send: createSendSlice(set, get, api),
  })),
);
