import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerEligibilityBadgeView } from "./tracker-eligibilityBadge.view";
import { FigmaDocLayout } from "@/shared/storybook/FigmaDocLayout";

const meta: Meta<typeof TrackerEligibilityBadgeView> = {
  title: "tracker/shared/eligibilityBadge.view",
  component: TrackerEligibilityBadgeView,
  parameters: { layout: "centered" },
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["eligible", "notEligible"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerEligibilityBadgeView>;

export const Eligible: Story = { args: { status: "eligible" } };
export const NotEligible: Story = { args: { status: "notEligible" } };

export const FigmaMirror: Story = {
  render: () => (
    <FigmaDocLayout
      viewName="tracker-eligibilityBadge.view"
      variants={[
        {
          name: "eligible",
          render: () => <TrackerEligibilityBadgeView status="eligible" />,
        },
        {
          name: "notEligible",
          render: () => <TrackerEligibilityBadgeView status="notEligible" />,
        },
      ]}
    />
  ),
};
