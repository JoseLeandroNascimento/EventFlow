import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  logoBox: {
    width: 160,
    height: 70,
    backgroundColor: "#E5E5E5",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  logoText: {
    fontSize: 20,
    color: "#555",
  },

  error: {
    width: "100%",
    textAlign: "left",
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },

});
