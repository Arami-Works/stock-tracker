import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerHistoryBrowseEmptyStateView } from "../tracker-history-browse-emptyState.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerHistoryBrowseEmptyStateView> = {
  title: "tracker/history/browse/emptyState.view",
  component: TrackerHistoryBrowseEmptyStateView,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof TrackerHistoryBrowseEmptyStateView>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-history-browse-emptyState.view"
      variants={[
        {
          name: "default",
          render: () => <TrackerHistoryBrowseEmptyStateView />,
        },
      ]}
    />
  ),
};
