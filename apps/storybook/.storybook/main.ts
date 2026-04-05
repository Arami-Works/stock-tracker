import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../../mobile/src/**/*.stories.@(ts|tsx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: [],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native": "react-native-web",
      "@": path.resolve(__dirname, "../../mobile/src"),
      "@expo/vector-icons": path.resolve(
        __dirname,
        "./mocks/expo-vector-icons.js",
      ),
      "@expo/vector-icons/MaterialIcons": path.resolve(
        __dirname,
        "./mocks/expo-vector-icons.js",
      ),
    };
    return config;
  },
};

export default config;
