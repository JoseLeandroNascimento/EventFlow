import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    label:string,
    value: string,
    onPress: ()=>void
}

export function FormTimePicker({ label, value = "Select time", onPress }:Props) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.box} onPress={onPress}>
        <Text>{value}</Text>
        <Ionicons name="time-outline" size={18} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, marginBottom: 6 },
  box: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
