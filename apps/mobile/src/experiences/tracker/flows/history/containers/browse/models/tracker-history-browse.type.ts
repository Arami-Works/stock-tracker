export type TrackerHistoryBrowseScreenState =
  | "default"
  | "empty"
  | "loading"
  | "error";

export type DateFilter = "thisMonth" | "threeMonths" | "thisYear" | "all";

export type PurchaseHistoryItem = {
  id: string;
  productName: string;
  date: string;
  amount: number;
  type: "regular" | "tank";
};

export type TrackerHistoryBrowseControllersOutput = {
  screenState: TrackerHistoryBrowseScreenState;
  purchases: PurchaseHistoryItem[];
  selectedFilter: DateFilter;
  onFilterSelect: (filter: DateFilter) => void;
};
