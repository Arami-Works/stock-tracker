import { memo } from "react";
import { TrackerPurchaseRowView } from "@/experiences/tracker/views";

type TrackerAccountsDetailPurchaseRowViewProps = {
  type?: "regular" | "tank";
  productName?: string;
  date?: string;
  amount?: number;
};

export const TrackerAccountsDetailPurchaseRowView = memo(
  (props: TrackerAccountsDetailPurchaseRowViewProps) => {
    return <TrackerPurchaseRowView {...props} />;
  },
);

TrackerAccountsDetailPurchaseRowView.displayName =
  "TrackerAccountsDetailPurchaseRowView";
