
import { ServerUserData } from 'src/services';


export interface UserState {
  account_user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  selfie_image: string;
  phone_number: string;
  gender: string;
  email: string;
  last_login: string;
  is_blocked: boolean;
}

export interface UserActions {
  updateUser: (data: ServerUserData) => void;
}

export const initialUserState: UserState = {
  account_user_id: '',
  first_name: '',
  last_name: '',
  username: '',
  selfie_image: '',
  phone_number: '',
  gender: '',
  email: '',
  last_login: '',
  is_blocked: false
};

export interface UserSlice extends UserState, UserActions { }

