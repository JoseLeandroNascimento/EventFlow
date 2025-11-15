import { TouchableOpacity,TouchableOpacityProps , Text, StyleSheet } from "react-native";

type Props = {
    title: string,
    onPress: ()=>void
}&TouchableOpacityProps

export function PrimaryButton({ title, onPress, ...rest }:Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#001AFF",
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: { color: "#fff", fontWeight: "700" },
});
