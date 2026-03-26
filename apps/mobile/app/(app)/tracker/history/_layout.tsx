import { Stack } from 'expo-router';
import { useTrackerHistoryLifecycle } from '@/experiences/tracker/flows/history/lifecycles';

export default function TrackerHistoryLayout() {
  useTrackerHistoryLifecycle();
  return <Stack screenOptions={{ headerShown: false }} />;
}
