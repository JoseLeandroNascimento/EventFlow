import { View, TextInput, TextInputProps, Text, StyleSheet } from "react-native";

type Props = {
    label: string;
    style?: any;
    inputStyle?: any;
} & TextInputProps;

export function FormInput({ label, style, inputStyle, ...rest }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...rest}
        placeholderTextColor="#999"
        style={[styles.input, inputStyle, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, marginBottom: 6 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 15,
  },
});
