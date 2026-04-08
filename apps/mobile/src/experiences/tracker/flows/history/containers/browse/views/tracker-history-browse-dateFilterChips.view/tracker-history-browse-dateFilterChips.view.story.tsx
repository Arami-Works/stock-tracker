import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerHistoryBrowseDateFilterChipsView } from "../tracker-history-browse-dateFilterChips.view";
import { OverviewLayout } from "@aramiworks/ui";

const meta: Meta<typeof TrackerHistoryBrowseDateFilterChipsView> = {
  title: "tracker/history/browse/dateFilterChips.view",
  component: TrackerHistoryBrowseDateFilterChipsView,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/MSJ05A0BXBDTO0powtUMg3?node-id=241-11",
    },
  },
  argTypes: {
    selected: {
      control: { type: "select" },
      options: ["thisMonth", "threeMonths", "thisYear", "all"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerHistoryBrowseDateFilterChipsView>;

export const ThisMonth: Story = { args: { selected: "thisMonth" } };
export const ThreeMonths: Story = { args: { selected: "threeMonths" } };
export const ThisYear: Story = { args: { selected: "thisYear" } };
export const All: Story = { args: { selected: "all" } };

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-history-browse-dateFilterChips.view"
      variants={[
        {
          name: "thisMonth",
          render: () => (
            <TrackerHistoryBrowseDateFilterChipsView selected="thisMonth" />
          ),
        },
        {
          name: "threeMonths",
          render: () => (
            <TrackerHistoryBrowseDateFilterChipsView selected="threeMonths" />
          ),
        },
        {
          name: "thisYear",
          render: () => (
            <TrackerHistoryBrowseDateFilterChipsView selected="thisYear" />
          ),
        },
        {
          name: "all",
          render: () => (
            <TrackerHistoryBrowseDateFilterChipsView selected="all" />
          ),
        },
      ]}
    />
  ),
};
