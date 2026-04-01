import { memo } from "react";
import { TrackerPurchaseRowView } from "@/experiences/tracker/views";

type TrackerAccountsDetailPurchaseRowViewProps = {
  id?: string;
  type?: "regular" | "tank";
  productName?: string;
  date?: string;
  amount?: number;
};

export const TrackerAccountsDetailPurchaseRowView = memo(
  ({ id, ...props }: TrackerAccountsDetailPurchaseRowViewProps) => {
    return (
      <TrackerPurchaseRowView
        {...props}
        testID={id ? `purchase-row-${id}` : undefined}
      />
    );
  },
);

TrackerAccountsDetailPurchaseRowView.displayName =
  "TrackerAccountsDetailPurchaseRowView";
