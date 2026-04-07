import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { OverviewLayout } from "@aramiworks/ui";
import { TrackerAccountsListViews } from "../tracker-accounts-list.views";

const meta: Meta<typeof TrackerAccountsListViews> = {
  title: "tracker/accounts/list",
  component: TrackerAccountsListViews,
  parameters: { layout: "fullscreen" },
  argTypes: {
    screenState: {
      control: { type: "select" },
      options: ["default", "empty", "loading", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TrackerAccountsListViews>;

export const Default: Story = { args: { screenState: "default" } };
export const Empty: Story = { args: { screenState: "empty" } };
export const Loading: Story = { args: { screenState: "loading" } };
export const Error: Story = { args: { screenState: "error" } };

export const Overview: Story = {
  render: () => (
    <OverviewLayout
      viewName="tracker-accounts-list"
      variants={[
        { name: "default", render: () => <TrackerAccountsListViews screenState="default" /> },
        { name: "empty", render: () => <TrackerAccountsListViews screenState="empty" /> },
        { name: "loading", render: () => <TrackerAccountsListViews screenState="loading" /> },
        { name: "error", render: () => <TrackerAccountsListViews screenState="error" /> },
      ]}
    />
  ),
};
