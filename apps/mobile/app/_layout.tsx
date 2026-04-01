import { Slot } from "expo-router";
import { AppApolloProvider } from "../src/lib/apollo/provider";

export default function RootLayout() {
  return (
    <AppApolloProvider>
      <Slot />
    </AppApolloProvider>
  );
}
