import AppHeader from "@/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MapView from "react-native-maps";
import { useAuth } from "../contexts/AuthContext";
import { CreateEventData, getEventos, getImageUrl } from "../services/eventService";

export default function EventListScreen() {
    const router = useRouter();
    const { role } = useAuth();
    const [query, setQuery] = useState("");
    const [eventos, setEventos] = useState<CreateEventData[]>([]);
    const [loading, setLoading] = useState(true);

    // === Busca os eventos da API ===
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getEventos();
                setEventos(data);
            } catch (error) {
                console.error("Erro ao carregar eventos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEventos();
    }, []);

    // === Filtro de busca ===
    const filtered = useMemo(() => {
        if (!query.trim()) return eventos;
        const q = query.toLowerCase();
        return eventos.filter(
            (e) =>
                e.name.toLowerCase().includes(q) ||
                e.desc?.toLowerCase().includes(q) ||
                e.category?.toLowerCase().includes(q)
        );
    }, [query, eventos]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
            <AppHeader />

            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 40 }}>
                    <ActivityIndicator size="large" color="#0B1E74" />
                    <Text style={{ color: "#555", marginTop: 8 }}>Carregando eventos...</Text>
                </View>
            ) : (
                <>
                    {/* === ADMIN === */}
                    {role === "admin" && (
                        <View>
                            <View style={styles.adminHeader}>
                                <Text style={styles.listTitle}>Listagem de Eventos</Text>

                                <View style={styles.searchBox}>
                                    <Ionicons name="search" size={16} color="#8E8E93" />
                                    <TextInput
                                        placeholder="Pesquise Eventos"
                                        style={styles.searchInput}
                                        value={query}
                                        onChangeText={setQuery}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={styles.primaryBtn}
                                    onPress={() => router.push("/events/create")}
                                >
                                    <Text style={styles.primaryBtnText}>Criar Evento +</Text>
                                </TouchableOpacity>

                                <Text style={styles.counter}>
                                    Mostrando {filtered.length} de {eventos.length} Eventos
                                </Text>
                            </View>

                            <View style={{ paddingHorizontal: 16 }}>
                                {filtered.map((event) => (
                                    <View key={event.id} style={styles.adminCard}>
                                        <Image
                                            source={{
                                                uri: getImageUrl("events", event.id, event.images[0]),
                                            }}
                                            style={styles.cardImage}
                                            onError={(e) => console.log("❌ Erro ao carregar imagem:", e.nativeEvent.error)}
                                        />
                                        <View style={styles.cardContent}>
                                            <View style={styles.cardHeader}>
                                                <Text numberOfLines={1} style={styles.cardTitle}>
                                                    {event.name}
                                                </Text>
                                                <Text style={styles.cardDate}>{event.date || "Sem data"}</Text>
                                            </View>

                                            <Text style={styles.cardType}>
                                                {event.category || "Sem categoria"}
                                            </Text>

                                            {event.desc ? (
                                                <Text style={styles.cardDesc}>{event.desc}</Text>
                                            ) : (
                                                <Text style={styles.cardDescEmpty}>Sem descrição</Text>
                                            )}

                                            <View style={styles.priceRow}>
                                                <Text style={styles.priceLabel}>Local</Text>
                                                <Text style={styles.priceValue}>{event.place || "—"}</Text>
                                            </View>

                                            <View style={styles.actionRow}>
                                                <TouchableOpacity style={styles.editBtn}>
                                                    <Text style={styles.editText}>Editar</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.deleteBtn}>
                                                    <Text style={styles.deleteText}>Excluir Evento</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={styles.outlineBtn}
                                                    onPress={() =>
                                                        router.push({
                                                            pathname: "/events/detail",
                                                            params: { event: JSON.stringify(event) },
                                                        })
                                                    }
                                                >
                                                    <Text style={styles.outlineText}>Ver</Text>
                                                    <Ionicons name="search" size={14} color="#0B1E74" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* === USER === */}
                    {role === "user" && (
                        <View>
                            <View style={styles.userHeader}>
                                <Text style={styles.welcome}>Bem vindo ao Aplicativo</Text>

                                <View style={styles.searchBox}>
                                    <Ionicons name="search" size={16} color="#8E8E93" />
                                    <TextInput
                                        placeholder="Pesquise Eventos, Show e etc.."
                                        style={styles.searchInput}
                                        value={query}
                                        onChangeText={setQuery}
                                    />
                                </View>

                                <Text style={styles.subtitle}>Explore os Eventos</Text>

                                <View style={styles.mapContainer}>
                                    <MapView
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: -23.55,
                                            longitude: -46.63,
                                            latitudeDelta: 0.05,
                                            longitudeDelta: 0.05,
                                        }}
                                    />
                                    <TouchableOpacity style={styles.mapButton}>
                                        <Text style={styles.mapButtonText}>Explore pelo Mapa</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.counter}>
                                    Mostrando {filtered.length} de {eventos.length} Eventos
                                </Text>
                            </View>

                            <View style={{ paddingHorizontal: 16 }}>
                                {filtered.map((event) => (
                                    <View key={event.id} style={styles.userCard}>
                                        <Image
                                            source={{
                                                uri: getImageUrl("events", event.id, event.images[0]),
                                            }}
                                            style={styles.cardImage}
                                            onError={(e) => console.log("❌ Erro ao carregar imagem:", e.nativeEvent.error)}
                                        />

                                        <View style={styles.cardContent}>
                                            <View style={styles.cardHeader}>
                                                <Text numberOfLines={1} style={styles.cardTitle}>
                                                    {event.name}
                                                </Text>
                                                <Text style={styles.cardDate}>{event.date || "Sem data"}</Text>
                                            </View>

                                            <Text style={styles.cardType}>
                                                {event.category || "Sem categoria"}
                                            </Text>

                                            {event.desc ? (
                                                <Text style={styles.cardDesc}>{event.desc}</Text>
                                            ) : (
                                                <Text style={styles.cardDescEmpty}>Sem descrição</Text>
                                            )}

                                            <View style={styles.priceRow}>
                                                <Text style={styles.priceLabel}>Local</Text>
                                                <Text style={styles.priceValue}>{event.place || "—"}</Text>
                                            </View>

                                            <TouchableOpacity
                                                style={styles.detailsButton}
                                                onPress={() =>
                                                    router.push({
                                                        pathname: "/events/detail",
                                                        params: { event: JSON.stringify(event) },
                                                    })
                                                }
                                            >
                                                <Text style={styles.detailsButtonText}>Mais Detalhes ▸</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    cardDesc: { color: "#444", fontSize: 12, marginBottom: 6 },
    cardDescEmpty: { color: "#aaa", fontSize: 12, marginBottom: 6, fontStyle: "italic" },
    userHeader: { padding: 16 },
    welcome: { fontSize: 16, fontWeight: "600", textAlign: "center", marginBottom: 12 },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E6E6E6",
        borderRadius: 20,
        paddingHorizontal: 12,
        height: 38,
    },
    searchInput: { flex: 1, marginLeft: 6, fontSize: 13 },
    subtitle: { fontWeight: "bold", fontSize: 13, marginTop: 14 },
    mapContainer: { marginTop: 8, borderRadius: 12, overflow: "hidden" },
    map: { width: "100%", height: 120 },
    mapButton: {
        position: "absolute",
        top: "40%",
        left: "20%",
        right: "20%",
        backgroundColor: "#F5F5F5",
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: "center",
    },
    mapButtonText: { fontWeight: "600", color: "#333" },
    counter: { textAlign: "center", color: "#666", fontSize: 12, marginVertical: 8 },
    userCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E8E8E8",
        marginBottom: 16,
    },
    adminCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E8E8E8",
        marginBottom: 16,
    },
    cardImage: { width: "100%", height: 140 },
    cardContent: { padding: 12 },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    cardTitle: { color: "#0B1E74", fontWeight: "700", fontSize: 14, flex: 1, marginRight: 8 },
    cardDate: { color: "#000", fontSize: 12 },
    cardType: { color: "#777", fontSize: 12, marginBottom: 6 },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F3F5FF",
        borderRadius: 6,
        paddingHorizontal: 10,
        height: 32,
        alignItems: "center",
    },
    priceLabel: { color: "#0B1E74", fontWeight: "700", fontSize: 12 },
    priceValue: { color: "#0B1E74", fontWeight: "700", fontSize: 12 },
    detailsButton: {
        backgroundColor: "#0B1E74",
        borderRadius: 6,
        alignItems: "center",
        paddingVertical: 8,
        marginTop: 8,
    },
    detailsButtonText: { color: "#fff", fontSize: 12, fontWeight: "700" },
    adminHeader: { padding: 16 },
    listTitle: { fontWeight: "700", fontSize: 14, marginBottom: 8 },
    primaryBtn: {
        backgroundColor: "#0B1E74",
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: "center",
    },
    primaryBtnText: { color: "#fff", fontWeight: "700" },
    actionRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 10,
        alignItems: "center",
    },
    editBtn: {
        backgroundColor: "#FFC107",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    editText: { color: "#fff", fontWeight: "700", fontSize: 12 },
    deleteBtn: {
        backgroundColor: "#E53935",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    deleteText: { color: "#fff", fontWeight: "700", fontSize: 12 },
    outlineBtn: {
        borderWidth: 1,
        borderColor: "#0B1E74",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    outlineText: { color: "#0B1E74", fontWeight: "700", fontSize: 12 },
});
