import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Evento } from "@/services/eventService";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  event: Evento;
};

export function AdminEventCard({ event }: Props) {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const imagens = event.imagens?.length
    ? event.imagens
    : ["https://picsum.photos/600/300"];

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(index);
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.deleteTag}>
        <Text style={styles.deleteText}>Excluir Evento</Text>
        <Ionicons name="close" size={14} color="#fff" style={{ marginLeft: 4 }} />
      </TouchableOpacity>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        {imagens.map((img, idx) => (
          <Image key={idx} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {imagens.map((_, index) => (
          <View
            key={index}
            style={index === activeIndex ? styles.dotActive : styles.dot}
          />
        ))}
      </View>

      <View style={styles.body}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{event.nome}</Text>
          <Text style={styles.type}>{event.categoria}</Text>

          <Text style={styles.priceLabel}>Ingresso</Text>
          <Text style={styles.priceValue}>R$ 00,00</Text>
        </View>

        {/* AÇÕES */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={16} color="#fff" />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate("event-details", { id: event.id } as never)
            }
          >
            <Text style={styles.viewText}>Ver</Text>
            <Ionicons name="search" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#0002",
    overflow: "hidden",
  },

  deleteTag: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    backgroundColor: "#FF3B48",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    zIndex: 5,
  },

  deleteText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  image: {
    width: width,
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  dots: {
    flexDirection: "row",
    gap: 6,
    alignSelf: "center",
    marginVertical: 6,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },

  dotActive: {
    width: 8,
    height: 8,
    backgroundColor: "#001AFF",
    borderRadius: 10,
  },

  body: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
  },

  type: {
    fontSize: 14,
    marginBottom: 6,
  },

  priceLabel: {
    fontSize: 12,
    color: "#666",
  },

  priceValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  actions: {
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 10,
  },

  editButton: {
    flexDirection: "row",
    backgroundColor: "#FFB800",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    gap: 4,
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
  },

  viewButton: {
    flexDirection: "row",
    backgroundColor: "#001AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
    gap: 4,
  },

  viewText: {
    color: "#fff",
    fontWeight: "700",
  },
});
