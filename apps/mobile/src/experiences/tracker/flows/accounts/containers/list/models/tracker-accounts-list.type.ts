export type TrackerAccountsListScreenState =
  | "default"
  | "empty"
  | "loading"
  | "error";

export type SaAccountListItem = {
  id: string;
  name: string;
  initial: string;
  boutique: string;
  totalSpend: number;
  state: "eligible" | "notEligible" | "noPurchases";
};

export type TrackerAccountsListControllersOutput = {
  screenState: TrackerAccountsListScreenState;
  accounts: SaAccountListItem[];
};
