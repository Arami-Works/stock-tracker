import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TrackerErrorStateView } from "@/experiences/tracker/views";

export const TrackerDashboardHomeErrorStateView = memo(() => {
  const { t } = useTranslation("tracker");
  return (
    <TrackerErrorStateView
      testID="dashboard-error-state"
      title={t("dashboard.errorState.title")}
      subtitle={t("dashboard.errorState.subtitle")}
      retryLabel={t("dashboard.errorState.retry")}
      width={340}
      height={240}
    />
  );
});

TrackerDashboardHomeErrorStateView.displayName =
  "TrackerDashboardHomeErrorStateView";
