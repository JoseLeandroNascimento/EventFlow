import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function EventListScreen() {
  const router = useRouter();

  const events = [
    {
      id: 1,
      title: "Show de Rock Internacional",
      type: "Show",
      price: "R$ 150,00",
      date: "25/10/2025",
      latitude: -23.55052,
      longitude: -46.633308,
      image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Palestra de Tecnologia",
      type: "Palestra",
      price: "R$ 0,00",
      date: "28/10/2025",
      latitude: -23.559616,
      longitude: -46.658846,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Festival de Comida",
      type: "Evento Gastronômico",
      price: "R$ 50,00",
      date: "30/10/2025",
      latitude: -23.563210,
      longitude: -46.654250,
      image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Logo</Text>
        <Ionicons name="menu-outline" size={28} color="#000" />
      </View>

      {/* Welcome */}
      <Text style={styles.welcome}>Bem vindo ao Aplicativo</Text>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#555" />
        <TextInput
          placeholder="Pesquise Eventos, Show e etc..."
          placeholderTextColor="#555"
          style={styles.searchInput}
        />
      </View>

      {/* Explore Text */}
      <Text style={styles.exploreText}>
        Explore <Text style={{ fontWeight: "bold" }}>os Eventos</Text>
      </Text>

      {/* Map */}
      <View style={styles.mapCard}>
        <MapView
          style={styles.mapImage}
          initialRegion={{
            latitude: -23.55052,
            longitude: -46.633308,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{ latitude: event.latitude, longitude: event.longitude }}
              title={event.title}
              description={`${event.type} - ${event.price}`}
            />
          ))}
        </MapView>
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Explore pelo Mapa</Text>
        </TouchableOpacity>
      </View>

      {/* Event Count */}
      <Text style={styles.eventCount}>Mostrando {events.length} de {events.length} Eventos</Text>

      {/* Event Cards */}
      {events.map((event) => (
        <View key={event.id} style={styles.card}>
          <Image
            source={{ uri: event.image }}
            style={styles.eventImage}
          />
          <View style={styles.eventInfo}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.type}>{event.type}</Text>
            <Text style={styles.ingressoLabel}>Ingresso</Text>
            <Text style={styles.price}>{event.price}</Text>
            <View style={styles.footer}>
              <Text style={styles.date}>{event.date}</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => router.back()}
              >
                <Text style={styles.detailsText}>Mais Detalhes ▶</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
  logo: { fontSize: 18, fontWeight: "bold" },
  welcome: { textAlign: "center", fontSize: 16, marginBottom: 15 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: { marginLeft: 10, flex: 1, color: "#000" },
  exploreText: { marginTop: 15, marginBottom: 10, textAlign: "center" },
  mapCard: { alignItems: "center", borderRadius: 15, overflow: "hidden", marginBottom: 10, height: 200 },
  mapImage: { width: "100%", height: "100%" },
  mapButton: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    elevation: 3,
  },
  mapButtonText: { color: "#000", fontWeight: "500" },
  eventCount: { marginVertical: 10, textAlign: "center", color: "#555" },
  card: {
    borderWidth: 1,
    borderColor: "#dde4f8",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
  },
  eventImage: { width: "100%", height: 120 },
  eventInfo: { padding: 10 },
  title: { fontWeight: "bold", color: "#0000cc", marginBottom: 2 },
  type: { color: "#555", marginBottom: 4 },
  ingressoLabel: { fontSize: 12, color: "#555" },
  price: { fontWeight: "bold", fontSize: 14, marginBottom: 6 },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  date: { color: "#555" },
  detailsButton: {
    backgroundColor: "#0000cc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  detailsText: { color: "#fff", fontSize: 12 },
});
