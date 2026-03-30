import { memo } from "react";
import { TrackerEligibilityBadgeView } from "@/experiences/tracker/views";

type TrackerAccountsDetailTankStatusViewProps = {
  state?: "eligible" | "notEligible";
};

export const TrackerAccountsDetailTankStatusView = memo(
  ({ state = "eligible" }: TrackerAccountsDetailTankStatusViewProps) => {
    return <TrackerEligibilityBadgeView status={state} />;
  },
);

TrackerAccountsDetailTankStatusView.displayName =
  "TrackerAccountsDetailTankStatusView";
