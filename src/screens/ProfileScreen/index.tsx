import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

export function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/300",
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.hello}>Olá,</Text>
            <Text style={styles.userName}>YARA DE OLIVEIRA MATOS</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* MENU LIST */}
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Minha Conta</Text>
        <Ionicons name="person-circle-outline" size={22} color="#3AA776" />
      </TouchableOpacity>
      <View style={styles.line} />

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Termos de Uso e Política de Privacidade</Text>
        <Ionicons name="document-text-outline" size={22} color="#3AA776" />
      </TouchableOpacity>
      <View style={styles.line} />

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Notificação</Text>
        <Ionicons name="notifications-outline" size={22} color="#3AA776" />
      </TouchableOpacity>
      <View style={styles.line} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.replace("login")}
      >
        <Text style={[styles.itemText, styles.exit]}>Sair</Text>
        <Ionicons name="exit-outline" size={22} color="#3AA776" />
      </TouchableOpacity>
      <View style={styles.line} />

    </View>
  );
}
