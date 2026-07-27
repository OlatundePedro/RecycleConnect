import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../constants/colors";
import { FONTS } from "../../../constants/typography";

const MATERIALS = [
  {
    id: "plastic",
    label: "Plastic",
    sub: "Bottles, containers",
    icon: "water-outline",
    price: "₦150/kg",
  },
  {
    id: "paper",
    label: "Paper",
    sub: "Newspapers, cardboard",
    icon: "document-text-outline",
    price: "₦100/kg",
  },
  {
    id: "metal",
    label: "Metal",
    sub: "Cans, tins",
    icon: "hardware-chip-outline",
    price: "₦80/kg",
  },
  {
    id: "glass",
    label: "Glass",
    sub: "Bottles, jars",
    icon: "wine-outline",
    price: "₦80/kg",
  },
  {
    id: "others",
    label: "Others",
    sub: "Other recyclables",
    icon: "ellipsis-horizontal-circle-outline",
    price: "Varies",
  },
];

export default function MarkAsReady() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );

  const handleConfirm = () => {
    router.push({
      pathname: "/household/pickup/address",
      params: { materials: selected.join(",") },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mark as Ready</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>What materials do you have?</Text>
        <Text style={styles.sectionSub}>Select all that apply.</Text>

        {/* Prices per kg note */}
        <View style={styles.priceNote}>
          <Ionicons name="information-circle-outline" size={16} color={COLORS.primary} />
          <Text style={styles.priceNoteText}>Prices per kg shown. Final amount depends on actual weight.</Text>
        </View>

        {/* Material list */}
        <View style={styles.materialList}>
          {MATERIALS.map((m, i) => {
            const active = selected.includes(m.id);
            return (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.materialRow,
                  active && styles.materialRowActive,
                  i < MATERIALS.length - 1 && styles.materialRowBorder,
                ]}
                onPress={() => toggle(m.id)}
                activeOpacity={0.75}
              >
                {/* Left icon */}
                <View style={[styles.materialIconWrap, active && styles.materialIconWrapActive]}>
                  <Ionicons
                    name={m.icon}
                    size={20}
                    color={active ? COLORS.white : COLORS.primary}
                  />
                </View>

                {/* Label + sub */}
                <View style={styles.materialTextWrap}>
                  <Text style={[styles.materialLabel, active && styles.materialLabelActive]}>
                    {m.label}
                  </Text>
                  <Text style={styles.materialSub}>{m.sub}</Text>
                </View>

                {/* Price + checkbox */}
                <View style={styles.materialRight}>
                  <Text style={[styles.materialPrice, active && styles.materialPriceActive]}>
                    {m.price}
                  </Text>
                  <View style={[styles.checkbox, active && styles.checkboxActive]}>
                    {active && (
                      <Ionicons name="checkmark" size={14} color={COLORS.white} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Estimated weight */}
        {selected.length > 0 && (
          <View style={styles.weightBox}>
            <View style={styles.weightLeft}>
              <Ionicons name="scale-outline" size={18} color={COLORS.primary} />
              <Text style={styles.weightLabel}>Estimated Total Weight</Text>
            </View>
            <Text style={styles.weightValue}>~2.5 kg</Text>
          </View>
        )}
      </ScrollView>

      {/* Confirm button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, selected.length === 0 && styles.confirmBtnDisabled]}
          onPress={handleConfirm}
          disabled={selected.length === 0}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  sectionSub: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  priceNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  priceNoteText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.primary,
    lineHeight: 17,
  },

  materialList: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginBottom: 20,
  },
  materialRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
    backgroundColor: COLORS.white,
  },
  materialRowActive: { backgroundColor: COLORS.primaryLight },
  materialRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  materialIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  materialIconWrapActive: { backgroundColor: COLORS.primary },
  materialTextWrap: { flex: 1 },
  materialLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  materialLabelActive: { color: COLORS.primary },
  materialSub: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  materialRight: { alignItems: "flex-end", gap: 6 },
  materialPrice: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.muted,
  },
  materialPriceActive: { color: COLORS.primary },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  weightBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  weightLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  weightLabel: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
  },
  weightValue: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.primary,
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmBtnDisabled: { opacity: 0.45 },
  confirmBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
