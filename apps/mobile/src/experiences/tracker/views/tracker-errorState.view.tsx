import { memo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

type TrackerErrorStateViewProps = {
  title?: string;
  subtitle?: string;
  retryLabel?: string;
  onRetry?: () => void;
  width?: number;
  height?: number;
};

export const TrackerErrorStateView = memo(
  ({
    title = "데이터를 불러올 수 없습니다",
    subtitle = "네트워크 연결을 확인하고 다시 시도해주세요",
    retryLabel = "다시 시도",
    onRetry,
    width = 340,
    height = 240,
  }: TrackerErrorStateViewProps) => {
    return (
      <View style={[styles.container, { width, height }]}>
        <View style={styles.errorIcon}>
          <Text style={styles.errorIconText}>!</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>{retryLabel}</Text>
        </Pressable>
      </View>
    );
  },
);

TrackerErrorStateView.displayName = "TrackerErrorStateView";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  errorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFE8ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  errorIconText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 28,
    color: "#FF2D55",
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
  retryButton: {
    width: 140,
    height: 42,
    backgroundColor: "#FF2D55",
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  retryText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
