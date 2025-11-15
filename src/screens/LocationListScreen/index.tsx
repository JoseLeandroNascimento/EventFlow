import { useEffect, useState } from "react";
import { Input } from "@/components/Input";
import { LocalCard } from "@/components/LocalCard";
import {
    FlatList,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    View,
    RefreshControl,
} from "react-native";
import { styles } from "./style";
import { getLocais } from "@/services/localService";
import { pb } from "@/services/pb";

export function LocationListScreen({ navigation }) {

    const [locais, setLocais] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");


    async function loadLocais(searchText = "") {
        try {
            setLoading(true);
            const res = await getLocais(searchText);

            setLocais(res.items);
            setTotal(res.totalItems);

        } catch (err) {
            console.log("Erro ao carregar locais:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleRefresh() {
        setRefreshing(true);
        await loadLocais(search);
        setRefreshing(false);
    }


    useEffect(() => {
        loadLocais();
    }, []);


    useEffect(() => {
        const delay = setTimeout(() => loadLocais(search), 400);
        return () => clearTimeout(delay);
    }, [search]);

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Text style={styles.title}>Listagem de Locais</Text>

                        <Input
                            icon="search"
                            placeholder="Buscar por endereço, cidade..."
                            value={search}
                            onChangeText={setSearch}
                        />

                        <TouchableOpacity
                            style={styles.createButton}
                            onPress={() => navigation.navigate("create-local")}
                        >
                            <Text style={styles.createText}>Criar Local +</Text>
                        </TouchableOpacity>

                        <Text style={styles.countText}>
                            Mostrando {locais.length} de {total} Locais Cadastrados
                        </Text>

                        {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
                    </>
                }
                data={locais}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<>
                    <Text style={{textAlign:"center"}} >Nenhum local encontrado</Text>
                </>}
                renderItem={({ item }) => (
                    <LocalCard
                        local={{
                            nome: item.endereco,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            bairro: item.bairro,
                            cidade: item.cidade,
                        }}
                        onEdit={() => navigation.navigate("edit-local", { id: item.id })}
                        onView={() => navigation.navigate("view-local", { id: item.id })}
                        onDelete={async () => {
                            await pb.collection("locais").delete(item.id);
                            loadLocais(search);
                        }}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
        </View>
    );
}
