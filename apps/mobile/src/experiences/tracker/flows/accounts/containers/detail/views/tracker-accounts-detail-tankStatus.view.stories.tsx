import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerAccountsDetailTankStatusView } from "./tracker-accounts-detail-tankStatus.view";
import { FigmaDocLayout } from "@/shared/storybook/FigmaDocLayout";

const meta: Meta<typeof TrackerAccountsDetailTankStatusView> = {
  title: "tracker/accounts/detail/tankStatus.view",
  component: TrackerAccountsDetailTankStatusView,
  parameters: { layout: "centered" },
  argTypes: {
    state: {
      control: { type: "select" },
      options: ["eligible", "notEligible"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerAccountsDetailTankStatusView>;

export const Eligible: Story = { args: { state: "eligible" } };
export const NotEligible: Story = { args: { state: "notEligible" } };

export const FigmaMirror: Story = {
  render: () => (
    <FigmaDocLayout
      viewName="tracker-accounts-detail-tankStatus.view"
      variants={[
        {
          name: "eligible",
          render: () => (
            <TrackerAccountsDetailTankStatusView state="eligible" />
          ),
        },
        {
          name: "notEligible",
          render: () => (
            <TrackerAccountsDetailTankStatusView state="notEligible" />
          ),
        },
      ]}
    />
  ),
};
