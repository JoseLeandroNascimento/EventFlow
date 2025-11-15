import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 20,
  },

  orText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    color: "#777",
    fontSize: 14,
  },

  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 40,
  },
});
