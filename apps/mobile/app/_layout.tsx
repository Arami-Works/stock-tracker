import { Slot } from "expo-router";
import { AuthModels } from "../src/experiences/auth/models/auth.models";
import { AppApolloProvider } from "../src/lib/apollo/provider";

export default function RootLayout() {
  return (
    <AuthModels>
      <AppApolloProvider>
        <Slot />
      </AppApolloProvider>
    </AuthModels>
  );
}
