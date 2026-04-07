import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerHistoryBrowseSkeletonCardView } from "../tracker-history-browse-skeletonCard.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerHistoryBrowseSkeletonCardView> = {
  title: "tracker/history/browse/skeletonCard.view",
  component: TrackerHistoryBrowseSkeletonCardView,
  parameters: { layout: "centered" },
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
