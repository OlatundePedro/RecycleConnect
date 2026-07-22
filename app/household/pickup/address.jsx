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

export default function PickupStep2() {
  const router = useRouter();
  const { materials } = useLocalSearchParams();
  const [address, setAddress] = useState(
    "15 Adeniran Ogunsanya St, Surulere, Lagos, Nigeria"
  );

  const handleNext = () => {
    router.push({
      pathname: "/household/pickup/time",
      params: { materials, address },
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

      <StepIndicator currentStep={2} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Pickup Address</Text>

        {/* Address input */}
        <View style={styles.addressInputWrap}>
          <Ionicons
            name="location-outline"
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.addressInput}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor={COLORS.muted}
            multiline
          />
          <TouchableOpacity onPress={() => setAddress("")}>
            <Ionicons name="close-circle" size={18} color={COLORS.muted} />
          </TouchableOpacity>
        </View>

        {/* Map placeholder */}
        <View style={styles.mapBox}>
          <View style={styles.mapInner}>
            {/* Simulated map grid */}
            {[...Array(6)].map((_, row) => (
              <View key={row} style={styles.mapRow}>
                {[...Array(6)].map((_, col) => (
                  <View key={col} style={styles.mapCell} />
                ))}
              </View>
            ))}
            {/* Map pin */}
            <View style={styles.mapPinWrap}>
              <View style={styles.mapPin}>
                <Ionicons name="location" size={28} color={COLORS.white} />
              </View>
              <View style={styles.mapPinShadow} />
            </View>
          </View>
        </View>

        {/* Use my location */}
        <TouchableOpacity
          style={styles.locationBtn}
          onPress={() =>
            setAddress("15 Adeniran Ogunsanya St, Surulere, Lagos, Nigeria")
          }
        >
          <Ionicons
            name="navigate-circle-outline"
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.locationBtnText}>Use my current location</Text>
        </TouchableOpacity>
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
          style={[styles.nextBtn, !address.trim() && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!address.trim()}
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
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  addressInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },
  addressInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  mapBox: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 200,
    backgroundColor: "#e8f5e9",
  },
  mapInner: {
    flex: 1,
    position: "relative",
  },
  mapRow: { flexDirection: "row", flex: 1 },
  mapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "rgba(24,138,90,0.15)",
    backgroundColor: "transparent",
  },
  mapPinWrap: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -32,
    marginLeft: -16,
    alignItems: "center",
  },
  mapPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  mapPinShadow: {
    width: 12,
    height: 6,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.2)",
    marginTop: 2,
  },

  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  locationBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
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
  nextBtnDisabled: { opacity: 0.45 },
  nextBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.white,
  },
});
