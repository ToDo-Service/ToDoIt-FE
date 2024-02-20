import axios from "axios";

const Fetcher = (url: string, token: string) => {
  return axios
    .get(url, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export default Fetcher;
