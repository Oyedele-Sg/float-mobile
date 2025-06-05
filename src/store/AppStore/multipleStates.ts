// import { ServerUserData } from '@features/auth/types/authentication.types';
import { ServerUserData } from 'src/services';
import { AppStore } from './appStore.types';
import { pickFields } from 'src/lib/pickFields';

const pickUserData = (data: ServerUserData) => pickFields(
  data,
  [
    "first_name",
    "last_name",
    "username",
    "selfie_image",
    "phone_number",
    "gender",
    "email",
    "last_login",
    "is_blocked",
    "account_user_id"
  ],
);

export const userLogin = (
  set: (fn: (state: AppStore) => void) => void,
  get: () => AppStore,
) => (data: ServerUserData) => {
  const currentState = get();

  const pickedUserData = pickUserData(data);

  const newState: Partial<AppStore> = {
    // userData: {
    //   ...currentState.userData,
    //   ...pickedUserData,
    // },
    // authData: {
    //   ...currentState.authData,
    //   isLoggedIn: true,
    // },
  };

};

export const saveUserDetails = (
  set: (fn: (state: AppStore) => void) => void,
  get: () => AppStore,
) => (data: ServerUserData) => {
  const currentState = get();

  const pickedUserData = pickUserData(data);

  // const newState: Partial<AppStore> = {
  //   userData: {
  //     ...currentState.userData,
  //     ...pickedUserData,
  //   },
  //   authData: {
  //     ...currentState.authData,
  //     isLoggedIn: true,
  //   },
  // };
};

export const userLogout =	(set: (fn: (state: AppStore) => void) => void, get: () => AppStore) => () => {
  const currentState = get();

  // const newState: Partial<AppStore> = {
  //   authData: {
  //     ...currentState.authData,
  //     isLoggedIn: false,
  //     token: null,
  //   }
  // };

  // set(() => ({
  //   ...currentState,
  //   ...newState,
  // }));
};

