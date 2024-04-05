import axios from "axios";

export const useHoliday = async (params: any) => {
  console.log(params);
  const response = await axios.get(
    "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService",
    {
      headers: {
        Accept: "application/json",
      },
      params: {
        solYear: "2020",
        solMonth: "03",
        _type: "json",
        ServiceKey:
          "kZK9%2BViVCIYkl9fywmHaud4eZaQngWRTlUSD4w%2Bi8%2BbdquuwVkiR%2Bxkj9%2BuFqQlwkIaZaDV9%2Bhq%2BgJ27SapRjA%3D%3D",
      },
    }
  );

  return response;
};
