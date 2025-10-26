import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  type: string;
  date: string;
  price: string;
  image: string;
  onPress: () => void;
};

export default function EventCard({ title, type, date, price, image, onPress }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.priceLabel}>Ingresso</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Mais Detalhes ▸</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  image: { width: "100%", height: 130 },
  content: { padding: 10 },
  title: { fontWeight: "bold", color: "#001B70" },
  type: { color: "#333", marginBottom: 4 },
  priceLabel: { fontSize: 12, color: "#777" },
  price: { fontWeight: "bold", color: "#000" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
  date: { color: "#333" },
  button: {
    backgroundColor: "#0000ff",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  buttonText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
