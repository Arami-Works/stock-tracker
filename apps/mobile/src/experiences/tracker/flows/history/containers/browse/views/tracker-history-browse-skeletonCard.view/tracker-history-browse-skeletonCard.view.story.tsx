import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerHistoryBrowseSkeletonCardView } from "../tracker-history-browse-skeletonCard.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerHistoryBrowseSkeletonCardView> = {
  title: "tracker/history/browse/skeletonCard.view",
  component: TrackerHistoryBrowseSkeletonCardView,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/MSJ05A0BXBDTO0powtUMg3?node-id=241-15",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerHistoryBrowseSkeletonCardView>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-history-browse-skeletonCard.view"
      variants={[
        {
          name: "default",
          render: () => <TrackerHistoryBrowseSkeletonCardView />,
        },
      ]}
    />
  ),
};
