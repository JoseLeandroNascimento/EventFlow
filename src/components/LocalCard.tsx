import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type Props = {
  local: {
    nome: string;
    latitude: number;
    longitude: number;
  };
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
};

export function LocalCard({ local, onEdit, onView, onDelete }: Props) {
  return (
    <View style={styles.card}>

      {/* EXCLUIR */}
      <TouchableOpacity style={styles.deleteTag} onPress={onDelete}>
        <Text style={styles.deleteText}>Excluir Local</Text>
        <Ionicons name="close" size={14} color="#fff" />
      </TouchableOpacity>

      {/* MAPA REAL */}
      <View style={styles.mapBox}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          initialRegion={{
            latitude: local.latitude,
            longitude: local.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: local.latitude,
              longitude: local.longitude,
            }}
            pinColor="red"
          />
        </MapView>
      </View>

      {/* NOME */}
      <Text style={styles.title}>{local.nome}</Text>

      {/* BOTÕES */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Ionicons name="create-outline" size={16} color="#fff" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewBtn} onPress={onView}>
          <Text style={styles.viewText}>Ver</Text>
          <Ionicons name="search" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 18,
    paddingBottom: 14,
    elevation: 3,
  },

  deleteTag: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "#FF3B48",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deleteText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  mapBox: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 14,
    marginTop: 10,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 14,
    marginTop: 10,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5A623",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
  },

  viewBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#001AFF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },

  viewText: {
    color: "#fff",
    fontWeight: "700",
  },
});
