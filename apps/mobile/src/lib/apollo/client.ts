import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { supabase } from "../supabase";

const ROUTER_URL =
  process.env.EXPO_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

const httpLink = new HttpLink({ uri: ROUTER_URL });

const authLink = setContext(async (_, { headers }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    headers: {
      ...headers,
      ...(session?.access_token && {
        authorization: `Bearer ${session.access_token}`,
      }),
    },
  };
});

export function createApolloClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
}
