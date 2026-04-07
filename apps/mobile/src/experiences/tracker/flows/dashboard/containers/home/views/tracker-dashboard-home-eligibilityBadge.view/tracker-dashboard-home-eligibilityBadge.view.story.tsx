import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerDashboardHomeEligibilityBadgeView } from "../tracker-dashboard-home-eligibilityBadge.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerDashboardHomeEligibilityBadgeView> = {
  title: "tracker/dashboard/home/eligibilityBadge.view",
  component: TrackerDashboardHomeEligibilityBadgeView,
  parameters: { layout: "centered" },
  argTypes: {
    state: {
      control: { type: "select" },
      options: ["eligible", "notEligible"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerDashboardHomeEligibilityBadgeView>;

export const Eligible: Story = { args: { state: "eligible" } };
export const NotEligible: Story = { args: { state: "notEligible" } };

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-dashboard-home-eligibilityBadge.view"
      variants={[
        {
          name: "eligible",
          render: () => (
            <TrackerDashboardHomeEligibilityBadgeView state="eligible" />
          ),
        },
        {
          name: "notEligible",
          render: () => (
            <TrackerDashboardHomeEligibilityBadgeView state="notEligible" />
          ),
        },
      ]}
    />
  ),
};
