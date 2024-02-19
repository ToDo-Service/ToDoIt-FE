import axios from "axios";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";

const fetcher = (url: string, token: string) => {
  console.log("jwt", token);
  return axios
    .get(url, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export default fetcher;
