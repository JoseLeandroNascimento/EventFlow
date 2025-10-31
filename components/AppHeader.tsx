import { useAuth } from "@/app/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AppHeader() {
  const router = useRouter();
  const { logout, role } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const navigate = (path: string) => {
    setMenuVisible(false);
    router.push(path);
  };

  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // 👈 corrige a sobreposição
        backgroundColor: "#fff",
      }}
    >
      {/* Header Principal */}
      <View style={styles.header}>
        <Text style={styles.logo}>Logo</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Modal do menu lateral */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            <Text style={styles.userTitle}>
              {role === "admin" ? "Administrador" : "Usuário Comum"}
            </Text>

            <View style={styles.divider} />

            {/* Itens de navegação */}
            <TouchableOpacity style={styles.menuItem} onPress={() => navigate("/events")}>
              <Ionicons name="calendar-outline" size={18} color="#0B1E74" />
              <Text style={styles.menuText}>Eventos</Text>
            </TouchableOpacity>

            {role === "admin" && (
              <>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigate("/events/create")}>
                  <Ionicons name="add-circle-outline" size={18} color="#0B1E74" />
                  <Text style={styles.menuText}>Criar Evento</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigate("/locations")}>
                  <Ionicons name="location-outline" size={18} color="#0B1E74" />
                  <Text style={styles.menuText}>Locais</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigate("/locations/create")}
                >
                  <Ionicons name="add-outline" size={18} color="#0B1E74" />
                  <Text style={styles.menuText}>Criar Local</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.divider} />

            {/* Logout */}
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Ionicons name="log-out-outline" size={18} color="#E53935" />
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: { fontSize: 18, fontWeight: "bold", color: "#000" },
  menuButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 6,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  menuContainer: {
    width: "70%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    elevation: 8,
  },
  userTitle: { fontSize: 16, fontWeight: "700", color: "#0B1E74", marginBottom: 10 },
  divider: { height: 1, backgroundColor: "#E0E0E0", marginVertical: 10 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  menuText: { fontSize: 14, color: "#0B1E74", fontWeight: "500" },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  logoutText: { color: "#E53935", fontWeight: "600", fontSize: 14 },
});
