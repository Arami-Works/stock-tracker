import { memo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type TrackerEmptyStateViewProps = {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
  width?: number;
  height?: number;
};

export const TrackerEmptyStateView = memo(
  ({
    icon,
    title = "아직 구매 내역이 없습니다",
    subtitle = "SA를 추가하고 구매를 기록해보세요",
    ctaLabel = "SA 추가하기",
    onCtaPress,
    width = 340,
    height = 240,
  }: TrackerEmptyStateViewProps) => {
    return (
      <View style={[styles.container, { width, height }]}>
        <View style={styles.iconContainer}>{icon ?? <BagIcon />}</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Pressable style={styles.ctaButton} onPress={onCtaPress}>
          <Text style={styles.ctaText}>{ctaLabel}</Text>
        </Pressable>
      </View>
    );
  },
);

TrackerEmptyStateView.displayName = "TrackerEmptyStateView";

const BagIcon = memo(() => (
  <View style={styles.bagContainer}>
    <View style={styles.bagHandle} />
    <View style={styles.bagBody} />
  </View>
));

BagIcon.displayName = "BagIcon";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 16,
  },
  bagContainer: {
    width: 40,
    height: 56,
    alignItems: "center",
  },
  bagHandle: {
    width: 22,
    height: 16,
    borderRadius: 11,
    borderWidth: 3,
    borderColor: "#FFE8ED",
  },
  bagBody: {
    width: 40,
    height: 44,
    backgroundColor: "#FFE8ED",
    borderRadius: 6,
    marginTop: -4,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 16,
    color: "#1A1A1A",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 13,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
  ctaButton: {
    width: 140,
    height: 42,
    backgroundColor: "#FF2D55",
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  ctaText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
