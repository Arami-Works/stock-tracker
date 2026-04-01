import {
  memo,
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useSuspenseQuery } from "@apollo/client/react";
import { ACCOUNT_QUERY } from "@/lib/graphql/queries";
import type { TrackerAccountsDetailControllersOutput } from "../models/tracker-accounts-detail.type";

const GOAL_AMOUNT = 30000000;

const ControllersContext =
  createContext<TrackerAccountsDetailControllersOutput | null>(null);

interface TrackerAccountsDetailControllersProps {
  children: ReactNode;
  accountId: string;
}

export const TrackerAccountsDetailControllers =
  memo<TrackerAccountsDetailControllersProps>(({ children, accountId }) => {
    const { data } = useSuspenseQuery(ACCOUNT_QUERY, {
      variables: { id: accountId },
    });

    const account = data?.account;

    const totalSpend = useMemo(() => {
      if (!account?.purchases) return 0;
      return account.purchases.reduce((sum, p) => sum + p.amount, 0);
    }, [account?.purchases]);

    const purchases = useMemo(() => {
      if (!account?.purchases) return [];
      return account.purchases.map((p) => ({
        id: p.id,
        productName: p.itemName,
        date: new Date(p.purchaseDate).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        amount: p.amount,
        type: p.amount >= 5000000 ? ("tank" as const) : ("regular" as const),
      }));
    }, [account?.purchases]);

    const tankState =
      totalSpend === 0
        ? ("noPurchases" as const)
        : totalSpend >= GOAL_AMOUNT
          ? ("eligible" as const)
          : ("notEligible" as const);

    const value: TrackerAccountsDetailControllersOutput = {
      screenState: "default",
      name: account?.saName ?? account?.storeName ?? "",
      initial: (account?.saName ?? account?.storeName ?? "").charAt(0),
      boutique: account?.storeName ?? "",
      totalSpend,
      tankState,
      purchases,
    };

    return (
      <ControllersContext.Provider value={value}>
        {children}
      </ControllersContext.Provider>
    );
  });

TrackerAccountsDetailControllers.displayName =
  "TrackerAccountsDetailControllers";

export const useTrackerAccountsDetailControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error(
      "useTrackerAccountsDetailControllers must be used within TrackerAccountsDetailControllers",
    );
  }
  return context;
};
