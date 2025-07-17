
export type LoginProps = {
  email: string;
  password: string;
};

export type ServerToken = {
  access_token: string;
};
export interface TokenResponse {
  access_token: string;
}

export type isLoggedinBeforeProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  firstTimeUser: boolean;
  isBiometricHasError: boolean;
  biometricPermission: boolean;
};

