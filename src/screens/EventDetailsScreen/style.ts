import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  header: {
    marginBottom: 10,
  },

  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9D9D9"
  },

  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  imageWrapper: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },

  image: {
    width: width,     // largura igual ao tamanho da tela
    height: 200,      // ajuste a altura como quiser
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  dotsContainer: {
    flexDirection: "row",
    gap: 6,
    alignSelf: "center",
    marginTop: -20,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#bbb",
    borderRadius: 10,
  },

  dotActive: {
    width: 8,
    height: 8,
    backgroundColor: "#001AFF",
    borderRadius: 10,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    width: "70%",
  },

  date: {
    fontSize: 14,
    color: "#333",
  },

  type: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 20,
  },

  sectionBox: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  sectionTitle: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 12,
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  rowItem: {},

  rowItemLabel: {
    fontSize: 12,
    color: "#555",
  },

  rowItemValue: {
    fontSize: 14,
    fontWeight: "600",
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  priceTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  priceValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#001AFF",
  },

  mapContainer: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },

  address: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },

  label: {
    fontWeight: "700",
  },
});
