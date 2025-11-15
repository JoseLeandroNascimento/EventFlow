import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },

  mapContainer: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    marginTop: 6,
  },

  mapCard: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  mapCardText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },

  countText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 15,
  },
});
