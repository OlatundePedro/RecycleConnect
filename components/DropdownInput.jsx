import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

export default function DropdownInput({
  label,
  placeholder,
  data,
  value,
  onChange,
}) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;

    return data.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, data]);

  const handleSelect = (item) => {
    onChange(item);
    setVisible(false);
    setSearch("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={styles.dropdown}
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
      >
        <Text style={[styles.value, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>

        <Ionicons name="chevron-down" size={22} color={COLORS.primary} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <View style={styles.searchContainer}>
                  <Ionicons
                    name="search"
                    size={18}
                    color={COLORS.textSecondary}
                  />

                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={search}
                    onChangeText={setSearch}
                    autoFocus
                  />
                </View>

                <FlatList
                  data={filteredData}
                  keyExtractor={(item) => item}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.itemText}>{item}</Text>

                      {value === item && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color={COLORS.primary}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <View style={styles.empty}>
                      <Text style={styles.emptyText}>No results found</Text>
                    </View>
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },

  label: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 10,
  },

  dropdown: {
    height: 58,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  value: {
    fontFamily: FONTS.regular,
    color: COLORS.textPrimary,
    fontSize: 15,
    flex: 1,
  },

  placeholder: {
    color: COLORS.textSecondary,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    maxHeight: "75%",
    overflow: "hidden",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 16,
    height: 56,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  item: {
    height: 54,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },

  itemText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
    flex: 1,
  },

  empty: {
    padding: 24,
    alignItems: "center",
  },

  emptyText: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
});
