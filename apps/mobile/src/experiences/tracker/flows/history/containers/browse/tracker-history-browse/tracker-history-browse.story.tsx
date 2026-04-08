import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { OverviewLayout } from "@aramiworks/ui";
import { TrackerHistoryBrowseViews } from "../views/tracker-history-browse.views";

const meta: Meta<typeof TrackerHistoryBrowseViews> = {
  title: "tracker/history/browse",
  component: TrackerHistoryBrowseViews,
  parameters: {
    layout: "fullscreen",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/MSJ05A0BXBDTO0powtUMg3?node-id=269-5",
    },
  },
  argTypes: {
    screenState: {
      control: { type: "select" },
      options: ["default", "empty", "loading", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerHistoryBrowseViews>;

export const Default: Story = { args: { screenState: "default" } };
export const Empty: Story = { args: { screenState: "empty" } };
export const Loading: Story = { args: { screenState: "loading" } };
export const Error: Story = { args: { screenState: "error" } };

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-history-browse"
      variants={[
        {
          name: "default",
          render: () => <TrackerHistoryBrowseViews screenState="default" />,
        },
        {
          name: "empty",
          render: () => <TrackerHistoryBrowseViews screenState="empty" />,
        },
        {
          name: "loading",
          render: () => <TrackerHistoryBrowseViews screenState="loading" />,
        },
        {
          name: "error",
          render: () => <TrackerHistoryBrowseViews screenState="error" />,
        },
      ]}
    />
  ),
};
