import {
  memo,
  createContext,
  useContext,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "expo-router";
import { useSuspenseQuery, useMutation } from "@apollo/client/react";
import { ACCOUNTS_QUERY, DASHBOARD_QUERY } from "@/lib/graphql/queries";
import {
  CreateAccountDocument,
  DeleteAccountDocument,
} from "@/lib/graphql/generated/graphql";
import { useTrackerAccountsListLifecycle } from "../lifecycles";
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
    const router = useRouter();
    const { data, refetch } = useSuspenseQuery(ACCOUNTS_QUERY);
    useTrackerAccountsListLifecycle(refetch);

    const [createAccountMutation] = useMutation(CreateAccountDocument, {
      refetchQueries: [{ query: DASHBOARD_QUERY }, { query: ACCOUNTS_QUERY }],
    });
    const [deleteAccountMutation] = useMutation(DeleteAccountDocument, {
      refetchQueries: [{ query: DASHBOARD_QUERY }, { query: ACCOUNTS_QUERY }],
    });

    const onCreateAccount = useCallback(
      async (input: { storeName: string; saName?: string; notes?: string }) => {
        await createAccountMutation({ variables: { input } });
      },
      [createAccountMutation],
    );

    const onDeleteAccount = useCallback(
      async (id: string) => {
        await deleteAccountMutation({ variables: { id } });
      },
      [deleteAccountMutation],
    );

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

    const onSaPress = useCallback(
      (id: string) => {
        router.push(`/tracker/accounts/detail/${id}`);
      },
      [router],
    );

    const value: TrackerAccountsListControllersOutput = {
      screenState,
      accounts,
      onSaPress,
      onCreateAccount,
      onDeleteAccount,
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
