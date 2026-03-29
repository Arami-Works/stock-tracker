import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrackerDashboardHomeSpendSummaryCardView } from "./tracker-dashboard-home-spendSummaryCard.view";
import { FigmaDocLayout } from "@/shared/storybook/FigmaDocLayout";

const meta: Meta<typeof TrackerDashboardHomeSpendSummaryCardView> = {
  title: "tracker/dashboard/home/spendSummaryCard.view",
  component: TrackerDashboardHomeSpendSummaryCardView,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    state: {
      control: { type: "select" },
      options: ["populated", "zero", "loading"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TrackerDashboardHomeSpendSummaryCardView>;

// Individual variant stories
export const Populated: Story = {
  args: { state: "populated", totalSpend: 12450000, goalAmount: 30000000 },
};

export const Zero: Story = {
  args: { state: "zero", totalSpend: 0, goalAmount: 30000000 },
};

export const Loading: Story = {
  args: { state: "loading" },
};

// Figma mirror layout — shows all variants side by side like the Figma file
export const FigmaMirror: Story = {
  render: () => (
    <FigmaDocLayout
      viewName="tracker-dashboard-home-spendSummaryCard.view"
      propertyName="State"
      variants={[
        {
          name: "populated",
          render: () => (
            <TrackerDashboardHomeSpendSummaryCardView
              state="populated"
              totalSpend={12450000}
              goalAmount={30000000}
            />
          ),
        },
        {
          name: "zero",
          render: () => (
            <TrackerDashboardHomeSpendSummaryCardView
              state="zero"
              totalSpend={0}
              goalAmount={30000000}
            />
          ),
        },
        {
          name: "loading",
          render: () => (
            <TrackerDashboardHomeSpendSummaryCardView state="loading" />
          ),
        },
      ]}
    />
  ),
};

// Pixel-perfect comparison story — renders at exact Figma component set dimensions (786×148)
export const PixelMatch: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div
      style={{
        width: 786,
        height: 148,
        position: "relative",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", left: 24, top: 24 }}>
        <TrackerDashboardHomeSpendSummaryCardView
          state="populated"
          totalSpend={12450000}
          goalAmount={30000000}
        />
      </div>
      <div style={{ position: "absolute", left: 278, top: 24 }}>
        <TrackerDashboardHomeSpendSummaryCardView
          state="zero"
          totalSpend={0}
          goalAmount={30000000}
        />
      </div>
      <div style={{ position: "absolute", left: 532, top: 24 }}>
        <TrackerDashboardHomeSpendSummaryCardView state="loading" />
      </div>
    </div>
  ),
};
