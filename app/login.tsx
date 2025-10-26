import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "./contexts/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>Logo</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={18} color="#444" />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#444"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="key-outline" size={18} color="#444" />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#444"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={() => login(email, password)}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 32 },
  logoBox: {
    backgroundColor: "#E6E6E6",
    width: 140,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: { fontSize: 16, fontWeight: "bold", color: "#555" },
  form: { width: "100%" },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6E6E6",
    borderRadius: 30,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 48,
    gap: 8,
  },
  input: { flex: 1, fontSize: 15, color: "#000" },
  loginBtn: {
    backgroundColor: "#0000C8",
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  loginText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
