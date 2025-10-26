import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAuth } from "../contexts/AuthContext";

export default function CreateEventScreen() {
  const router = useRouter();
  const { role } = useAuth();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [lat, setLat] = useState(-23.55052);
  const [lng, setLng] = useState(-46.633308);

  if (role !== "admin") return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Logo</Text>
        <Ionicons name="menu-outline" size={26} color="#000" />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.title}>Cadastrar Evento</Text>

        {/* Upload placeholders */}
        <View style={styles.uploadRow}>
          {[0, 1, 2].map((i) => <View key={i} style={styles.uploadBox} />)}
          <TouchableOpacity style={styles.uploadBtn}>
            <Ionicons name="add" size={18} color="#000" />
            <Text style={{ marginLeft: 6 }}>Upload</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="example" />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, { height: 90, textAlignVertical: "top" }]}
          value={desc} onChangeText={setDesc} multiline
          placeholder="Autosize height based on content lines"
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Please select" />

        <Text style={styles.label}>Data do Evento</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Select date" />

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Horário Inicial</Text>
            <TextInput style={styles.input} value={startTime} onChangeText={setStartTime} placeholder="Select time" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Horário Final</Text>
            <TextInput style={styles.input} value={endTime} onChangeText={setEndTime} placeholder="Select time" />
          </View>
        </View>

        <Text style={styles.label}>Selecione os Locais Cadastrados</Text>
        <TextInput style={styles.input} value={place} onChangeText={setPlace} placeholder="Please select" />

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Ou</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.label}>Marque no Mapa o Local Desejado</Text>
        <MapView
          style={styles.map}
          initialRegion={{ latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
          onPress={(e) => {
            setLat(e.nativeEvent.coordinate.latitude);
            setLng(e.nativeEvent.coordinate.longitude);
          }}
        >
          <Marker coordinate={{ latitude: lat, longitude: lng }} />
        </MapView>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput style={styles.input} value={String(lat)} onChangeText={(t) => setLat(Number(t) || lat)} keyboardType="numeric" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput style={styles.input} value={String(lng)} onChangeText={(t) => setLng(Number(t) || lng)} keyboardType="numeric" />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
            <Text style={styles.saveBtnText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelBtnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 56, borderBottomWidth: 1, borderBottomColor: "#eee", paddingHorizontal: 16,
    alignItems: "center", flexDirection: "row", justifyContent: "space-between",
  },
  logo: { fontSize: 18, fontWeight: "bold", color: "#000" },

  formCard: { margin: 16, borderWidth: 1, borderColor: "#E8E8E8", borderRadius: 12, backgroundColor: "#fff", padding: 16 },
  title: { fontWeight: "700", fontSize: 15, marginBottom: 12 },
  uploadRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  uploadBox: { width: 70, height: 60, borderRadius: 8, backgroundColor: "#F0F0F0" },
  uploadBtn: {
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#DADADA", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8,
  },

  label: { fontSize: 12, color: "#555", marginBottom: 6, marginTop: 10 },
  input: { height: 40, borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, paddingHorizontal: 12, backgroundColor: "#fff" },

  dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 10, gap: 8 },
  divider: { height: 1, backgroundColor: "#E0E0E0", flex: 1 },
  dividerText: { color: "#8E8E93", fontSize: 12 },

  map: { height: 140, borderRadius: 12, marginTop: 8 },

  actions: { flexDirection: "row", gap: 10, marginTop: 16 },
  saveBtn: { flex: 1, backgroundColor: "#0B1E74", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  saveBtnText: { color: "#fff", fontWeight: "700" },
  cancelBtn: { flex: 1, backgroundColor: "#E53935", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  cancelBtnText: { color: "#fff", fontWeight: "700" },
});
