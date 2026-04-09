import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TrackerErrorStateView } from "@/experiences/tracker/views";

export const TrackerHistoryBrowseErrorStateView = memo(() => {
  const { t } = useTranslation("tracker");
  return (
    <TrackerErrorStateView
      testID="history-browse-error-state"
      title={t("history.browse.errorState.title")}
      subtitle={t("history.browse.errorState.subtitle")}
      retryLabel={t("history.browse.errorState.retry")}
      width={310}
      height={230}
    />
  );
});

TrackerHistoryBrowseErrorStateView.displayName =
  "TrackerHistoryBrowseErrorStateView";
