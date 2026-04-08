import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerHistoryBrowsePurchaseRowView } from "../tracker-history-browse-purchaseRow.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerHistoryBrowsePurchaseRowView> = {
  title: "tracker/history/browse/purchaseRow.view",
  component: TrackerHistoryBrowsePurchaseRowView,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/MSJ05A0BXBDTO0powtUMg3?node-id=241-12",
    },
  },
  argTypes: {
    type: { control: { type: "select" }, options: ["regular", "tank"] },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerHistoryBrowsePurchaseRowView>;

export const Regular: Story = {
  args: {
    type: "regular",
    productName: "트리니티 링",
    date: "2024.03.15",
    amount: 3200000,
  },
};

export const Tank: Story = {
  args: {
    type: "tank",
    productName: "트리니티 링",
    date: "2024.03.15",
    amount: 3200000,
  },
};

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-history-browse-purchaseRow.view"
      variants={[
        {
          name: "regular",
          render: () => (
            <TrackerHistoryBrowsePurchaseRowView
              type="regular"
              productName="트리니티 링"
              date="2024.03.15"
              amount={3200000}
            />
          ),
        },
        {
          name: "tank",
          render: () => (
            <TrackerHistoryBrowsePurchaseRowView
              type="tank"
              productName="트리니티 링"
              date="2024.03.15"
              amount={3200000}
            />
          ),
        },
      ]}
    />
  ),
};
