import { memo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
} from "react-native";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type TextInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  error?: string;
};

function TextInputFieldInner<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  multiline,
  keyboardType,
  error,
}: TextInputFieldProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              multiline && styles.multilineInput,
              error && styles.inputError,
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value as string}
            placeholder={placeholder}
            placeholderTextColor="#CCC"
            multiline={multiline}
            keyboardType={keyboardType}
          />
        )}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

export const TextInputField = memo(
  TextInputFieldInner,
) as typeof TextInputFieldInner;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 13,
    color: "#1A1A1A",
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontFamily: "Inter",
    fontSize: 15,
    color: "#1A1A1A",
  },
  multilineInput: {
    height: 88,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#FF2D55",
  },
  error: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#FF2D55",
    marginTop: 4,
  },
});
