import axios from "axios";

const PublicFetcher = (url: string, params: any) => {
  return axios
    .get(url, {
      headers: {
        Accept: "application/json",
      },
      params,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default PublicFetcher;
