import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

type Place = {
  id: number; name: string; image: string; address: string; neighborhood: string;
  latitude: number; longitude: number;
};

const MOCK_PLACES: Place[] = new Array(6).fill(0).map((_, i) => ({
  id: i + 1,
  name: "Lorem ipsum dolor sit ame...",
  image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=60",
  address: "Avenida Central, 1234",
  neighborhood: "Aurora, Solaris City – SP",
  latitude: -23.55 + i * 0.002,
  longitude: -46.63 + i * 0.002,
}));

export default function LocationsList() {
  const { role } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState("");

  if (role !== "admin") return null;

  const filtered = useMemo(() => {
    if (!query.trim()) return MOCK_PLACES;
    const q = query.toLowerCase();
    return MOCK_PLACES.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Logo</Text>
        <Ionicons name="menu-outline" size={26} color="#000" />
      </View>

      <View style={styles.cardHeader}>
        <Text style={styles.listTitle}>Listagem de Locais</Text>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#8E8E93" />
          <TextInput
            placeholder="Pesquise Locais"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push("/locations/create")}>
          <Text style={styles.primaryBtnText}>Criar Local +</Text>
        </TouchableOpacity>

        <Text style={styles.counter}>Mostrando {filtered.length} de {MOCK_PLACES.length} Locais Cadastrados</Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        {filtered.map((p) => (
          <View key={p.id} style={styles.placeCard}>
            <Image source={{ uri: p.image }} style={styles.placeImage} />
            <View style={{ padding: 10 }}>
              <Text numberOfLines={1} style={styles.placeName}>{p.name}</Text>
              <Text style={styles.placeAddress}>{p.address}</Text>

              <View style={styles.placeActions}>
                <TouchableOpacity style={styles.warnBtn}>
                  <Text style={styles.warnBtnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dangerBtn}>
                  <Text style={styles.dangerBtnText}>Excluir Local</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Ver</Text>
                  <Ionicons name="search" size={14} color="#0B1E74" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 56, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#eee",
    alignItems: "center", flexDirection: "row", justifyContent: "space-between",
  },
  logo: { fontSize: 18, fontWeight: "bold", color: "#000" },

  cardHeader: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  listTitle: { fontWeight: "700", fontSize: 14, marginBottom: 8 },
  searchBox: {
    height: 36, backgroundColor: "#F3F3F4", borderRadius: 18,
    paddingHorizontal: 12, flexDirection: "row", alignItems: "center",
  },
  searchInput: { flex: 1, marginLeft: 6, fontSize: 13 },
  primaryBtn: { backgroundColor: "#0B1E74", borderRadius: 8, paddingVertical: 10, marginTop: 10, alignItems: "center" },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  counter: { color: "#8E8E93", fontSize: 12, marginTop: 6 },

  placeCard: { borderWidth: 1, borderColor: "#EAEAEA", backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", marginTop: 12 },
  placeImage: { width: "100%", height: 110 },
  placeName: { color: "#0B1E74", fontWeight: "700", fontSize: 14, marginBottom: 4 },
  placeAddress: { color: "#666", fontSize: 12 },

  placeActions: { marginTop: 10, flexDirection: "row", alignItems: "center", gap: 8, justifyContent: "flex-end" },
  warnBtn: { backgroundColor: "#FFC107", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16 },
  warnBtnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  dangerBtn: { backgroundColor: "#E53935", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16 },
  dangerBtnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  outlineBtn: {
    borderWidth: 1, borderColor: "#0B1E74", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16,
    flexDirection: "row", gap: 6, alignItems: "center",
  },
  outlineBtnText: { color: "#0B1E74", fontWeight: "700", fontSize: 12 },
});
