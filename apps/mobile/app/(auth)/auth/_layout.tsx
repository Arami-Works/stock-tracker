import { Stack } from "expo-router";
import { useAuthLifecycle } from "@/experiences/auth/lifecycles";

export default function AuthExperienceLayout() {
  useAuthLifecycle();
  return <Stack screenOptions={{ headerShown: false }} />;
}
