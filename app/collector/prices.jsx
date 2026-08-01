import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

// Swap for the logged-in collector's real data.
const COLLECTOR = {
  avatar: require("../../assets/images/profile.png"),
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Price step used by the +/- buttons, in Naira.
const PRICE_STEP = 1;

const INITIAL_MATERIALS = [
  { id: "pet", label: "PET Plastic (Clear)", price: 128 },
  { id: "hdpe", label: "HDPE Plastic", price: 95 },
  { id: "aluminium", label: "Aluminium Cans", price: 450 },
  { id: "cardboard", label: "Cardboard", price: 88 },
  { id: "mixed-paper", label: "Mixed Paper", price: 69 },
  { id: "glass", label: "Glass Bottles", price: 25 },
];

export default function PricesAndSchedule() {
  const [scheduledCollectionOn, setScheduledCollectionOn] = useState(true);
  const [dropoffOn, setDropoffOn] = useState(true);
  const [selectedDays, setSelectedDays] = useState(["Tue", "Thu", "Fri"]);
  const [fromTime, setFromTime] = useState("08:00 AM");
  const [toTime, setToTime] = useState("12:00 PM");
  const [landmark, setLandmark] = useState(
    "GreenNode yard, 22 Bode Thomas — blue gate beside Ebeano",
  );
  const [openingHours, setOpeningHours] = useState("Mon–Sat, 9:00 – 17:00");
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const adjustPrice = (id, delta) => {
    setMaterials((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, price: Math.max(0, m.price + delta) } : m,
      ),
    );
  };

  const scheduleSummary = useMemo(() => {
    if (selectedDays.length === 0) return null;
    // Placeholder count — swap for the real number of households that
    // requested this day/time combo once that data exists.
    return `1 households said ${selectedDays[0]} ${fromTime}–${toTime}`;
  }, [selectedDays, fromTime, toTime]);

  const handlePublish = () => {
    // Send scheduledCollectionOn, selectedDays, fromTime, toTime,
    // dropoffOn, landmark, openingHours, and materials to your API here.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Visible To Households</Text>
            <Text style={styles.title}>Prices & schedule</Text>
          </View>
          <Image source={COLLECTOR.avatar} style={styles.avatar} />
        </View>

        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>
            Everything on this screen goes live immediately for households in
            your area.
          </Text>
        </View>

        {/* Scheduled collection */}
        <View style={styles.scheduleCard}>
          <View style={styles.scheduleTopRow}>
            <View style={styles.scheduleTopLeft}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name="clipboard-outline"
                  size={18}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.scheduleTitle}>Scheduled collection</Text>
            </View>
            <Switch
              value={scheduledCollectionOn}
              onValueChange={setScheduledCollectionOn}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>

          {scheduledCollectionOn && (
            <>
              <Text style={styles.fieldLabel}>DAYS</Text>
              <View style={styles.daysRow}>
                {DAYS.map((day) => {
                  const active = selectedDays.includes(day);
                  return (
                    <TouchableOpacity
                      key={day}
                      style={[styles.dayPill, active && styles.dayPillActive]}
                      onPress={() => toggleDay(day)}
                    >
                      <Text
                        style={[
                          styles.dayPillText,
                          active && styles.dayPillTextActive,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.timeRow}>
                <View style={styles.timeField}>
                  <Text style={styles.fieldLabel}>FROM</Text>
                  <TouchableOpacity style={styles.timeBox}>
                    <Text style={styles.timeBoxText}>{fromTime}</Text>
                    <Ionicons
                      name="time-outline"
                      size={18}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.timeField}>
                  <Text style={styles.fieldLabel}>TO</Text>
                  <TouchableOpacity style={styles.timeBox}>
                    <Text style={styles.timeBoxText}>{toTime}</Text>
                    <Ionicons
                      name="time-outline"
                      size={18}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {scheduleSummary && (
                <Text style={styles.scheduleSummary}>{scheduleSummary}</Text>
              )}
            </>
          )}
        </View>

        {/* Drop-off */}
        <View style={styles.dropoffRow}>
          <View style={styles.scheduleTopLeft}>
            <View style={styles.iconWrap}>
              <Ionicons name="cube-outline" size={18} color={COLORS.primary} />
            </View>
            <Text style={styles.scheduleTitle}>Drop-off</Text>
          </View>
          <Switch
            value={dropoffOn}
            onValueChange={setDropoffOn}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        {dropoffOn && (
          <>
            <Text style={styles.dropoffHint}>
              Households Can Bring Materials To Your Yard
            </Text>

            <Text style={styles.fieldLabel}>
              Landmark / Location Description
            </Text>
            <View style={styles.editableField}>
              <TextInput
                style={styles.editableInput}
                value={landmark}
                onChangeText={setLandmark}
                multiline
              />
              <Ionicons name="pencil" size={16} color={COLORS.textSecondary} />
            </View>

            <Text style={styles.fieldLabel}>Opening Hours</Text>
            <View style={styles.editableField}>
              <TextInput
                style={styles.editableInput}
                value={openingHours}
                onChangeText={setOpeningHours}
              />
            </View>

            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={15}
                color={COLORS.textSecondary}
              />
              <Text style={styles.locationText}>{landmark}</Text>
            </View>
          </>
        )}

        {/* Buying prices */}
        <View style={styles.pricesHeaderRow}>
          <Text style={styles.pricesHeading}>Buying Prices</Text>
          <Text style={styles.pricesUnit}>₦ per kg</Text>
        </View>

        {materials.map((m, index) => (
          <View
            key={m.id}
            style={[
              styles.materialRow,
              index < materials.length - 1 && styles.materialRowDivider,
            ]}
          >
            <View>
              <Text style={styles.materialLabel}>{m.label}</Text>
              <Text style={styles.materialSub}>per kg</Text>
            </View>
            <View style={styles.materialControls}>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => adjustPrice(m.id, -PRICE_STEP)}
              >
                <Ionicons name="remove" size={16} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.materialPrice}>₦{m.price}</Text>
              <TouchableOpacity
                style={[styles.stepBtn, styles.stepBtnFilled]}
                onPress={() => adjustPrice(m.id, PRICE_STEP)}
              >
                <Ionicons name="add" size={16} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.publishBtn}
          onPress={handlePublish}
          activeOpacity={0.85}
        >
          <Text style={styles.publishBtnText}>Publish updates</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 20, paddingTop: 35, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  eyebrow: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
  },
  infoBanner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
  },
  infoBannerText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primary,
  },

  scheduleCard: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
  },
  scheduleTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  scheduleTopLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },

  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  daysRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  dayPill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
  },
  dayPillActive: { backgroundColor: COLORS.primary },
  dayPillText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  dayPillTextActive: { color: COLORS.white },

  timeRow: { flexDirection: "row", gap: 14, marginBottom: 14 },
  timeField: { flex: 1 },
  timeBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  timeBoxText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  scheduleSummary: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  dropoffRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dropoffHint: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 14,
  },

  editableField: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 16,
    gap: 10,
  },
  editableInput: {
    flex: 1,
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    padding: 0,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 24,
  },
  locationText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  pricesHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  pricesHeading: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.primary,
  },
  pricesUnit: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  materialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  materialRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  materialLabel: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  materialSub: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.primary,
  },
  materialControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBtnFilled: { backgroundColor: COLORS.primary },
  materialPrice: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.primary,
    minWidth: 50,
    textAlign: "center",
  },

  publishBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  publishBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
});
