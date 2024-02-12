import axios from "axios";

const fetcher = (url: string, Jwt: any) => {
  console.log(Jwt);
  return axios
    .get(url, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${Jwt}` },
    })
    .then((res) => res.data);
};

export default fetcher;
