import { Redirect } from "expo-router";

export default function Index() {
  // TODO: Replace with actual auth check
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Redirect href="/auth/signIn/gmailOauth" />;
  }

  return <Redirect href="/tracker/dashboard/home" />;
}
