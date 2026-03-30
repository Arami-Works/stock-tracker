import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: "arami-works",
  name: "Stock Tracker",
  slug: "stock-tracker",
  version: "0.0.1",
  orientation: "portrait",
  scheme: "stock-tracker",
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.cheunjm.stocktracker",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#FF2D55",
    },
    package: "com.cheunjm.stocktracker",
  },
  web: {
    bundler: "metro",
    output: "single",
  },
  plugins: ["expo-router", "expo-updates"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "73ca08db-3807-4b8a-9aff-4058cd066b22",
    },
  },
  updates: {
    url: "https://u.expo.dev/73ca08db-3807-4b8a-9aff-4058cd066b22",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
});
