import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'cheunjm',
  name: 'Stock Tracker',
  slug: 'stock-tracker',
  version: '0.0.1',
  orientation: 'portrait',
  scheme: 'stock-tracker',
  newArchEnabled: true,
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.cheunjm.stocktracker',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#FF2D55',
    },
    package: 'com.cheunjm.stocktracker',
  },
  web: {
    bundler: 'metro',
    output: 'single',
  },
  plugins: ['expo-router', 'expo-updates'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: '215a3343-0d48-4262-9f33-2ece58459fc7',
    },
  },
  updates: {
    url: 'https://u.expo.dev/215a3343-0d48-4262-9f33-2ece58459fc7',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
});
