import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
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
import StepIndicator from "../../../components/StepIndicator";
import { COLORS } from "../../../constants/colors";
import { FONTS } from "../../../constants/typography";

const DATES = ["May 18", "May 19", "May 20", "May 21", "May 22", "May 23"];
const TIME_SLOTS = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
];

export default function PickupStep3() {
  const router = useRouter();
  const { materials, address } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState("May 20");
  const [selectedTime, setSelectedTime] = useState("10:00 AM – 12:00 PM");
  const [note, setNote] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);

  const handleNext = () => {
    router.push({
      pathname: "/household/pickup/confirm",
      params: {
        materials,
        address,
        date: selectedDate + ", 2024",
        time: selectedTime,
        note,
      },
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
        <Text style={styles.headerTitle}>Schedule Pickup</Text>
        <View style={{ width: 24 }} />
      </View>

      <StepIndicator currentStep={3} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Preferred Date */}
        <Text style={styles.fieldLabel}>Preferred Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {DATES.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.dateChip, selectedDate === d && styles.dateChipActive]}
              onPress={() => setSelectedDate(d)}
            >
              <Text
                style={[
                  styles.dateChipText,
                  selectedDate === d && styles.dateChipTextActive,
                ]}
              >
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.selectedDateDisplay}>
          <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
          <Text style={styles.selectedDateText}>{selectedDate}, 2024</Text>
        </View>

        {/* Preferred Time */}
        <Text style={styles.fieldLabel}>Preferred Time</Text>
        {TIME_SLOTS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.timeSlot, selectedTime === t && styles.timeSlotActive]}
            onPress={() => setSelectedTime(t)}
          >
            <Ionicons
              name="time-outline"
              size={16}
              color={selectedTime === t ? COLORS.primary : COLORS.muted}
            />
            <Text
              style={[
                styles.timeSlotText,
                selectedTime === t && styles.timeSlotTextActive,
              ]}
            >
              {t}
            </Text>
            {selectedTime === t && (
              <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}

        {/* Upload Photos */}
        <Text style={styles.fieldLabel}>Upload Photos (Optional)</Text>
        <Text style={styles.fieldSub}>Add photos of your recyclables</Text>
        <View style={styles.photoRow}>
          {photoAdded && (
            <View style={styles.photoThumb}>
              <Ionicons name="image" size={28} color={COLORS.primary} />
            </View>
          )}
          <TouchableOpacity
            style={styles.photoAddBtn}
            onPress={() => setPhotoAdded(true)}
          >
            <Ionicons name="add" size={28} color={COLORS.muted} />
          </TouchableOpacity>
        </View>

        {/* Note */}
        <Text style={styles.fieldLabel}>Add Note (Optional)</Text>
        <TextInput
          style={styles.noteInput}
          value={note}
          onChangeText={setNote}
          placeholder="E.g., gate code, landmark..."
          placeholderTextColor={COLORS.muted}
          multiline
          numberOfLines={3}
        />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>Next</Text>
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

  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginTop: 16,
  },
  fieldSub: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 10,
    marginTop: -6,
  },

  dateScroll: { marginBottom: 12 },
  dateChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  dateChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateChipText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  dateChipTextActive: { color: COLORS.white },

  selectedDateDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
    marginBottom: 4,
  },
  selectedDateText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },

  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: COLORS.white,
  },
  timeSlotActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  timeSlotText: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  timeSlotTextActive: { color: COLORS.primary },

  photoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 4,
  },
  photoThumb: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  photoAddBtn: {
    width: 72,
    height: 72,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
  },

  noteInput: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    textAlignVertical: "top",
    minHeight: 80,
    backgroundColor: COLORS.white,
  },

  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  backBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  nextBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  nextBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.white,
  },
});
