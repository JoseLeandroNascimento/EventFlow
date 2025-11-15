import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  images: string[];
  onChange: (imgs: string[]) => void;
};

export function ImageUpload({ images, onChange }: Props) {

  async function pickFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      onChange([...images, result.assets[0].uri]);
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão necessária", "Autorize o uso da câmera para continuar.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled) {
      onChange([...images, result.assets[0].uri]);
    }
  }

  return (
    <View style={styles.wrapper}>
      {images.map((img, i) => (
        <Image key={i} source={{ uri: img }} style={styles.image} />
      ))}

      <TouchableOpacity style={styles.uploadBox} onPress={pickFromGallery}>
        <Ionicons name="image-outline" size={28} color="#777" />
        <Text style={styles.text}>Galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadBox} onPress={takePhoto}>
        <Ionicons name="camera-outline" size={28} color="#777" />
        <Text style={styles.text}>Câmera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  uploadBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  text: { fontSize: 12, color: "#777" },
});
