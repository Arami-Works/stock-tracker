import { memo, type ReactNode } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import type {
  TrackerAccountsDetailScreenState,
  PurchaseItem,
} from "../models/tracker-accounts-detail.type";
import { TrackerAccountsDetailSaHeaderView } from "./tracker-accounts-detail-saHeader.view";
import { TrackerAccountsDetailTankStatusView } from "./tracker-accounts-detail-tankStatus.view";
import { TrackerAccountsDetailPurchaseRowView } from "./tracker-accounts-detail-purchaseRow.view";
import { TrackerAccountsDetailErrorStateView } from "./tracker-accounts-detail-errorState.view";
import { TrackerAccountsDetailSkeletonCardView } from "./tracker-accounts-detail-skeletonCard.view";

const STORYBOOK_PURCHASES: PurchaseItem[] = [
  {
    id: "1",
    type: "regular",
    productName: "트리니티 링",
    date: "2024.03.15",
    amount: 3200000,
  },
  {
    id: "2",
    type: "tank",
    productName: "러브 브레이슬릿",
    date: "2024.01.10",
    amount: 5000000,
  },
  {
    id: "3",
    type: "regular",
    productName: "저스트 앵 끌루 링",
    date: "2023.12.20",
    amount: 4200000,
  },
];

type TrackerAccountsDetailViewsProps = {
  screenState?: TrackerAccountsDetailScreenState;
  name?: string;
  initial?: string;
  boutique?: string;
  totalSpend?: number;
  tankState?: "eligible" | "notEligible" | "noPurchases";
  purchases?: PurchaseItem[];
  onBack?: () => void;
  onRetry?: () => void;
};

export const TrackerAccountsDetailViews = memo(
  ({
    screenState = "default",
    name = "김서연 SA",
    initial = "김",
    boutique = "청담 부티크",
    totalSpend = 8200000,
    tankState = "eligible",
    purchases = STORYBOOK_PURCHASES,
    onBack,
  }: TrackerAccountsDetailViewsProps) => {
    const content: Record<TrackerAccountsDetailScreenState, ReactNode> = {
      default: (
        <>
          <TrackerAccountsDetailSaHeaderView
            name={name}
            initial={initial}
            boutique={boutique}
            totalSpend={totalSpend}
          />
          <View style={styles.spacer12} />
          <TrackerAccountsDetailTankStatusView
            state={tankState === "noPurchases" ? "notEligible" : tankState}
          />
          <View style={styles.spacer20} />
          <Text style={styles.sectionLabel}>최근 구매 내역</Text>
          <View style={styles.spacer12} />
          {purchases.map((p, i) => (
            <View key={p.id}>
              {i > 0 && <View style={styles.spacer16} />}
              <TrackerAccountsDetailPurchaseRowView
                type={p.type}
                productName={p.productName}
                date={p.date}
                amount={p.amount}
              />
            </View>
          ))}
        </>
      ),
      loading: (
        <>
          <TrackerAccountsDetailSkeletonCardView />
          <View style={styles.spacer12} />
          <TrackerAccountsDetailSkeletonCardView />
          <View style={styles.spacer12} />
          <TrackerAccountsDetailSkeletonCardView />
        </>
      ),
      error: <TrackerAccountsDetailErrorStateView />,
    };

    return (
      <View style={styles.screen}>
        <View style={styles.statusBar} />
        <View style={styles.appBar}>
          <Pressable onPress={onBack} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <Text style={styles.appBarTitle}>SA 상세</Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content[screenState]}
        </ScrollView>
      </View>
    );
  },
);

TrackerAccountsDetailViews.displayName = "TrackerAccountsDetailViews";

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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 8,
  },
  backArrow: {
    fontSize: 20,
    color: "#1A1A1A",
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
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  sectionLabel: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
    color: "#888",
    alignSelf: "flex-start",
  },
  spacer12: {
    height: 12,
  },
  spacer16: {
    height: 16,
  },
  spacer20: {
    height: 20,
  },
});
