import { AdminEventCard } from "@/components/AdminEventCard";
import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/Input";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, RefreshControl } from "react-native";

import { styles } from "./style";
import { getEventos, Evento } from "@/services/eventService";

export function EventListScreen({ navigation }: any) {
    const [search, setSearch] = useState("");
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // ----------------------------------
    // 🔥 Carregar eventos da API
    // ----------------------------------
    async function loadEventos(showLoading = true) {
        try {
            if (showLoading) setLoading(true);
            const data = await getEventos(search);
            setEventos(data);
        } catch (err) {
            console.log("Erro ao carregar eventos", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    // 🔄 Atualizar ao puxar a tela
    function onRefresh() {
        setRefreshing(true);
        loadEventos(false);
    }

    // 🔍 Atualizar enquanto o usuário digita (debounce)
    useEffect(() => {
        const timer = setTimeout(() => loadEventos(), 300);
        return () => clearTimeout(timer);
    }, [search]);

    // 📌 Primeira carga
    useEffect(() => {
        loadEventos();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={eventos}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListHeaderComponent={
                    <>
                        <Text style={styles.screenTitle}>Listagem de Eventos</Text>

                        <Input
                            icon="search"
                            placeholder="Pesquise Eventos"
                            value={search}
                            onChangeText={setSearch}
                        />

                        <Button
                            title="Criar Evento +"
                            onPress={() => navigation.navigate("create-event")}
                        />

                        <Text style={styles.countText}>
                            Mostrando {eventos.length} eventos
                        </Text>
                    </>
                }
                renderItem={({ item }) => (
                    <AdminEventCard event={item} />
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    !loading && (
                        <Text style={{ textAlign: "center", marginTop: 30 }}>
                            Nenhum evento encontrado.
                        </Text>
                    )
                }
            />
        </View>
    );
}
