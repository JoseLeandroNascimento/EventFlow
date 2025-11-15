import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 40,
  },

  hello: {
    textAlign: "right",
    fontSize: 14,
    color: "#666",
  },

  userName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    maxWidth: 180,
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    alignItems: "center",
  },

  itemText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
    maxWidth: "90%",
  },

  exit: {
    color: "#DD2C2C",
    fontWeight: "700",
  },

  line: {
    height: 1,
    backgroundColor: "#E8E8E8",
  },
});
