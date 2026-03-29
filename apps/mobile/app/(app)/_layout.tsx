import { Tabs } from "expo-router";

export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="tracker/dashboard" options={{ title: "대시보드" }} />
      <Tabs.Screen name="tracker/accounts" options={{ title: "계좌" }} />
      <Tabs.Screen name="tracker/history" options={{ title: "히스토리" }} />
    </Tabs>
  );
}
