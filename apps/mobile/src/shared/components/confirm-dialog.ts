import { Alert } from "react-native";

export function showConfirmDialog({
  title,
  message,
  destructiveLabel = "삭제",
  onConfirm,
}: {
  title: string;
  message: string;
  destructiveLabel?: string;
  onConfirm: () => void;
}) {
  Alert.alert(title, message, [
    { text: "취소", style: "cancel" },
    { text: destructiveLabel, style: "destructive", onPress: onConfirm },
  ]);
}
