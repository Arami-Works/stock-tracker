import { Slot, Redirect } from 'expo-router';

export default function RootLayout() {
  // TODO: Replace with actual auth check
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Redirect href="/auth/signIn/gmailOauth" />;
  }

  return <Slot />;
}
