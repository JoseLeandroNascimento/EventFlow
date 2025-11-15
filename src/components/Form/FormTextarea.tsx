import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

type Props = {
    label:string
} & TextInputProps

export function FormTextarea({ label, ...rest }:Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textarea}
        multiline
        numberOfLines={4}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, marginBottom: 6 },
  textarea: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    textAlignVertical: "top",
  },
});
