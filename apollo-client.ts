import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "", // endpoint
  cache: new InMemoryCache(),
});

export default client;
