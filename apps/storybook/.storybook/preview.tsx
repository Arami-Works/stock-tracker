import type { Preview } from "@storybook/react";
import React from "react";
import { UiProvider } from "@aramiworks/ui";

const preview: Preview = {
  decorators: [
    (Story) => (
      <UiProvider>
        <Story />
      </UiProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
