import AppHeader from "@/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAuth } from "../contexts/AuthContext";
import { createEvento } from "../services/eventService";

export default function CreateEventScreen() {
  const router = useRouter();
  const { role } = useAuth();

  if (role !== "admin") return null;

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [place, setPlace] = useState("");
  const [lat, setLat] = useState(-23.55052);
  const [lng, setLng] = useState(-46.633308);
  const [images, setImages] = useState<string[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // === Formatações ===
  const formatDate = (d?: Date | null) =>
    d ? d.toISOString().split("T")[0] : "";
  const formatTime = (d?: Date | null) =>
    d ? d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "";

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


  const handleSave = async () => {
    const dateStr = date?.toISOString().split("T")[0] ?? "";

    const buildISOTime = (time: Date | null) => {
      if (!time) return undefined;
      const h = time.getHours().toString().padStart(2, "0");
      const m = time.getMinutes().toString().padStart(2, "0");
      return new Date(`${dateStr}T${h}:${m}:00Z`).toISOString();
    };

    const payload = {
      name,
      desc,
      category,
      date: dateStr,
      startTime: buildISOTime(startTime),
      endTime: buildISOTime(endTime),
      place,
      lat,
      lng,
      images,
    };

    console.log("🛰️ Enviando dados para API:", JSON.stringify(payload, null, 2));

    try {
      const newEvent = await createEvento(payload);
      Alert.alert("Sucesso", "Evento criado com sucesso!");
      router.back();
    } catch (error) {
      console.error("❌ Erro ao enviar:", error);
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
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Título do evento" />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={desc}
          onChangeText={setDesc}
          multiline
          placeholder="Detalhes do evento..."
        />

        <Text style={styles.label}>Categoria</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Ex: Palestra, Show..."
        />

        {/* === Date === */}
        <Text style={styles.label}>Data do Evento</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text>{date ? formatDate(date) : "Selecionar data"}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={(e, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* === Horários === */}
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Horário Inicial</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowStartPicker(true)}>
              <Text>{startTime ? formatTime(startTime) : "Selecionar hora"}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startTime || new Date()}
                mode="time"
                is24Hour
                display="default"
                onChange={(e, selectedTime) => {
                  setShowStartPicker(false);
                  if (selectedTime) setStartTime(selectedTime);
                }}
              />
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Horário Final</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowEndPicker(true)}>
              <Text>{endTime ? formatTime(endTime) : "Selecionar hora"}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endTime || new Date()}
                mode="time"
                is24Hour
                display="default"
                onChange={(e, selectedTime) => {
                  setShowEndPicker(false);
                  if (selectedTime) setEndTime(selectedTime);
                }}
              />
            )}
          </View>
        </View>

        {/* Local */}
        <Text style={styles.label}>Local</Text>
        <TextInput style={styles.input} value={place} onChangeText={setPlace} placeholder="Nome do local" />

        {/* Mapa */}
        <Text style={[styles.label, { marginTop: 12 }]}>Marque o Local no Mapa</Text>
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
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
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
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  textArea: { height: 90, textAlignVertical: "top" },
  row: { flexDirection: "row", gap: 10 },
  mapContainer: { marginTop: 4, borderRadius: 12, overflow: "hidden" },
  map: { width: "100%", height: 150 },
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
