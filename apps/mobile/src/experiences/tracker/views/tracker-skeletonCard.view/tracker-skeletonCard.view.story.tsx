import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerSkeletonCardView } from "../tracker-skeletonCard.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerSkeletonCardView> = {
  title: "tracker/shared/skeletonCard.view",
  component: TrackerSkeletonCardView,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof TrackerSkeletonCardView>;

export const Default: Story = { args: { width: 310, height: 100 } };

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-skeletonCard.view"
      variants={[
        { name: "default", render: () => <TrackerSkeletonCardView /> },
      ]}
    />
  ),
};
