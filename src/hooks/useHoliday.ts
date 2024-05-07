import useSWR from "swr";
import PublicFetcher from "@/utils/PublicFetcher";

export const useHoliday = (params: any) => {
  const { data, error, isLoading } = useSWR(
    "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?",
    (url) => PublicFetcher(url, params),
    { refreshInterval: 1000 }
  );

  const HolidayList =
    data.response.body.totalCount === 1
      ? [data.response.body.items.item]
      : data.response.body.items.item;

  return {
    Data: data.response.body.totalCount !== 0 ? HolidayList : [],
    Error: error,
    isLoading: isLoading,
  };
};
