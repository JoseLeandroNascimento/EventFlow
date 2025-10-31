import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase from "pocketbase";

export const pb = new PocketBase("http://192.168.1.5:8090"); // seu IP
pb.autoCancellation(false);

// Salva token de login automaticamente
pb.authStore.onChange(async () => {
    if (pb.authStore.isValid) {
        await AsyncStorage.setItem("pb_auth", JSON.stringify(pb.authStore.exportToCookie()));
    } else {
        await AsyncStorage.removeItem("pb_auth");
    }
});

// Restaura token salvo ao iniciar
(async () => {
    const data = await AsyncStorage.getItem("pb_auth");
    if (data) {
        pb.authStore.loadFromCookie(JSON.parse(data));
    }
})();
