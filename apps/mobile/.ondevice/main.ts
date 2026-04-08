import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: ["../src/**/*.story.@(ts|tsx)"],
  addons: [],
};

export default main;
