import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { AppProps } from "next/app";

let apolloClient: ApolloClient<NormalizedCacheObject>;
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // true이면 server 환경
    link: new HttpLink({
      uri: "https://laoh.site/",
      credentials: "include", //쿠키를 포함한 요청
    }),
    cache: new InMemoryCache(), //Cache 저장소
  });
};

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null
) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  //아폴로 객체가 존재하지 않는다면 새로운 객체 생성

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (pageProps: AppProps["pageProps"]) => {
  const initialState = pageProps?.[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"]
) => {
  if (pageProps?.props)
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
};
