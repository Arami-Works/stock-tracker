import { memo, useState, type ReactNode } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import type {
  TrackerAccountsListScreenState,
  SaAccountListItem,
} from "../models/tracker-accounts-list.type";
import { TrackerAccountsListSaListItemView } from "./tracker-accounts-list-saListItem.view";
import { TrackerAccountsListEmptyStateView } from "./tracker-accounts-list-emptyState.view";
import { TrackerAccountsListErrorStateView } from "./tracker-accounts-list-errorState.view";
import { TrackerAccountsListSkeletonCardView } from "./tracker-accounts-list-skeletonCard.view";
import { TrackerAccountFormModalView } from "@/experiences/tracker/views/tracker-accountFormModal.view";
import { showConfirmDialog } from "@/shared/components/confirm-dialog";

const STORYBOOK_ACCOUNTS: SaAccountListItem[] = [
  {
    id: "1",
    state: "eligible",
    name: "김서연 SA",
    initial: "김",
    boutique: "청담 부티크",
    totalSpend: 8200000,
  },
  {
    id: "2",
    state: "notEligible",
    name: "박지민 SA",
    initial: "박",
    boutique: "신세계 부티크",
    totalSpend: 4250000,
  },
  {
    id: "3",
    state: "eligible",
    name: "이수진 SA",
    initial: "이",
    boutique: "갤러리아 부티크",
    totalSpend: 6100000,
  },
  {
    id: "4",
    state: "noPurchases",
    name: "정하윤 SA",
    initial: "정",
    boutique: "현대 부티크",
    totalSpend: 0,
  },
  {
    id: "5",
    state: "eligible",
    name: "최민서 SA",
    initial: "최",
    boutique: "롯데 부티크",
    totalSpend: 9800000,
  },
];

type TrackerAccountsListViewsProps = {
  screenState?: TrackerAccountsListScreenState;
  accounts?: SaAccountListItem[];
  onSaPress?: (id: string) => void;
  onRetry?: () => void;
  onCreateAccount?: (data: {
    storeName: string;
    saName?: string;
    notes?: string;
  }) => Promise<void>;
  onDeleteAccount?: (id: string) => Promise<void>;
};

export const TrackerAccountsListViews = memo(
  ({
    screenState = "default",
    accounts = STORYBOOK_ACCOUNTS,
    onSaPress,
    onCreateAccount,
    onDeleteAccount,
  }: TrackerAccountsListViewsProps) => {
    const [showAccountModal, setShowAccountModal] = useState(false);
    const content: Record<TrackerAccountsListScreenState, ReactNode> = {
      default: (
        <>
          {accounts.map((sa, i) => (
            <View key={sa.id}>
              {i > 0 && <View style={styles.spacer12} />}
              <TrackerAccountsListSaListItemView
                id={sa.id}
                state={sa.state}
                name={sa.name}
                initial={sa.initial}
                boutique={sa.boutique}
                totalSpend={sa.totalSpend}
                onPress={() => onSaPress?.(sa.id)}
                onLongPress={
                  onDeleteAccount
                    ? () =>
                        showConfirmDialog({
                          title: "계좌 삭제",
                          message: `${sa.name} (${sa.boutique})을(를) 삭제하시겠습니까?`,
                          onConfirm: () => onDeleteAccount(sa.id),
                        })
                    : undefined
                }
              />
            </View>
          ))}
        </>
      ),
      empty: <TrackerAccountsListEmptyStateView />,
      loading: (
        <>
          <TrackerAccountsListSkeletonCardView />
          <View style={styles.spacer12} />
          <TrackerAccountsListSkeletonCardView />
          <View style={styles.spacer12} />
          <TrackerAccountsListSkeletonCardView />
        </>
      ),
      error: <TrackerAccountsListErrorStateView />,
    };

    return (
      <View style={styles.screen} testID="accounts-list-screen">
        <View style={styles.statusBar} />
        <View style={styles.appBar}>
          <Text style={styles.appBarTitle} testID="accounts-list-title">
            SA 계좌
          </Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content[screenState]}
        </ScrollView>
        {(screenState === "default" || screenState === "empty") && (
          <View style={styles.fabContainer}>
            <Pressable
              style={styles.addFab}
              onPress={() => setShowAccountModal(true)}
              testID="add-account-fab"
            >
              <Text style={styles.addFabIcon}>+</Text>
            </Pressable>
          </View>
        )}
        {onCreateAccount && (
          <TrackerAccountFormModalView
            visible={showAccountModal}
            onClose={() => setShowAccountModal(false)}
            onSubmit={onCreateAccount}
          />
        )}
      </View>
    );
  },
);

TrackerAccountsListViews.displayName = "TrackerAccountsListViews";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  statusBar: {
    height: 54,
  },
  appBar: {
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  appBarTitle: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 20,
    color: "#1A1A1A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  spacer12: {
    height: 12,
  },
  fabContainer: {
    position: "absolute",
    bottom: 96,
    right: 20,
  },
  addFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FF2D55",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  addFabIcon: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: "Inter",
    fontWeight: "700",
  },
});
