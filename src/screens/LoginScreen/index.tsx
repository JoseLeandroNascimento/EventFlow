import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    Alert,
    Text,
    View
} from "react-native";
import { styles } from "./style";
import { Button } from "@/components/buttons/Button";
import { pb } from "@/services/pb";

export function LoginScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !senha) {
            Alert.alert("Erro", "Preencha email e senha.");
            return;
        }

        try {
            setLoading(true);

            await pb.collection("users").authWithPassword(email, senha);

            navigation.navigate("user");

        } catch (error: any) {
            Alert.alert("Erro", error.message || "Não foi possível fazer login.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            {/* LOGO */}
            <View style={styles.logoBox}>
                <Text style={styles.logoText}>Logo</Text>
            </View>

            <Input
                icon="person-outline"
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />


            <Input
                icon="key"
                placeholder="Digite algo..."
                value={senha}
                onChangeText={setSenha}
            />

            {error.length > 0 && <Text style={styles.error}>{error}</Text>}


            <Button title="Entrar" onPress={() => handleLogin()} />

        </View>
    );
}

