import useSWR from "swr";
import PublicFetcher from "@/utils/PublicFetcher";

export const useHoliday = (params: any) => {
  const { data, error, isLoading } = useSWR(
    "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?",
    (url) => PublicFetcher(url, params)
  );

  return {
    Data: data.response.body.item,
    Error: error,
    isLoading: isLoading,
  };
};
