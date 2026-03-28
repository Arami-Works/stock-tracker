import type { Meta, StoryObj } from '@storybook/react';
import { TrackerDashboardHomeViews } from './tracker-dashboard-home.views';

const meta: Meta<typeof TrackerDashboardHomeViews> = {
  title: 'Tracker/Dashboard/Home',
  component: TrackerDashboardHomeViews,
};

export default meta;

type Story = StoryObj<typeof TrackerDashboardHomeViews>;

export const Default: Story = {};
