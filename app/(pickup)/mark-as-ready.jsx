import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

// pricePerKg is the numeric part of the old display price, used to
// estimate the reward below. Adjust to your real per-kg rates.
const MATERIALS = [
  { id: "plastic", label: "Plastic", icon: "water-outline", pricePerKg: 150 },
  {
    id: "paper",
    label: "Paper",
    icon: "document-text-outline",
    pricePerKg: 100,
  },
  {
    id: "metal",
    label: "Metal",
    icon: "hardware-chip-outline",
    pricePerKg: 80,
  },
  { id: "glass", label: "Glass", icon: "wine-outline", pricePerKg: 80 },
  {
    id: "others",
    label: "Others",
    icon: "ellipsis-horizontal-circle-outline",
    pricePerKg: 60,
  },
];

// Used when the person doesn't type in an estimated weight —
// a rough per-material guess so the screen still shows a number.
const DEFAULT_KG_PER_MATERIAL = 0.8;

export default function MarkAsReady() {
  const router = useRouter();
  const [selected, setSelected] = useState([]);
  const [weightInput, setWeightInput] = useState("");

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );

  const selectedMaterials = useMemo(
    () => MATERIALS.filter((m) => selected.includes(m.id)),
    [selected],
  );

  const estimatedWeightKg = useMemo(() => {
    const typed = parseFloat(weightInput);
    if (!Number.isNaN(typed) && typed > 0) return typed;
    return selectedMaterials.length * DEFAULT_KG_PER_MATERIAL;
  }, [weightInput, selectedMaterials]);

  const estimatedReward = useMemo(() => {
    if (selectedMaterials.length === 0) return 0;
    const avgPricePerKg =
      selectedMaterials.reduce((sum, m) => sum + m.pricePerKg, 0) /
      selectedMaterials.length;
    return Math.round(estimatedWeightKg * avgPricePerKg);
  }, [selectedMaterials, estimatedWeightKg]);

  const handleConfirm = () => {
    router.push({
      pathname: "/(pickup)/collection-partners",
      params: {
        materials: selected.join(","),
        estimatedWeightKg: estimatedWeightKg.toFixed(1),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collection Materials</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          What materials do you have ready?
        </Text>
        <Text style={styles.sectionSub}>
          Select all materials you will set aside before the next collection
          date.
        </Text>

        {/* Material grid */}
        <View style={styles.grid}>
          {MATERIALS.map((m) => {
            const active = selected.includes(m.id);
            return (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.materialCard,
                  active && styles.materialCardActive,
                ]}
                onPress={() => toggle(m.id)}
                activeOpacity={0.8}
              >
                {active && (
                  <View style={styles.checkBadge}>
                    <Ionicons
                      name="checkmark"
                      size={14}
                      color={COLORS.primary}
                    />
                  </View>
                )}
                <View style={styles.materialIconWrap}>
                  <Ionicons
                    name={m.icon}
                    size={28}
                    color={COLORS.primaryDark}
                  />
                </View>
                <Text style={styles.materialLabel}>{m.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Estimated weight input */}
        <View style={styles.weightInputRow}>
          <View style={styles.weightInputTextWrap}>
            <Text style={styles.weightInputLabel}>Enter estimated weight</Text>
            <Text style={styles.weightInputHint}>(This is optional)</Text>
          </View>
          <TextInput
            style={styles.weightInputBox}
            value={weightInput}
            onChangeText={setWeightInput}
            keyboardType="decimal-pad"
            placeholder="kg"
            placeholderTextColor={COLORS.muted}
          />
        </View>

        {/* Estimated total weight */}
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryLabel}>Estimated Total weight</Text>
          <Text style={styles.summaryValue}>
            {estimatedWeightKg.toFixed(1)} kg
          </Text>
          <Text style={styles.summaryCaption}>This is an estimate</Text>
        </View>

        {/* Estimated reward */}
        <View style={styles.summaryBlock}>
          <Text style={styles.summaryLabel}>Estimated Reward</Text>
          <Text style={styles.rewardValue}>
            <Text style={styles.nairaSign}>₦</Text>
            {estimatedReward.toLocaleString()}
          </Text>
          <Text style={styles.summaryCaption}>Based on estimated weight</Text>
        </View>
      </ScrollView>

      {/* Confirm button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            selected.length === 0 && styles.confirmBtnDisabled,
          ]}
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

const CARD_GAP = 14;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24 },

  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  sectionSub: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
    marginBottom: 28,
  },
  materialCard: {
    width: `${(100 - 2 * (CARD_GAP / 3.6)) / 3}%`,
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  materialCardActive: {
    borderColor: COLORS.primary,
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  materialIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#8FE3A4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  materialLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  weightInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  weightInputTextWrap: { flex: 1, paddingRight: 12 },
  weightInputLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  weightInputHint: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  weightInputBox: {
    width: 84,
    height: 56,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    textAlign: "center",
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  summaryBlock: { marginBottom: 26 },
  summaryLabel: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  summaryValue: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  rewardValue: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.primary,
    marginBottom: 4,
  },
  nairaSign: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primary,
  },
  summaryCaption: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  confirmBtn: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  confirmBtnDisabled: { opacity: 0.45 },
  confirmBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.white,
  },
});
