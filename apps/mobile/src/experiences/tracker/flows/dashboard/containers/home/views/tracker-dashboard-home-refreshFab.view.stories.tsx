import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerDashboardHomeRefreshFabView } from "./tracker-dashboard-home-refreshFab.view";
import { FigmaDocLayout } from "@/shared/storybook/FigmaDocLayout";

const meta: Meta<typeof TrackerDashboardHomeRefreshFabView> = {
  title: "tracker/dashboard/home/refreshFab.view",
  component: TrackerDashboardHomeRefreshFabView,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof TrackerDashboardHomeRefreshFabView>;

export const Default: Story = { args: {} };

export const FigmaMirror: Story = {
  render: () => (
    <FigmaDocLayout
      viewName="tracker-dashboard-home-refreshFab.view"
      variants={[
        {
          name: "default",
          render: () => <TrackerDashboardHomeRefreshFabView />,
        },
      ]}
    />
  ),
};
