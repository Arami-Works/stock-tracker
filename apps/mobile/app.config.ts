import { ExpoConfig, ConfigContext } from "expo/config";

const ENV_SUFFIX: Record<string, string> = {
  develop: ".develop",
  stage: ".stage",
  master: "",
};

const ENV_NAME: Record<string, string> = {
  develop: " (Dev)",
  stage: " (Stage)",
  master: "",
};

const appEnv = process.env.APP_ENV ?? "develop";
const suffix = ENV_SUFFIX[appEnv] ?? ".develop";
const nameSuffix = ENV_NAME[appEnv] ?? " (Dev)";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: "arami-works",
  name: `Stock Tracker${nameSuffix}`,
  slug: "stock-tracker",
  version: "0.0.1",
  orientation: "portrait",
  scheme: `stock-tracker${suffix.replace(".", "-") || ""}`,
  ios: {
    supportsTablet: false,
    bundleIdentifier: `so.arami.stocktracker.app${suffix}`,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#FF2D55",
    },
    package: `so.arami.stocktracker.app${suffix}`,
  },
  web: {
    bundler: "metro",
    output: "single",
  },
  plugins: [
    "expo-router",
    "expo-updates",
    "expo-secure-store",
    "expo-web-browser",
  ],
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
