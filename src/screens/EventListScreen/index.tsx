import { AdminEventCard } from "@/components/AdminEventCard";
import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/Input";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, RefreshControl } from "react-native";

import { styles } from "./style";
import { getEventos, Evento } from "@/services/eventService";
import { deleteEvento } from "@/services/eventService";
import { Alert } from "react-native";


export function EventListScreen({ navigation }: any) {
    const [search, setSearch] = useState("");
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);


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

    function onRefresh() {
        setRefreshing(true);
        loadEventos(false);
    }

    async function handleDelete(id: string) {
        Alert.alert(
            "Excluir evento",
            "Tem certeza que deseja excluir este evento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteEvento(id);
                            loadEventos(false);
                        } catch (err) {
                            console.log("Erro ao excluir evento", err);
                        }
                    },
                },
            ]
        );
    }


    useEffect(() => {
        const timer = setTimeout(() => loadEventos(), 300);
        return () => clearTimeout(timer);
    }, [search]);

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
                    <AdminEventCard event={item} onDelete={handleDelete}/>
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
