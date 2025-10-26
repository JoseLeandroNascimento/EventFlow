import AppHeader from "@/components/AppHeader";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function EventDetailScreen() {
    const router = useRouter();
    const { event: eventString } = useLocalSearchParams();

    const event = eventString
        ? JSON.parse(Array.isArray(eventString) ? eventString[0] : eventString)
        : null;

    if (!event) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Evento não encontrado.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            {/* Header */}
            <AppHeader />

            {/* Card principal */}
            <View style={styles.card}>
                <Image source={{ uri: event.image }} style={styles.eventImage} />
                <View style={styles.eventHeader}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventType}>{event.type}</Text>
                    </View>
                    <Text style={styles.eventDate}>{event.date}</Text>
                </View>
                <Text style={styles.description}>
                    {event.description ||
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </Text>
            </View>

            {/* Informações do evento */}
            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Informações do Evento</Text>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <MaterialIcons name="calendar-today" size={18} color="#D32F2F" />
                        <Text style={styles.infoLabel}>Data</Text>
                        <Text style={styles.infoValue}>{event.date}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <MaterialIcons name="schedule" size={18} color="#D32F2F" />
                        <Text style={styles.infoLabel}>Horário</Text>
                        <Text style={styles.infoValue}>{event.time || "08:00h — 12:30h"}</Text>
                    </View>
                </View>

                <View style={styles.ticketBox}>
                    <Text style={styles.ticketLabel}>Valor Ingresso</Text>
                    <Text style={styles.ticketValue}>{event.price || "R$ 800"}</Text>
                </View>
            </View>

            {/* Localização */}
            <View style={styles.locationSection}>
                <View style={styles.locationHeader}>
                    <Ionicons name="location-sharp" size={20} color="#D32F2F" />
                    <Text style={styles.sectionTitle}>Localização</Text>
                </View>

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: event.latitude || -23.55052,
                        longitude: event.longitude || -46.633308,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: event.latitude || -23.55052,
                            longitude: event.longitude || -46.633308,
                        }}
                    />
                </MapView>

                <View style={styles.addressBox}>
                    <Text style={styles.addressLine}>
                        <Text style={styles.addressLabel}>Endereço: </Text>
                        {event.address || "Avenida Central, 1234"}
                    </Text>
                    <Text style={styles.addressLine}>
                        <Text style={styles.addressLabel}>Bairro: </Text>
                        {event.neighborhood || "Aurora, Solaris City – SP"}
                    </Text>
                    <Text style={styles.addressLine}>
                        <Text style={styles.addressLabel}>Ponto de Referência: </Text>
                        {event.reference || "Próximo ao Lago da Lua e ao Shopping Estação Aurora"}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#eee",
    },
    backButton: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5",
        borderRadius: 20, paddingVertical: 6, paddingHorizontal: 12,
    },
    backText: { marginLeft: 6, fontSize: 14, fontWeight: "600", color: "#000" },
    logo: { fontSize: 18, fontWeight: "bold", color: "#000" },

    card: { margin: 16, backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", elevation: 2 },
    eventImage: { width: "100%", height: 180 },
    eventHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 10, paddingHorizontal: 12 },
    eventTitle: { fontSize: 16, fontWeight: "bold", color: "#0B1E74", marginBottom: 4 },
    eventType: { fontSize: 14, color: "#555" },
    eventDate: { fontSize: 14, color: "#000", fontWeight: "500" },
    description: { paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, color: "#444", lineHeight: 20 },

    infoSection: { marginHorizontal: 16, marginTop: 8, borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, padding: 16, backgroundColor: "#fff" },
    sectionTitle: { fontSize: 15, fontWeight: "700", color: "#000" },
    infoRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, marginBottom: 8, gap: 16 },
    infoItem: { flex: 1 },
    infoLabel: { fontSize: 13, fontWeight: "600", marginTop: 4, color: "#000" },
    infoValue: { fontSize: 13, color: "#555", marginTop: 2 },

    ticketBox: {
        backgroundColor: "#0B1E74", borderRadius: 8, marginTop: 12,
        flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 16,
    },
    ticketLabel: { color: "#fff", fontWeight: "bold", fontSize: 14 },
    ticketValue: { color: "#fff", fontWeight: "bold", fontSize: 14 },

    locationSection: { margin: 16, borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, backgroundColor: "#fff", padding: 16 },
    locationHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
    map: { width: "100%", height: 150, borderRadius: 12, marginBottom: 12 },
    addressBox: { marginTop: 8 },
    addressLabel: { fontWeight: "bold" },
    addressLine: { fontSize: 13, color: "#333", marginBottom: 4 },
});
