import type { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: "./apps/storybook/storybook-static",
  },
  generateOnly: false,
  failOnDifference: true,
};
