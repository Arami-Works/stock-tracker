import {
  memo,
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useSuspenseQuery, useMutation } from "@apollo/client/react";
import {
  PURCHASES_QUERY,
  DASHBOARD_QUERY,
  ACCOUNTS_QUERY,
} from "@/lib/graphql/queries";
import { DeletePurchaseDocument } from "@/lib/graphql/generated/graphql";
import { useTrackerHistoryBrowseLifecycle } from "../lifecycles";
import type {
  TrackerHistoryBrowseControllersOutput,
  TrackerHistoryBrowseScreenState,
  DateFilter,
} from "../models/tracker-history-browse.type";

const ControllersContext =
  createContext<TrackerHistoryBrowseControllersOutput | null>(null);

interface TrackerHistoryBrowseControllersProps {
  children: ReactNode;
}

function filterByDate(purchaseDate: string, filter: DateFilter): boolean {
  if (filter === "all") return true;
  const date = new Date(purchaseDate);
  const now = new Date();
  switch (filter) {
    case "thisMonth":
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    case "threeMonths": {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return date >= threeMonthsAgo;
    }
    case "thisYear":
      return date.getFullYear() === now.getFullYear();
  }
}

export const TrackerHistoryBrowseControllers =
  memo<TrackerHistoryBrowseControllersProps>(({ children }) => {
    const { data, refetch } = useSuspenseQuery(PURCHASES_QUERY);
    useTrackerHistoryBrowseLifecycle(refetch);

    const [deletePurchaseMutation] = useMutation(DeletePurchaseDocument, {
      refetchQueries: [
        { query: PURCHASES_QUERY },
        { query: DASHBOARD_QUERY },
        { query: ACCOUNTS_QUERY },
      ],
    });

    const onDeletePurchase = useCallback(
      async (id: string) => {
        await deletePurchaseMutation({ variables: { id } });
      },
      [deletePurchaseMutation],
    );

    const [selectedFilter, setSelectedFilter] = useState<DateFilter>("all");

    const purchases = useMemo(() => {
      if (!data?.purchases) return [];
      return data.purchases
        .filter((p) => filterByDate(p.purchaseDate, selectedFilter))
        .map((p) => ({
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
    }, [data?.purchases, selectedFilter]);

    const screenState: TrackerHistoryBrowseScreenState = !purchases.length
      ? "empty"
      : "default";

    const onFilterSelect = useCallback((filter: DateFilter) => {
      setSelectedFilter(filter);
    }, []);

    const value: TrackerHistoryBrowseControllersOutput = {
      screenState,
      purchases,
      selectedFilter,
      onFilterSelect,
      onDeletePurchase,
    };

    return (
      <ControllersContext.Provider value={value}>
        {children}
      </ControllersContext.Provider>
    );
  });

TrackerHistoryBrowseControllers.displayName = "TrackerHistoryBrowseControllers";

export const useTrackerHistoryBrowseControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error(
      "useTrackerHistoryBrowseControllers must be used within TrackerHistoryBrowseControllers",
    );
  }
  return context;
};
