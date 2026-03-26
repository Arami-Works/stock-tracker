import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
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
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
  updates: {
    url: 'https://u.expo.dev/stock-tracker',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
});
