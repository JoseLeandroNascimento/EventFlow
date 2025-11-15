import { View, StyleSheet } from "react-native";
import MapView, { Marker, MapPressEvent, PROVIDER_GOOGLE } from "react-native-maps";
import { useState } from "react";

type Props = {
  onSelectLocation: (lat: number, lng: number) => void;
};

export function MapPicker({ onSelectLocation }: Props) {
  const [marker, setMarker] = useState({
    latitude: -8.0539,
    longitude: -34.8811,
  });

  function handleMapPress(e: MapPressEvent) {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setMarker({ latitude, longitude });
    onSelectLocation(latitude, longitude); // ← envia para a tela
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        onPress={handleMapPress}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker coordinate={marker} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
});
