import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerAccountsDetailSaHeaderView } from "./tracker-accounts-detail-saHeader.view";
import { FigmaDocLayout } from "@/shared/storybook/FigmaDocLayout";

const meta: Meta<typeof TrackerAccountsDetailSaHeaderView> = {
  title: "tracker/accounts/detail/saHeader.view",
  component: TrackerAccountsDetailSaHeaderView,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof TrackerAccountsDetailSaHeaderView>;

export const Default: Story = {};

export const FigmaMirror: Story = {
  render: () => (
    <FigmaDocLayout
      viewName="tracker-accounts-detail-saHeader.view"
      variants={[
        {
          name: "default",
          render: () => <TrackerAccountsDetailSaHeaderView />,
        },
      ]}
    />
  ),
};
