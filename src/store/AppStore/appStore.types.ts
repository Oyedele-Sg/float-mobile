
// import { AuthSlice } from './auth/authSlice.types';
// import { UserSlice } from './user/userSlice.types';
// import { SignupActions, SignupState } from './signup/signupSlice.types';
// import { SendSlice } from './send/sendSlice.types';
import { ServerUserData } from 'src/services';
import { SendSlice } from './send/sendSlice.types';

export interface AppStore {
  // authData: AuthSlice
  // userData: UserSlice
  send: SendSlice
  // signupData: SignupState & SignupActions
  // userLogin: (data: ServerUserData) => void;
  // saveUserDetails: (data: ServerUserData) => void;
  // userLogout: () => void;
}
