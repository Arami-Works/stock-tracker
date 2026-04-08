import { memo } from "react";
import { useTranslation } from "react-i18next";
import { TrackerEmptyStateView } from "@/experiences/tracker/views";

export const TrackerAccountsListEmptyStateView = memo(() => {
  const { t } = useTranslation("tracker");
  return (
    <TrackerEmptyStateView
      title={t("accounts.list.emptyState.title")}
      subtitle={t("accounts.list.emptyState.subtitle")}
      ctaLabel={t("accounts.list.emptyState.cta")}
      width={310}
      height={230}
      testID="accounts-list-empty-state"
    />
  );
});

TrackerAccountsListEmptyStateView.displayName =
  "TrackerAccountsListEmptyStateView";
