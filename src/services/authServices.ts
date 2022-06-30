import toast from "react-hot-toast";
import {
  Auth,
  LoginInfo,
  LoginResponse,
  RegisterInfo,
  RegisterResponse,
} from "../types/Auth";
import requests from "./httpService";

export const login = async (info: LoginInfo) => {
  const loadingId = toast.loading("loading...");
  try {
    const res = await requests.post<LoginResponse>("/login", info);
    toast.dismiss(loadingId);
    if (res.error) {
      toast.error(res.error);
      return {} as Auth;
    } else {
      toast.success(res.message!);
      localStorage.setItem("jwt-token", `Bearer ${res.token}`);
      return res.auth;
    }
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error(error.message);
    return {} as Auth;
  }
};

export const register = async (info: RegisterInfo) => {
  const loadingId = toast.loading("loading...");
  try {
    const res = await requests.post<RegisterResponse>("/registration", info);
    toast.dismiss(loadingId);
    if (res.errors) {
      Object.values(res.errors).map((value) => toast.error(value as string));
      return {} as Auth;
    } else {
      toast.success(res.message!);
      localStorage.setItem("jwt-token", `Bearer ${res.token}`);
      return res.auth;
    }
  } catch (error: any) {
    toast.dismiss(loadingId);
    toast.error(error.message);
    return {} as Auth;
  }
};
