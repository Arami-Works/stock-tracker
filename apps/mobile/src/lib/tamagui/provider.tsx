import { TamaguiProvider } from "tamagui";
import { config } from "@aramiworks/ui";
import type { PropsWithChildren } from "react";

export function AppTamaguiProvider({ children }: PropsWithChildren) {
  return <TamaguiProvider config={config}>{children}</TamaguiProvider>;
}
