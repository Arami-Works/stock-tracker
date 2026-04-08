import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerAccountsDetailErrorStateView } from "../tracker-accounts-detail-errorState.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerAccountsDetailErrorStateView> = {
  title: "tracker/accounts/detail/errorState.view",
  component: TrackerAccountsDetailErrorStateView,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof TrackerAccountsDetailErrorStateView>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-accounts-detail-errorState.view"
      variants={[
        {
          name: "default",
          render: () => <TrackerAccountsDetailErrorStateView />,
        },
      ]}
    />
  ),
};
