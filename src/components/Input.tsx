import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = TextInputProps & {
  icon?: keyof typeof Ionicons.glyphMap; // ícone opcional
  containerStyle?: ViewStyle;            // estilo opcional do container
};

export function Input({ icon, containerStyle, ...rest }: Props) {
  return (
    <View style={[styles.inputBox, containerStyle]}>
      {icon && (
        <Ionicons name={icon} size={20} color="#777" style={{ marginRight: 8 }} />
      )}

      <TextInput
        style={styles.input}
        placeholderTextColor="#777"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: "100%",
    height: 50,
    backgroundColor: "#E5E5E5",
    borderRadius: 25,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
});
