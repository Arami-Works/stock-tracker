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
      "@/": path.resolve(__dirname, "../../mobile/src/"),
    };
    return config;
  },
};

export default config;
