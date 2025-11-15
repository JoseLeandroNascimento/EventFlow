import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Option =
  | string
  | {
      label: string;
      value: any;
    };

type Props = {
  label: string;
  value: any;                          // agora pode receber string ou qualquer valor
  options: Option[];                   // aceita strings ou objetos
  onChange: (value: any) => void;      // callback genérico
};

export function FormSelect({ label, value, options, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  /** Extrai label baseado no tipo */
  const getLabel = (item: Option) =>
    typeof item === "string" ? item : item.label;

  /** Extrai value baseado no tipo */
  const getValue = (item: Option) =>
    typeof item === "string" ? item : item.value;

  /** Key extractor seguro */
  const getKey = (item: Option) =>
    typeof item === "string" ? item : String(item.value);

  function handleSelect(item: Option) {
    onChange(getValue(item));
    setVisible(false);
  }

  /** Label atual para exibir */
  const selectedLabel =
    typeof value === "string"
      ? value
      : options.find((o) => getValue(o) === value)?.label || "";

  return (
    <View style={styles.container}>
      {/* LABEL */}
      <Text style={styles.label}>{label}</Text>

      {/* SELECT INPUT */}
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.select}>
        <Text style={styles.value}>{selectedLabel || "Selecione"}</Text>
        <Ionicons name="chevron-down" size={18} />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Selecione uma opção</Text>

            <FlatList
              data={options}
              keyExtractor={(item) => getKey(item)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{getLabel(item)}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },

  label: { fontSize: 14, marginBottom: 6 },

  select: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  value: {
    fontSize: 15,
    color: "#333",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "75%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    maxHeight: "70%",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  item: {
    paddingVertical: 12,
  },

  itemText: {
    fontSize: 16,
  },

  closeButton: {
    marginTop: 10,
    backgroundColor: "#eee",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
  },

  closeText: {
    fontSize: 14,
    color: "#333",
  },
});
