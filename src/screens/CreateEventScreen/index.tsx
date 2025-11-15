import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

import { FormDatePicker } from "@/components/Form/FormDatePicker";
import { FormInput } from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { FormTextarea } from "@/components/Form/FormTextarea";
import { FormTimePicker } from "@/components/Form/FormTimePicker";
import { ImageUpload } from "@/components/Form/ImageUpload";
import { MapPicker } from "@/components/Form/MapPicker";
import { DangerButton } from "@/components/buttons/DangerButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { styles } from "./style";

import { pb } from "@/services/pb";
import { getAllLocais } from "@/services/localService";

type LocalPB = {
    id: string;
    endereco: string;
    bairro: string;
    cidade: string;
    latitude: number;
    longitude: number;
};

export function CreateEventScreen({ navigation }) {

    const [locais, setLocais] = useState<LocalPB[]>([]);

    const [categoria, setCategoria] = useState("");
    const [localSelecionado, setLocalSelecionado] = useState(""); // ID do local

    const [images, setImages] = useState<string[]>([]);

    const [dataEvento, setDataEvento] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFim, setHoraFim] = useState("");

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimeStart, setShowTimeStart] = useState(false);
    const [showTimeEnd, setShowTimeEnd] = useState(false);

    // -------------------------------------------------
    // 🚀 Buscar locais no PocketBase
    // -------------------------------------------------
    async function loadLocais() {
        try {
            const list = await getAllLocais();
            setLocais(list);
        } catch (e) {
            console.log(e);
            Alert.alert("Erro", "Não foi possível carregar os locais.");
        }
    }

    useEffect(() => {
        loadLocais();
    }, []);

    // -------------------------------------------------
    // Quando usuário seleciona um local cadastrado
    // preencher latitude/longitude automaticamente
    // -------------------------------------------------
    useEffect(() => {
        if (!localSelecionado) return;

        const local = locais.find((l) => l.id === localSelecionado);
        if (local) {
            setLatitude(String(local.latitude));
            setLongitude(String(local.longitude));
        }
    }, [localSelecionado]);

    // -------------------------------------------------
    // 🚀 Criar evento no PocketBase
    // -------------------------------------------------
    async function handleSalvar() {
        if (!nome || !descricao || !categoria || !dataEvento || !horaInicio || !horaFim) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }

        if (!latitude || !longitude) {
            Alert.alert("Erro", "Localização inválida.");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("nome", nome);
            formData.append("descricao", descricao);
            formData.append("categoria", categoria);
            formData.append("dataEvento", dataEvento.split("/").reverse().join("-"));
            formData.append("horaInicio", horaInicio);
            formData.append("horaFim", horaFim);
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);

            if (localSelecionado) {
                formData.append("local", localSelecionado);
            }

            images.forEach((uri, index) => {
                formData.append("imagens", {
                    uri,
                    name: `image_${index}.jpg`,
                    type: "image/jpeg",
                } as any);
            });

            formData.append("owner", pb.authStore.record?.id || "");

            await pb.collection("eventos").create(formData);

            Alert.alert("Sucesso", "Evento cadastrado com sucesso!");
            navigation.goBack();

        } catch (error: any) {
            console.log("Erro ao salvar:", error);
            Alert.alert("Erro", error.message || "Não foi possível salvar.");
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <Text style={styles.title}>Cadastrar Evento</Text>

            {/* Upload de imagens */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                <ImageUpload images={images} onChange={setImages} />
            </ScrollView>

            <FormInput label="Nome" value={nome} onChangeText={setNome} />
            <FormTextarea label="Descrição" value={descricao} onChangeText={setDescricao} />

            {/* Seleção de categoria */}
            <FormSelect
                label="Categoria"
                value={categoria}
                options={[
                    { label: "Show", value: "Show" },
                    { label: "Palestra", value: "Palestra" },
                    { label: "Festival", value: "Festival" },
                ]}
                onChange={setCategoria}
            />

            {/* Data */}
            <FormDatePicker
                label="Data do Evento"
                value={dataEvento}
                onPress={() => setShowDatePicker(true)}
            />

            {showDatePicker && (
                <DateTimePicker
                    mode="date"
                    value={new Date()}
                    onChange={(_, d) => {
                        setShowDatePicker(false);
                        if (d) setDataEvento(d.toLocaleDateString("pt-BR"));
                    }}
                />
            )}

            {/* Horários */}
            <View style={styles.row}>
                <FormTimePicker
                    label="Horário Inicial"
                    value={horaInicio}
                    onPress={() => setShowTimeStart(true)}
                />
                {showTimeStart && (
                    <DateTimePicker
                        mode="time"
                        is24Hour
                        value={new Date()}
                        onChange={(_, t) => {
                            setShowTimeStart(false);
                            if (t) setHoraInicio(t.toLocaleTimeString("pt-BR").slice(0, 5));
                        }}
                    />
                )}

                <View style={{ width: 10 }} />

                <FormTimePicker
                    label="Horário Final"
                    value={horaFim}
                    onPress={() => setShowTimeEnd(true)}
                />
                {showTimeEnd && (
                    <DateTimePicker
                        mode="time"
                        is24Hour
                        value={new Date()}
                        onChange={(_, t) => {
                            setShowTimeEnd(false);
                            if (t) setHoraFim(t.toLocaleTimeString("pt-BR").slice(0, 5));
                        }}
                    />
                )}
            </View>

            {/* Locais do PB */}
            <FormSelect
                label="Locais"
                value={localSelecionado}
                options={locais.map((l) => ({
                    label: `${l.endereco} - ${l.bairro}`,
                    value: l.id,
                }))}
                onChange={setLocalSelecionado}
            />

            <Text style={styles.orText}>
                Ou{"\n"}Marque no Mapa o Local Desejado
            </Text>

            <MapPicker
                onSelectLocation={(lat, lng) => {
                    setLatitude(lat.toString());
                    setLongitude(lng.toString());
                }}
            />

            <FormInput label="Latitude" value={latitude} onChangeText={setLatitude} />
            <FormInput label="Longitude" value={longitude} onChangeText={setLongitude} />

            <View style={styles.footerRow}>
                <PrimaryButton title="Salvar" onPress={handleSalvar} />
                <View style={{ width: 16 }} />
                <DangerButton title="Cancelar" onPress={() => navigation.goBack()} />
            </View>

        </ScrollView>
    );
}
