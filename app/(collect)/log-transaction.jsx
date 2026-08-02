import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
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

const COLLECTOR = {
  avatar: require("../../assets/images/profile.png"),
};
const MATERIAL_OPTIONS = [
  { id: "pet", label: "PET Plastic (Clear)", ratePerKg: 120 },
  { id: "hdpe", label: "HDPE Plastic", ratePerKg: 95 },
  { id: "aluminium", label: "Aluminium Cans", ratePerKg: 450 },
  { id: "cardboard", label: "Cardboard", ratePerKg: 80 },
  { id: "mixed-paper", label: "Mixed Paper", ratePerKg: 69 },
  { id: "glass", label: "Glass Bottles", ratePerKg: 25 },
];

const HOUSEHOLD_LOOKUP = {
  "": null,
};
const DEFAULT_HOUSEHOLD = {
  name: "Olamide Adekunle",
  address: "14 Bode Thomas",
};

let nextRowId = 1;

export default function LogCollection() {
  const router = useRouter();
  const [collectionType, setCollectionType] = useState("scheduled");
  const [householdCode, setHouseholdCode] = useState("");
  const [matchedHousehold, setMatchedHousehold] = useState(DEFAULT_HOUSEHOLD);
  const [rows, setRows] = useState([
    { rowId: nextRowId++, materialId: "pet", weight: "8.4", pickerOpen: false },
    {
      rowId: nextRowId++,
      materialId: "cardboard",
      weight: "4",
      pickerOpen: false,
    },
  ]);

  const handleHouseholdCodeChange = (text) => {
    setHouseholdCode(text);

    setMatchedHousehold(text.trim().length > 0 ? DEFAULT_HOUSEHOLD : null);
  };

  const addMaterialRow = () => {
    setRows((prev) => [
      ...prev,
      {
        rowId: nextRowId++,
        materialId: MATERIAL_OPTIONS[0].id,
        weight: "",
        pickerOpen: false,
      },
    ]);
  };

  const removeRow = (rowId) => {
    setRows((prev) => prev.filter((r) => r.rowId !== rowId));
  };

  const updateRow = (rowId, patch) => {
    setRows((prev) =>
      prev.map((r) => (r.rowId === rowId ? { ...r, ...patch } : r)),
    );
  };

  const togglePicker = (rowId) => {
    setRows((prev) =>
      prev.map((r) =>
        r.rowId === rowId
          ? { ...r, pickerOpen: !r.pickerOpen }
          : { ...r, pickerOpen: false },
      ),
    );
  };

  const rowsWithAmounts = useMemo(() => {
    return rows.map((row) => {
      const material = MATERIAL_OPTIONS.find((m) => m.id === row.materialId);
      const weightNum = parseFloat(row.weight);
      const amount =
        material && !Number.isNaN(weightNum)
          ? weightNum * material.ratePerKg
          : 0;
      return { ...row, material, amount };
    });
  }, [rows]);

  const totalPaid = useMemo(
    () => rowsWithAmounts.reduce((sum, r) => sum + r.amount, 0),
    [rowsWithAmounts],
  );

  const canSubmit = matchedHousehold && rows.length > 0 && totalPaid > 0;

  const handleLogTransaction = () => {
    if (!canSubmit) return;
    router.push({
      pathname: "/collector/log-collection-success",
      params: {
        collectionType,
        householdName: matchedHousehold.name,
        totalPaid: String(totalPaid),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Log collection</Text>
          <Image source={COLLECTOR.avatar} style={styles.avatar} />
        </View>
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => router.back()}
          hitSlop={10}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={COLORS.textSecondary}
          />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.typeToggleRow}>
          <TouchableOpacity
            style={[
              styles.typeToggleBtn,
              collectionType === "scheduled" && styles.typeToggleBtnActive,
            ]}
            onPress={() => setCollectionType("scheduled")}
          >
            <Ionicons
              name="clipboard-outline"
              size={18}
              color={
                collectionType === "scheduled"
                  ? COLORS.white
                  : COLORS.textPrimary
              }
            />
            <Text
              style={[
                styles.typeToggleText,
                collectionType === "scheduled" && styles.typeToggleTextActive,
              ]}
            >
              Scheduled
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeToggleBtn,
              collectionType === "dropoff" && styles.typeToggleBtnActive,
            ]}
            onPress={() => setCollectionType("dropoff")}
          >
            <Ionicons
              name="cube-outline"
              size={18}
              color={
                collectionType === "dropoff" ? COLORS.white : COLORS.textPrimary
              }
            />
            <Text
              style={[
                styles.typeToggleText,
                collectionType === "dropoff" && styles.typeToggleTextActive,
              ]}
            >
              Drop-off
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.householdCard}>
          <Text style={styles.fieldLabel}>HOUSEHOLD</Text>
          <TextInput
            style={styles.householdInput}
            value={householdCode}
            onChangeText={handleHouseholdCodeChange}
            placeholder="Enter household code"
            placeholderTextColor={COLORS.muted}
            autoCapitalize="characters"
          />

          {matchedHousehold && (
            <>
              <View style={styles.householdMatch}>
                <Text style={styles.householdMatchText}>
                  {matchedHousehold.name} · {matchedHousehold.address}
                </Text>
              </View>
              <Text style={styles.householdHint}>
                Household will receive an in-app confirmation request.
              </Text>
            </>
          )}
        </View>

        <View style={styles.materialsHeaderRow}>
          <Text style={styles.materialsHeading}>MATERIALS COLLECTED</Text>
          <TouchableOpacity
            style={styles.addMaterialBtn}
            onPress={addMaterialRow}
          >
            <Ionicons name="add" size={16} color={COLORS.primary} />
            <Text style={styles.addMaterialText}>Add material</Text>
          </TouchableOpacity>
        </View>

        {rowsWithAmounts.map((row) => (
          <View key={row.rowId} style={styles.materialBlock}>
            <View style={styles.materialTopRow}>
              <TouchableOpacity
                style={styles.materialPickerToggle}
                onPress={() => togglePicker(row.rowId)}
              >
                <Text style={styles.materialName}>
                  {row.material?.label ?? "Select material"}
                </Text>
                <Ionicons
                  name={row.pickerOpen ? "chevron-up" : "chevron-down"}
                  size={18}
                  color={COLORS.textPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeRow(row.rowId)}
                hitSlop={8}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {row.pickerOpen && (
              <View style={styles.materialOptionsList}>
                {MATERIAL_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.materialOptionRow}
                    onPress={() => {
                      updateRow(row.rowId, {
                        materialId: option.id,
                        pickerOpen: false,
                      });
                    }}
                  >
                    <Text style={styles.materialOptionText}>
                      {option.label}
                    </Text>
                    <Text style={styles.materialOptionRate}>
                      ₦{option.ratePerKg}/kg
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.materialFieldsRow}>
              <View style={styles.materialField}>
                <Text style={styles.materialFieldLabel}>WEIGHT</Text>
                <View style={styles.materialFieldBox}>
                  <TextInput
                    style={styles.materialFieldInput}
                    value={row.weight}
                    onChangeText={(text) =>
                      updateRow(row.rowId, { weight: text })
                    }
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={COLORS.muted}
                  />
                </View>
              </View>
              <View style={styles.materialField}>
                <Text style={styles.materialFieldLabel}>RATE</Text>
                <View style={styles.materialFieldBox}>
                  <Text style={styles.materialFieldStatic}>
                    ₦{row.material?.ratePerKg ?? 0}/kg
                  </Text>
                </View>
              </View>
              <View style={styles.materialField}>
                <Text style={styles.materialFieldLabel}>AMOUNT</Text>
                <View style={styles.materialFieldBox}>
                  <Text style={styles.materialFieldStatic}>
                    ₦{row.amount.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Paid to household */}
        <View style={styles.paidCard}>
          <Text style={styles.paidLabel}>Paid To Household</Text>
          <Text style={styles.paidAmount}>₦{totalPaid.toLocaleString()}</Text>
          <Text style={styles.paidHint}>
            Household will independently confirm this amount.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.logBtn, !canSubmit && styles.logBtnDisabled]}
          onPress={handleLogTransaction}
          disabled={!canSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.logBtnText}>Log transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  backText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  typeToggleRow: { flexDirection: "row", gap: 12, marginBottom: 24 },
  typeToggleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 12,
  },
  typeToggleBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeToggleText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  typeToggleTextActive: { color: COLORS.white },

  householdCard: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  householdInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  householdMatch: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginBottom: 10,
  },
  householdMatchText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  householdHint: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.primary,
  },

  materialsHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  materialsHeading: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  addMaterialBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  addMaterialText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },

  materialBlock: { marginBottom: 24 },
  materialTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  materialPickerToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  materialName: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  materialOptionsList: {
    borderColor: COLORS.border,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  materialOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  materialOptionText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  materialOptionRate: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  materialFieldsRow: { flexDirection: "row", gap: 12 },
  materialField: { flex: 1 },
  materialFieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: COLORS.textSecondary,
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  materialFieldBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  materialFieldInput: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.textPrimary,
    padding: 0,
  },
  materialFieldStatic: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  paidCard: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
  },
  paidLabel: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  paidAmount: {
    fontFamily: FONTS.black,
    fontSize: 28,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  paidHint: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  logBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  logBtnDisabled: { opacity: 0.45 },
  logBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});
