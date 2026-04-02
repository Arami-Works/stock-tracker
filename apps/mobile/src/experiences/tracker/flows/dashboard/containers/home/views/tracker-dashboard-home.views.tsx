import { memo, useState, type ReactNode } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import type {
  TrackerDashboardHomeScreenState,
  TrackerDashboardHomeControllersOutput,
} from "../models/tracker-dashboard-home.type";
import { TrackerDashboardHomeEligibilityBadgeView } from "./tracker-dashboard-home-eligibilityBadge.view";
import { TrackerDashboardHomeSpendSummaryCardView } from "./tracker-dashboard-home-spendSummaryCard.view";
import { TrackerDashboardHomeSaCardView } from "./tracker-dashboard-home-saCard.view";
import { TrackerDashboardHomeRefreshFabView } from "./tracker-dashboard-home-refreshFab.view";
import { TrackerDashboardHomeEmptyStateView } from "./tracker-dashboard-home-emptyState.view";
import { TrackerDashboardHomeErrorStateView } from "./tracker-dashboard-home-errorState.view";
import { TrackerSkeletonCardView } from "@/experiences/tracker/views";
import { TrackerAccountFormModalView } from "@/experiences/tracker/views/tracker-accountFormModal.view";

type TrackerDashboardHomeViewsProps =
  Partial<TrackerDashboardHomeControllersOutput> & {
    onRefresh?: () => void;
    onRetry?: () => void;
  };

export const TrackerDashboardHomeViews = memo(
  ({
    screenState = "default",
    eligibilityStatus = "eligible",
    totalSpend = 12450000,
    goalAmount = 30000000,
    saAccounts = [],
    onSaPress,
    onRefresh,
    onCreateAccount,
  }: TrackerDashboardHomeViewsProps) => {
    const [showAccountModal, setShowAccountModal] = useState(false);
    const spendState =
      totalSpend > 0 ? "populated" : ("zero" as "populated" | "zero");

    const content: Record<TrackerDashboardHomeScreenState, ReactNode> = {
      default: (
        <>
          <TrackerDashboardHomeEligibilityBadgeView state={eligibilityStatus} />
          <View style={styles.spacer16} />
          <TrackerDashboardHomeSpendSummaryCardView
            state={spendState}
            totalSpend={totalSpend}
            goalAmount={goalAmount}
          />
          {saAccounts.map((sa, i) => (
            <View key={sa.id}>
              <View style={i === 0 ? styles.spacer16 : styles.spacer12} />
              <TrackerDashboardHomeSaCardView
                id={sa.id}
                state={sa.state}
                name={sa.name}
                initial={sa.initial}
                boutique={sa.boutique}
                totalSpend={sa.totalSpend}
                onPress={() => onSaPress?.(sa.id)}
              />
            </View>
          ))}
        </>
      ),
      empty: (
        <>
          <TrackerDashboardHomeEligibilityBadgeView state="notEligible" />
          <View style={styles.spacer16} />
          <TrackerDashboardHomeEmptyStateView />
        </>
      ),
      loading: (
        <>
          <TrackerSkeletonCardView width={350} height={36} />
          <View style={styles.spacer16} />
          <TrackerSkeletonCardView width={350} height={100} />
          <View style={styles.spacer16} />
          <TrackerSkeletonCardView width={350} height={68} />
          <View style={styles.spacer12} />
          <TrackerSkeletonCardView width={350} height={68} />
        </>
      ),
      error: <TrackerDashboardHomeErrorStateView />,
    };

    return (
      <View style={styles.screen} testID="dashboard-home-screen">
        <View style={styles.statusBar} />
        <View style={styles.appBar}>
          <Text style={styles.appBarTitle} testID="dashboard-home-title">
            대시보드
          </Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content[screenState ?? "default"]}
        </ScrollView>
        {(screenState === "default" || screenState === "empty") && (
          <View style={styles.fabContainer}>
            {screenState === "default" && (
              <>
                <TrackerDashboardHomeRefreshFabView onPress={onRefresh} />
                <View style={styles.fabSpacer} />
              </>
            )}
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

TrackerDashboardHomeViews.displayName = "TrackerDashboardHomeViews";

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
  fabContainer: {
    position: "absolute",
    bottom: 96,
    right: 20,
    alignItems: "center",
  },
  fabSpacer: {
    height: 12,
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
  spacer16: {
    height: 16,
  },
  spacer12: {
    height: 12,
  },
});
