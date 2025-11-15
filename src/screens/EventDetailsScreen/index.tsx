import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Dimensions,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import { styles } from "./style";
import { getEventoById, Evento } from "@/services/eventService";

const { width } = Dimensions.get("window");

export function EventDetailsScreen({ navigation, route }: any) {
    const { id } = route.params;

    const [evento, setEvento] = useState<Evento | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollRef = useRef<ScrollView>(null);


    async function loadEvento() {
        try {
            const data = await getEventoById(id);
            setEvento(data);
        } catch (err) {
            console.log("Erro ao carregar evento", err);
        }
    }

    useEffect(() => {
        loadEvento();
    }, []);


    function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
        const index = Math.round(
            e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
        );
        setActiveIndex(index);
    }

    function goToIndex(index: number) {
        scrollRef.current?.scrollTo({ x: index * width, animated: true });
    }

    function nextImage() {
        if (activeIndex < imagens.length - 1) goToIndex(activeIndex + 1);
    }

    function prevImage() {
        if (activeIndex > 0) goToIndex(activeIndex - 1);
    }

    if (!evento) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Carregando...</Text>
            </View>
        );
    }
    

    const imagens = evento.imagens?.length
        ? evento.imagens
        : ["https://picsum.photos/800/400"];

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            {/* VOLTAR */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageWrapper}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {imagens.map((img, idx) => (
                        <TouchableOpacity
                            key={idx}
                            activeOpacity={1}
                            onPress={(e) => {
                                const x = e.nativeEvent.locationX;
                                if (x < width / 2) prevImage();
                                else nextImage();
                            }}
                        >
                            <Image
                                source={{ uri: img }}
                                style={{ width: width, height: 220 }}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.dotsContainer}>
                    {imagens.map((_, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => goToIndex(idx)}
                            style={idx === activeIndex ? styles.dotActive : styles.dot}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{evento.nome}</Text>
                <Text style={styles.date}>
                    {new Date(evento.dataEvento).toLocaleDateString("pt-BR")}
                </Text>
            </View>

            <Text style={styles.type}>{evento.categoria}</Text>

            <Text style={styles.description}>{evento.descricao}</Text>

            <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Informações do Evento</Text>

                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        <Ionicons name="calendar-outline" size={16} color="#C40233" />
                        <Text style={styles.rowItemLabel}>Data</Text>
                        <Text style={styles.rowItemValue}>
                            {new Date(evento.dataEvento).toLocaleDateString("pt-BR")}
                        </Text>
                    </View>

                    <View style={styles.rowItem}>
                        <Ionicons name="time-outline" size={16} color="#C40233" />
                        <Text style={styles.rowItemLabel}>Horário</Text>
                        <Text style={styles.rowItemValue}>
                            {evento.horaInicio} — {evento.horaFim}
                        </Text>
                    </View>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.priceTitle}>Valor Ingresso</Text>
                    <Text style={styles.priceValue}>R$ 00,00</Text>
                </View>
            </View>

            <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>
                    <Ionicons name="location" size={16} color="#C40233" /> Localização
                </Text>

                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: Number(evento.latitude),
                            longitude: Number(evento.longitude),
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: Number(evento.latitude),
                                longitude: Number(evento.longitude),
                            }}
                        />
                    </MapView>
                </View>

                {evento.local && (
                    <Text style={styles.address}>
                        <Text style={styles.label}>Endereço: </Text>{evento.local.endereco}{"\n"}
                        <Text style={styles.label}>Bairro: </Text>{evento.local.bairro}{"\n"}
                        <Text style={styles.label}>Cidade: </Text>{evento.local.cidade}
                    </Text>
                )}
            </View>

        </ScrollView>
    );
}
