import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
    title: string,
    onPress: ()=>void
}

export function DangerButton({ title, onPress }:Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FF3B48",
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: { color: "#fff", fontWeight: "700" },
});
