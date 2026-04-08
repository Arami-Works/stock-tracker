import "../src/lib/i18n";
import { Slot } from "expo-router";
import { AuthModels } from "../src/experiences/auth/models/auth.models";
import { AppApolloProvider } from "../src/lib/apollo/provider";
import { AppTamaguiProvider } from "../src/lib/tamagui/provider";

export default function RootLayout() {
  return (
    <AppTamaguiProvider>
      <AuthModels>
        <AppApolloProvider>
          <Slot />
        </AppApolloProvider>
      </AuthModels>
    </AppTamaguiProvider>
  );
}
