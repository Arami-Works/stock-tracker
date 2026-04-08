import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TrackerEmptyStateView } from "@/experiences/tracker/views";

export const TrackerDashboardHomeEmptyStateView = memo(() => {
  const { t } = useTranslation("tracker");
  return (
    <TrackerEmptyStateView
      testID="dashboard-empty-state"
      title={t("dashboard.emptyState.title")}
      subtitle={t("dashboard.emptyState.subtitle")}
      ctaLabel={t("dashboard.emptyState.cta")}
      width={340}
      height={240}
    />
  );
});

TrackerDashboardHomeEmptyStateView.displayName =
  "TrackerDashboardHomeEmptyStateView";
