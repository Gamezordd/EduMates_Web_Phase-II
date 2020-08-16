export interface LoginState {
  email: string;
  password: string;
  redirect: boolean;
}

export interface RegisterState {
  email: string;
  password: string;
  confirmedPassword: string;
  errors: Array<string>;
  redirect: boolean;
}
