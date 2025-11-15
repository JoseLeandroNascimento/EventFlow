import { Evento } from "@/services/eventService";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
} from "react-native";
import { useEffect, useState, useRef } from "react";

const { width } = Dimensions.get("window");

type Props = {
  event: Evento;
  onDetailsPress: () => void;
};

async function forceLoad(url: string): Promise<string> {
  try {
    const resp = await fetch(url);
    const blob = await resp.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return "https://picsum.photos/400/200";
  }
}

export function EventCard({ event, onDetailsPress }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [forcedImages, setForcedImages] = useState<string[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const images = event.imagens?.length
    ? event.imagens
    : ["https://picsum.photos/400/200"];

  useEffect(() => {
    let mounted = true;

    async function loadAll() {
      const loaded = await Promise.all(images.map(forceLoad));
      if (mounted) setForcedImages(loaded);
    }

    loadAll();
    return () => { mounted = false };
  }, [event.imagens]);

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(index);
  }

  function goToImage(index: number) {
    scrollRef.current?.scrollTo({
      x: width * index,
      animated: true,
    });
    setActiveIndex(index);
  }

  return (
    <View style={styles.card}>

      {/* Carrossel */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {forcedImages.map((img, idx) => (
          <Image key={idx} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>

      {/* Bolinhas interativas */}
      <View style={styles.dotContainer}>
        {forcedImages.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => goToImage(index)}
            style={index === activeIndex ? styles.dotActive : styles.dot}
          />
        ))}
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{event.nome}</Text>

          <Text style={styles.priceLabel}>Ingresso</Text>
          <Text style={styles.priceValue}>R$ 00,00</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onDetailsPress}>
          <Text style={styles.buttonText}>Mais Detalhes ▶</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  image: {
    width: width,
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  dotContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 6,
    gap: 6,
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },

  dotActive: {
    width: 8,
    height: 8,
    backgroundColor: "#001AFF",
    borderRadius: 10,
  },

  content: {
    padding: 16,
    flexDirection: "row",
    gap: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  priceLabel: {
    fontSize: 12,
    color: "#555",
  },

  priceValue: {
    fontSize: 16,
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#001AFF",
    height: 38,
    alignSelf: "center",
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
