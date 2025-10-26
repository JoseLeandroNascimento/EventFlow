import AppHeader from "@/components/AppHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useAuth } from "../contexts/AuthContext";

export default function CreateLocationScreen() {
    const { role } = useAuth();
    const router = useRouter();

    const [lat, setLat] = useState(-23.55052);
    const [lng, setLng] = useState(-46.633308);
    const [address, setAddress] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [cep, setCep] = useState("");
    const [number, setNumber] = useState("");

    if (role !== "admin") return null;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
            
            <AppHeader />

            <View style={styles.formCard}>
                <Text style={styles.title}>Cadastrar Evento</Text>

                <Text style={styles.label}>Marque no Mapa</Text>
                <MapView
                    style={styles.mapLarge}
                    initialRegion={{ latitude: lat, longitude: lng, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
                    onPress={(e) => {
                        setLat(e.nativeEvent.coordinate.latitude);
                        setLng(e.nativeEvent.coordinate.longitude);
                    }}
                >
                    <Marker coordinate={{ latitude: lat, longitude: lng }} />
                </MapView>

                <Text style={styles.label}>Endereço</Text>
                <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="example" />

                <Text style={styles.label}>Bairro</Text>
                <TextInput style={styles.input} value={neighborhood} onChangeText={setNeighborhood} placeholder="example" />

                <Text style={styles.label}>Cidade</Text>
                <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="example" />

                <View style={{ flexDirection: "row", gap: 12 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>CEP</Text>
                        <TextInput style={styles.input} value={cep} onChangeText={setCep} placeholder="example" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Número</Text>
                        <TextInput style={styles.input} value={number} onChangeText={setNumber} placeholder="example" />
                    </View>
                </View>

                <View style={{ flexDirection: "row", gap: 12 }}>
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

                <View style={styles.dividerRow}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Ou</Text>
                    <View style={styles.divider} />
                </View>

                <TouchableOpacity style={styles.mapCTA}>
                    <Text style={{ color: "#555" }}>Marque no Mapa o Local Desejado</Text>
                </TouchableOpacity>

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
        height: 56, borderBottomWidth: 1, borderBottomColor: "#eee",
        paddingHorizontal: 16, alignItems: "center", flexDirection: "row", justifyContent: "space-between",
    },
    logo: { fontSize: 18, fontWeight: "bold", color: "#000" },

    formCard: { margin: 16, borderWidth: 1, borderColor: "#E8E8E8", borderRadius: 12, backgroundColor: "#fff", padding: 16 },
    title: { fontWeight: "700", fontSize: 15, marginBottom: 12 },

    label: { fontSize: 12, color: "#555", marginBottom: 6, marginTop: 10 },
    input: { height: 40, borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, paddingHorizontal: 12, backgroundColor: "#fff" },

    mapLarge: { height: 120, borderRadius: 12 },

    dividerRow: { flexDirection: "row", alignItems: "center", marginVertical: 10, gap: 8 },
    divider: { height: 1, backgroundColor: "#E0E0E0", flex: 1 },
    dividerText: { color: "#8E8E93", fontSize: 12 },

    mapCTA: {
        height: 42, borderRadius: 8, borderWidth: 1, borderColor: "#DADADA",
        alignItems: "center", justifyContent: "center",
    },

    actions: { flexDirection: "row", gap: 10, marginTop: 16 },
    saveBtn: { flex: 1, backgroundColor: "#0B1E74", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
    saveBtnText: { color: "#fff", fontWeight: "700" },
    cancelBtn: { flex: 1, backgroundColor: "#E53935", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
    cancelBtnText: { color: "#fff", fontWeight: "700" },
});
