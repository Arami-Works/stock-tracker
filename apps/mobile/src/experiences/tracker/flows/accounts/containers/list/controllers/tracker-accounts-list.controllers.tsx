import {
  memo,
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useSuspenseQuery } from "@apollo/client/react";
import { ACCOUNTS_QUERY } from "@/lib/graphql/queries";
import type {
  TrackerAccountsListControllersOutput,
  TrackerAccountsListScreenState,
} from "../models/tracker-accounts-list.type";

const GOAL_AMOUNT = 30000000;

const ControllersContext =
  createContext<TrackerAccountsListControllersOutput | null>(null);

interface TrackerAccountsListControllersProps {
  children: ReactNode;
}

export const TrackerAccountsListControllers =
  memo<TrackerAccountsListControllersProps>(({ children }) => {
    const { data } = useSuspenseQuery(ACCOUNTS_QUERY);

    const screenState: TrackerAccountsListScreenState = !data?.accounts?.length
      ? "empty"
      : "default";

    const accounts = useMemo(() => {
      if (!data?.accounts) return [];
      return data.accounts.map((acc) => {
        const spend = acc.purchases.reduce((sum, p) => sum + p.amount, 0);
        return {
          id: acc.id,
          name: acc.saName ?? acc.storeName,
          initial: (acc.saName ?? acc.storeName).charAt(0),
          boutique: acc.storeName,
          totalSpend: spend,
          state:
            spend === 0
              ? ("noPurchases" as const)
              : spend >= GOAL_AMOUNT
                ? ("eligible" as const)
                : ("notEligible" as const),
        };
      });
    }, [data?.accounts]);

    const value: TrackerAccountsListControllersOutput = {
      screenState,
      accounts,
    };

    return (
      <ControllersContext.Provider value={value}>
        {children}
      </ControllersContext.Provider>
    );
  });

TrackerAccountsListControllers.displayName = "TrackerAccountsListControllers";

export const useTrackerAccountsListControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error(
      "useTrackerAccountsListControllers must be used within TrackerAccountsListControllers",
    );
  }
  return context;
};
