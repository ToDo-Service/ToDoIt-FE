import axios from "axios";
import { signOut } from "next-auth/react";

const Fetcher = (url: string, token: string) => {
  return axios
    .get(url, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data)
    .catch((err) =>
      err.response.status === 401
        ? signOut({ redirect: true, callbackUrl: "/auth/Login" })
        : undefined
    );
};

export default Fetcher;
