import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TrackerErrorStateView } from "@/experiences/tracker/views";

export const TrackerAccountsDetailErrorStateView = memo(() => {
  const { t } = useTranslation("tracker");
  return (
    <TrackerErrorStateView
      title={t("accounts.detail.errorState.title")}
      subtitle={t("accounts.detail.errorState.subtitle")}
      retryLabel={t("accounts.detail.errorState.retry")}
      width={310}
      height={230}
      testID="accounts-detail-error-state"
    />
  );
});

TrackerAccountsDetailErrorStateView.displayName =
  "TrackerAccountsDetailErrorStateView";
