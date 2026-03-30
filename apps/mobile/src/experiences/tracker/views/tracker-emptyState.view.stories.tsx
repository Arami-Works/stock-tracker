import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerEmptyStateView } from "./tracker-emptyState.view";
import { FigmaDocLayout } from "@/shared/storybook/FigmaDocLayout";

const meta: Meta<typeof TrackerEmptyStateView> = {
  title: "tracker/shared/emptyState.view",
  component: TrackerEmptyStateView,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof TrackerEmptyStateView>;

export const Default: Story = {
  args: {
    title: "아직 구매 내역이 없습니다",
    subtitle: "SA를 추가하고 구매를 기록해보세요",
    ctaLabel: "SA 추가하기",
    width: 340,
    height: 240,
  },
};

export const FigmaMirror: Story = {
  render: () => (
    <FigmaDocLayout
      viewName="tracker-emptyState.view"
      variants={[{ name: "default", render: () => <TrackerEmptyStateView /> }]}
    />
  ),
};
