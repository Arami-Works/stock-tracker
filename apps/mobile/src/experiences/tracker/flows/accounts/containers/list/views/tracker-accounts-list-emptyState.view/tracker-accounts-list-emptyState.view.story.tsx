import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerAccountsListEmptyStateView } from "../tracker-accounts-list-emptyState.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerAccountsListEmptyStateView> = {
  title: "tracker/accounts/list/emptyState.view",
  component: TrackerAccountsListEmptyStateView,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof TrackerAccountsListEmptyStateView>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-accounts-list-emptyState.view"
      variants={[
        {
          name: "default",
          render: () => <TrackerAccountsListEmptyStateView />,
        },
      ]}
    />
  ),
};
