import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerHistoryBrowseErrorStateView } from "../tracker-history-browse-errorState.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerHistoryBrowseErrorStateView> = {
  title: "tracker/history/browse/errorState.view",
  component: TrackerHistoryBrowseErrorStateView,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/MSJ05A0BXBDTO0powtUMg3?node-id=241-14",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerHistoryBrowseErrorStateView>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-history-browse-errorState.view"
      variants={[
        {
          name: "default",
          render: () => <TrackerHistoryBrowseErrorStateView />,
        },
      ]}
    />
  ),
};
