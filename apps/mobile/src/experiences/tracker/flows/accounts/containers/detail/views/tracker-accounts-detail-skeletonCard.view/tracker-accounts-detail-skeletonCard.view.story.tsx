import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerAccountsDetailSkeletonCardView } from "../tracker-accounts-detail-skeletonCard.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerAccountsDetailSkeletonCardView> = {
  title: "tracker/accounts/detail/skeletonCard.view",
  component: TrackerAccountsDetailSkeletonCardView,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof TrackerAccountsDetailSkeletonCardView>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-accounts-detail-skeletonCard.view"
      variants={[
        {
          name: "default",
          render: () => <TrackerAccountsDetailSkeletonCardView />,
        },
      ]}
    />
  ),
};
