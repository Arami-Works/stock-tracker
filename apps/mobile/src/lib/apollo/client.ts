import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const ROUTER_URL =
  process.env.EXPO_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: ROUTER_URL }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
}
