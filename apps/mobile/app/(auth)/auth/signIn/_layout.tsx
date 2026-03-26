import { Stack } from 'expo-router';
import { useAuthSignInLifecycle } from '@/experiences/auth/flows/signIn/lifecycles';

export default function AuthSignInLayout() {
  useAuthSignInLifecycle();
  return <Stack screenOptions={{ headerShown: false }} />;
}
