// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "./contexts/AuthContext";

/**
 * layout raiz simples.
 * o Stack é o único elemento que o Expo Router precisa renderizar aqui.
 * o AuthProvider envolve tudo pra manter contexto global.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </AuthProvider>
  );
}
