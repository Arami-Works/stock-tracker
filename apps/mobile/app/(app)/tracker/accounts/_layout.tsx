import { Stack } from "expo-router";
import { useTrackerAccountsLifecycle } from "@/experiences/tracker/flows/accounts/lifecycles";

export default function TrackerAccountsLayout() {
  useTrackerAccountsLifecycle();
  return <Stack screenOptions={{ headerShown: false }} />;
}
