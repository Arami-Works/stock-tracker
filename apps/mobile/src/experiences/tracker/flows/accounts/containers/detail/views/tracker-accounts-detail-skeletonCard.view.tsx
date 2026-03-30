import { memo } from "react";
import { TrackerSkeletonCardView } from "@/experiences/tracker/views";

export const TrackerAccountsDetailSkeletonCardView = memo(() => {
  return <TrackerSkeletonCardView width={310} height={100} />;
});

TrackerAccountsDetailSkeletonCardView.displayName =
  "TrackerAccountsDetailSkeletonCardView";
