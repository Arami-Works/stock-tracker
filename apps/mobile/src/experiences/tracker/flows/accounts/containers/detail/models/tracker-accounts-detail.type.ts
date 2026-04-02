export type TrackerAccountsDetailScreenState = "default" | "loading" | "error";

export type PurchaseItem = {
  id: string;
  productName: string;
  date: string;
  amount: number;
  type: "regular" | "tank";
};

export type TrackerAccountsDetailControllersOutput = {
  screenState: TrackerAccountsDetailScreenState;
  name: string;
  initial: string;
  boutique: string;
  totalSpend: number;
  tankState: "eligible" | "notEligible" | "noPurchases";
  purchases: PurchaseItem[];
  onBack: () => void;
};
