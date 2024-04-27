import axios from "axios";

export const useHoliday = async (params: any) => {
  const response = await axios.get(
    "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?",
    {
      headers: {
        Accept: "application/json",
      },
      params: params,
    }
  );

  const HolidayList = response.data.response.body.items;

  return HolidayList;
};
