import AppHeader from "@/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAuth } from "../contexts/AuthContext";

export default function CreateEventScreen() {
  const router = useRouter();
  const { role } = useAuth();

  if (role !== "admin") return null;

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const [lat, setLat] = useState(-23.55052);
  const [lng, setLng] = useState(-46.633308);
  const [images, setImages] = useState<string[]>([]);

  // === Escolher Imagem ===
  const pickImage = async (fromCamera: boolean) => {
    try {
      if (fromCamera) {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert("Permissão necessária", "Ative a permissão da câmera.");
          return;
        }

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });

        if (!result.canceled) {
          setImages((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
        }
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert("Permissão necessária", "Ative o acesso à galeria.");
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          allowsMultipleSelection: true,
        });

        if (!result.canceled) {
          setImages((prev) => [...prev, ...result.assets.map((a) => a.uri)]);
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível selecionar a imagem.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <AppHeader />

      <View style={styles.formCard}>
        <Text style={styles.title}>Cadastrar Evento</Text>

        {/* Upload */}
        <View style={styles.uploadRow}>
          {images.map((uri, i) => (
            <Image key={i} source={{ uri }} style={styles.uploadPreview} />
          ))}

          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() =>
              Alert.alert("Adicionar imagem", "Escolha uma opção:", [
                { text: "Tirar Foto", onPress: () => pickImage(true) },
                { text: "Escolher da Galeria", onPress: () => pickImage(false) },
                { text: "Cancelar", style: "cancel" },
              ])
            }
          >
            <Ionicons name="add" size={18} color="#000" />
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="example" />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={desc}
          onChangeText={setDesc}
          multiline
          placeholder="Autosize height based on content lines"
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Please select"
        />

        <Text style={styles.label}>Data do Evento</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Select date"
        />

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Horário Inicial</Text>
            <TextInput
              style={styles.input}
              value={startTime}
              onChangeText={setStartTime}
              placeholder="Select time"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Horário Final</Text>
            <TextInput
              style={styles.input}
              value={endTime}
              onChangeText={setEndTime}
              placeholder="Select time"
            />
          </View>
        </View>

        <Text style={styles.label}>Selecione os Locais Cadastrados</Text>
        <TextInput
          style={styles.input}
          value={place}
          onChangeText={setPlace}
          placeholder="Please select"
        />

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Ou</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.label}>Marque no Mapa o Local Desejado</Text>

        {/* Mapa */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            onPress={(e) => {
              setLat(e.nativeEvent.coordinate.latitude);
              setLng(e.nativeEvent.coordinate.longitude);
            }}
          >
            <Marker coordinate={{ latitude: lat, longitude: lng }} />
          </MapView>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>Marque no Mapa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Latitude</Text>
            <TextInput
              style={styles.input}
              value={String(lat)}
              onChangeText={(t) => setLat(Number(t) || lat)}
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Longitude</Text>
            <TextInput
              style={styles.input}
              value={String(lng)}
              onChangeText={(t) => setLng(Number(t) || lng)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveBtn} onPress={() => router.back()}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  formCard: {
    margin: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: { fontWeight: "700", fontSize: 15, marginBottom: 12 },
  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  uploadPreview: { width: 70, height: 60, borderRadius: 8 },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DADADA",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  uploadText: { marginLeft: 6, fontSize: 13, color: "#333" },
  label: { fontSize: 12, color: "#555", marginBottom: 6, marginTop: 8 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 13,
  },
  textArea: { height: 90, textAlignVertical: "top" },
  row: { flexDirection: "row", gap: 10 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    gap: 8,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#E0E0E0" },
  dividerText: { color: "#8E8E93", fontSize: 12 },
  mapContainer: { marginTop: 4, borderRadius: 12, overflow: "hidden" },
  map: { width: "100%", height: 150 },
  mapButton: {
    position: "absolute",
    top: "40%",
    left: "25%",
    right: "25%",
    backgroundColor: "#F5F5F5",
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
  },
  mapButtonText: { fontWeight: "600", color: "#333" },
  actions: { flexDirection: "row", gap: 10, marginTop: 20 },
  saveBtn: {
    flex: 1,
    backgroundColor: "#0B1E74",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700" },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: { color: "#fff", fontWeight: "700" },
});
