import PocketBase from "pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const pb = new PocketBase("https://event-flow-api-production.up.railway.app");

// Salva/restaura automaticamente
pb.authStore.loadFromCookie(async () => {
  const saved = await AsyncStorage.getItem("@auth");
  return saved || "";
});

pb.authStore.onChange(async () => {
  await AsyncStorage.setItem("@auth", pb.authStore.exportToCookie());
});
