import { pb } from "@/services/pb";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export function HeaderMenu() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();


  function toggleMenu() {
    setVisible(!visible);
  }

  function goTo(route: string) {
    setVisible(false);
    navigation.navigate(route as never);
  }

  async function logout() {
    setVisible(false);

    try {
      pb.authStore.clear();
      await AsyncStorage.removeItem("@auth");

      navigation.reset({
        index: 0,
        routes: [{ name: "login" as never }],
      });

    } catch (e) {
      console.log("Logout error:", e);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Logo</Text>

      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Ionicons name="menu" size={22} color="#333" />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdown}>

          <TouchableOpacity style={styles.item} onPress={() => goTo("home")}>
            <Text style={styles.itemText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => goTo("create-event")}>
            <Text style={styles.itemText}>Criar evento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => goTo("event-list")}>
            <Text style={styles.itemText}>Eventos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => goTo("locais-list")}>
            <Text style={styles.itemText}>Locais</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => goTo("profile")} >
            <Text style={styles.itemText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => logout()} >
            <Text style={[styles.itemText, styles.exit]}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
  },

  menuButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },

  dropdown: {
    position: "absolute",
    top: 95,
    right: 16,
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  itemText: {
    fontSize: 16,
    color: "#333",
  },

  exit: {
    color: "red",
    fontWeight: "600",
  },
});
