export interface Auth {
  _id?: string;
  name: string;
  email: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface RegisterInfo extends LoginInfo {
  name: string;
}

export interface RegisterResponse {
  errors?: {};
  message?: string;
  token?: string;
  auth: Auth;
}

export interface LoginResponse extends RegisterResponse {
  error: string;
}
