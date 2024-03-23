export type IBodyLogin = {
  // provider: LoginProvider;
  email?: string;
  password?: string;
  code?: string;
  redirectUri?: string;
};

export interface IUser {
  _id: string;
  email: string;
  name?: string;
  role?: string;
  avatar?: string;
}

export interface ILoginResponse {
  accessToken: {
    token: string;
    expiresIn: number;
  };
  refreshToken: {
    token: string;
    expiresIn: number;
  };
  profile: IUser;
}
