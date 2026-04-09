import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TrackerErrorStateView } from "@/experiences/tracker/views";

export const TrackerAccountsListErrorStateView = memo(() => {
  const { t } = useTranslation("tracker");
  return (
    <TrackerErrorStateView
      title={t("accounts.list.errorState.title")}
      subtitle={t("accounts.list.errorState.subtitle")}
      retryLabel={t("accounts.list.errorState.retry")}
      width={310}
      height={230}
      testID="accounts-list-error-state"
    />
  );
});

TrackerAccountsListErrorStateView.displayName =
  "TrackerAccountsListErrorStateView";
