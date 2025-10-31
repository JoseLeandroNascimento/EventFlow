import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { pb } from "../services/pocketbase";

interface AuthContextType {
  user: any;
  role: "admin" | "user" | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega usuário salvo no AsyncStorage ao iniciar o app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem("pb_auth");
        if (data) {
          pb.authStore.loadFromCookie(JSON.parse(data));
          if (pb.authStore.isValid) {
            const userRecord = pb.authStore.model;
            setUser(userRecord);
            setRole(userRecord?.role ?? null);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login via PocketBase
  const login = async (email: string, password: string) => {
    try {
      const authData = await pb.collection("users").authWithPassword(email, password);
      const userRecord = authData.record;

      // salva localmente
      await AsyncStorage.setItem("pb_auth", JSON.stringify(pb.authStore.exportToCookie()));

      setUser(userRecord);
      setRole(userRecord?.role ?? null);

      router.replace("/events");
    } catch (error: any) {
      console.error("Erro no login:", error);
      alert("E-mail ou senha incorretos.");
    }
  };

  // Logout
  const logout = async () => {
    pb.authStore.clear();
    await AsyncStorage.removeItem("pb_auth");
    setUser(null);
    setRole(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
