import { FormInput } from "@/components/Form/FormInput";
import { MapPicker } from "@/components/Form/MapPicker";
import { DangerButton } from "@/components/buttons/DangerButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { pb } from "@/services/pb";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { styles } from "./style";

export function CreateLocalScreen({ navigation }) {

    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [loading, setLoading] = useState(false);


    function validarCampos() {
        if (!endereco.trim()) return "Endereço inválido";
        if (!bairro.trim()) return "Bairro inválido";
        if (!cidade.trim()) return "Cidade inválida";

        if (!cep.match(/^\d{8}$/)) {
            return "CEP deve conter 8 números";
        }

        if (isNaN(Number(numero))) {
            return "Número deve ser um valor numérico";
        }

        if (isNaN(Number(latitude))) {
            return "Latitude deve ser numérica";
        }

        if (isNaN(Number(longitude))) {
            return "Longitude deve ser numérica";
        }

        return null;
    }

    async function handleSave() {
        const erro = validarCampos();
        if (erro) {
            Alert.alert("Erro", erro);
            return;
        }

        try {
            setLoading(true);

            await pb.collection("locais").create({
                owner: pb.authStore.record?.id,
                endereco,
                bairro,
                cidade,
                cep,
                numero: Number(numero),
                latitude: Number(latitude),
                longitude: Number(longitude),
            });

            navigation.goBack();

        } catch (error: any) {
            console.log(error);
            Alert.alert("Erro", error.message || "Não foi possível salvar.");
        } finally {
            setLoading(false);
        }
    }

   
    async function preencherComNominatim(lat: number, lng: number) {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;

            const res = await fetch(url, {
                headers: { "User-Agent": "EventFlow/1.0" }
            });

            const data = await res.json();
            const addr = data.address || {};

            setEndereco(addr.road || "");
            setBairro(addr.suburb || addr.neighbourhood || "");
            setCidade(addr.city || addr.town || addr.village || "");
            setCep((addr.postcode || "").replace(/\D/g, ""));
            setNumero(addr.house_number || "");
        } catch (e) {
            console.log("Erro ao buscar endereço:", e);
        }
    }

   
    async function handleSelectMapa(lat: number, lng: number) {
        setLatitude(String(lat));
        setLongitude(String(lng));

        preencherComNominatim(lat, lng);
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            <Text style={styles.title}>Cadastrar Local</Text>

            <MapPicker onSelectLocation={handleSelectMapa} />

            <FormInput label="Endereço" value={endereco} onChangeText={setEndereco} placeholder="example" />
            <FormInput label="Bairro" value={bairro} onChangeText={setBairro} placeholder="example" />
            <FormInput label="Cidade" value={cidade} onChangeText={setCidade} placeholder="example" />

            <View style={styles.row}>
                <FormInput label="CEP" value={cep} onChangeText={setCep} placeholder="00000000" keyboardType="numeric" style={{ flex: 1 }} />
                <View style={{ width: 16 }} />
                <FormInput label="Número" value={numero} onChangeText={setNumero} placeholder="ex: 123" keyboardType="numeric" style={{ flex: 1 }} />
            </View>

            <FormInput label="Latitude" value={latitude} onChangeText={setLatitude} keyboardType="numeric" />
            <FormInput label="Longitude" value={longitude} onChangeText={setLongitude} keyboardType="numeric" />

            <Text style={styles.orText}>Ou{"\n"}Marque no Mapa o Local Desejado</Text>

            <View style={styles.footerRow}>
                <PrimaryButton title={loading ? "Salvando..." : "Salvar"} onPress={handleSave} disabled={loading} />
                <View style={{ width: 12 }} />
                <DangerButton title="Cancelar" onPress={() => navigation.goBack()} />
            </View>
        </ScrollView>
    );
}
