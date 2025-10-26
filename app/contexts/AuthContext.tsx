// contexts/AuthContext.tsx
import { useRouter } from "expo-router";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Tipos de usuário
type UserRole = "admin" | "user" | null;

interface AuthContextType {
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

// Contexto base
const AuthContext = createContext<AuthContextType>({
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Provider global
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(null);

  const login = (email: string, password: string) => {
    if (email === "admin@email.com" && password === "123456") {
      setRole("admin");
      router.replace("/events");
    } else if (email === "user@email.com" && password === "123456") {
      setRole("user");
      router.replace("/events");
    } else {
      alert("Usuário não cadastrado!");
    }
  };

  const logout = () => {
    setRole(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        isAuthenticated: !!role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook de acesso rápido ao contexto
export const useAuth = () => useContext(AuthContext);

// Hook auxiliar para proteger rotas
export const useProtectedRoute = (router: any, isAuthenticated: boolean) => {
  useEffect(() => {
    const path = router.pathname;

    // se não logado e não está em /login, redireciona para login
    if (!isAuthenticated && path !== "/login") {
      router.replace("/login");
    }

    // se já logado e está na tela de login, manda pra /events
    if (isAuthenticated && path === "/login") {
      router.replace("/events");
    }
  }, [isAuthenticated]);
};
