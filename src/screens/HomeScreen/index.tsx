import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@/components/Input";
import { EventCard } from "@/components/EventCard";
import { getEventos, Evento } from "@/services/eventService";
import { styles } from "./style";

export function HomeScreen() {
    const navigation = useNavigation();

    const [search, setSearch] = useState("");
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // -----------------------------------------------------
    // 🔥 Buscar eventos (com filtro opcional)
    // -----------------------------------------------------
    async function loadEventos(showLoader = true) {
        try {
            if (showLoader) setLoading(true);
            const data = await getEventos(search);
            setEventos(data);
        } catch (e) {
            console.log("Erro ao carregar eventos", e);
        } finally {
            if (showLoader) setLoading(false);
        }
    }

    // -----------------------------------------------------
    // 🔄 PULL TO REFRESH
    // -----------------------------------------------------
    async function handleRefresh() {
        try {
            setRefreshing(true);
            await loadEventos(false); // sem o loader grande
        } finally {
            setRefreshing(false);
        }
    }

    // Atualiza a cada digitação (debounce)
    useEffect(() => {
        const timer = setTimeout(loadEventos, 300);
        return () => clearTimeout(timer);
    }, [search]);

    // Primeira carga
    useEffect(() => {
        loadEventos();
    }, []);

    return (
        <FlatList
            data={eventos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 16 }}

            // 🔥 PULL TO REFRESH AQUI 👇
            refreshing={refreshing}
            onRefresh={handleRefresh}

            // 🔥 SEU LAYOUT ORIGINAL (SEM MUDAR NADA)
            ListHeaderComponent={
                <>
                    <Text style={styles.title}>Bem vindo ao Aplicativo</Text>

                    <Input
                        icon="search"
                        placeholder="Pesquise Eventos, Show e etc..."
                        value={search}
                        onChangeText={setSearch}
                    />

                    <Text style={styles.sectionTitle}>Explore os Eventos</Text>

                    <View style={styles.mapContainer}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: -8.0539,
                                longitude: -34.8811,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}
                        />

                        <View style={styles.mapCard}>
                            <Text style={styles.mapCardText}>Explore pelo Mapa</Text>
                        </View>
                    </View>

                    <Text style={styles.countText}>
                        Mostrando {eventos.length} eventos
                    </Text>
                </>
            }

            renderItem={({ item }) => (
                <EventCard
                    event={item}
                    onDetailsPress={() =>
                        navigation.navigate("event-details", { id: item.id } as never)
                    }
                />
            )}

            ListEmptyComponent={
                !loading && (
                    <Text style={{ textAlign: "center", marginTop: 25 }}>
                        Nenhum evento encontrado.
                    </Text>
                )
            }
        />
    );
}
