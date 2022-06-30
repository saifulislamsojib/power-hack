import useSWR from "swr";
import requests from "../services/httpService";
import { Auth } from "../types/Auth";

const getToken = () => localStorage.getItem("jwt-token");

const getValidToken = () => {
  const token = getToken();
  return token && token.startsWith("Bearer ") && token.split("Bearer ")[1];
};

const fetcher = (url: string): Promise<Auth> =>
  getValidToken()
    ? requests.get<{ auth: Auth }>(url).then(({ auth }) => auth)
    : new Promise((resolve) => resolve({} as Auth));

const useAuth = () => {
  const { data: auth, mutate } = useSWR(
    ["/loggedInUser", getToken()],
    fetcher,
    {
      suspense: true,
    }
  );

  return {
    auth,
    mutate,
  };
};

export default useAuth;
