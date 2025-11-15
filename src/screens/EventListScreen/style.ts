import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  screenTitle: {
    fontSize: 20,
    fontWeight: "400",
    marginTop: 20,
    marginBottom: 10,
  },

  createButton: {
    backgroundColor: "#001AFF",
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  createButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  countText: {
    textAlign: "center",
    marginVertical: 8,
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
});
