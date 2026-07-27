import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "../constants/typography";

const COLORS = {
  primary: "#2D7A46",
  primaryLight: "#8FE3A6",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  headerBg: "#F7F9F8",
  border: "#D9E4DD",
  placeholder: "#9AA9A3",
  reliabilityBg: "#D9F2DF",
  white: "#FFFFFF",
};

const NIGERIA_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT (Abuja)",
];

function StateListModal({ visible, selected, onSelect, onClose }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select State</Text>
            <TouchableOpacity onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={22} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={NIGERIA_STATES}
            keyExtractor={(item) => item}
            style={{ maxHeight: 380 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
                {selected === item && (
                  <Ionicons name="checkmark" size={18} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

export default function HouseholdProfile() {
  const router = useRouter();
  const { fullName, email } = useLocalSearchParams();

  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [stateModalVisible, setStateModalVisible] = useState(false);

  const handleUseCurrentLocation = () => {
    // TODO: hook this up to expo-location to reverse-geocode the user's
    // current position into state/area
  };

  const handleSaveLocation = () => {
    // TODO: persist the full profile (fullName, email, state, area,
    // landmark) via the actual API call before navigating
    router.replace({
      pathname: "/household-education",
      params: { fullName, email, state, area, landmark },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerBg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Setup</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Where are you located?</Text>
        <Text style={styles.subtitle}>
          This helps us find the best collection partner in your area.
        </Text>

        {/* Use current location */}
        <TouchableOpacity
          style={styles.currentLocationCard}
          activeOpacity={0.85}
          onPress={handleUseCurrentLocation}
        >
          <View style={styles.pinBadge}>
            <Ionicons name="location" size={26} color={COLORS.primary} />
          </View>
          <Text style={styles.currentLocationText}>Use current location</Text>
        </TouchableOpacity>

        {/* State */}
        <Text style={styles.fieldLabel}>State</Text>
        <TouchableOpacity
          style={styles.stateField}
          activeOpacity={0.7}
          onPress={() => setStateModalVisible(true)}
        >
          <Text style={state ? styles.stateValue : styles.statePlaceholder}>
            {state || "Select State"}
          </Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        {/* Area / Neighborhood */}
        <Text style={styles.fieldLabel}>Area / Neighborhood</Text>
        <View style={styles.fieldWrap}>
          <TextInput
            value={area}
            onChangeText={setArea}
            placeholder="e.g. Lekki Phase 1"
            placeholderTextColor={COLORS.placeholder}
            style={styles.fieldInput}
          />
        </View>

        {/* Nearest Landmark */}
        <View style={styles.landmarkLabelRow}>
          <Text style={styles.fieldLabel}>Nearest Landmark</Text>
          <View style={styles.reliabilityBadge}>
            <Text style={styles.reliabilityText}>HIGH RELIABILITY</Text>
          </View>
        </View>
        <View style={styles.landmarkFieldWrap}>
          <Ionicons
            name="storefront-outline"
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 10 }}
          />
          <TextInput
            value={landmark}
            onChangeText={setLandmark}
            placeholder="e.g. Beside GTBank"
            placeholderTextColor={COLORS.placeholder}
            style={styles.fieldInput}
          />
        </View>
        <Text style={styles.landmarkHelperText}>
          Adding a landmark helps our partners navigate Lagos traffic to reach
          you faster.
        </Text>

        {/* Map preview */}
        <View style={styles.mapWrap}>
          <Image
            source={require("../assets/images/location-map-preview.png")}
            style={styles.mapImage}
            resizeMode="cover"
          />
          <View style={styles.mapBadge}>
            <View style={styles.mapBadgeDot} />
            <Text style={styles.mapBadgeText}>Precise pickup zone enabled</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.saveBtn}
        activeOpacity={0.85}
        onPress={handleSaveLocation}
      >
        <Text style={styles.saveBtnText}>Save Location</Text>
        <Ionicons name="chevron-forward" size={18} color={COLORS.white} />
      </TouchableOpacity>

      <StateListModal
        visible={stateModalVisible}
        selected={state}
        onSelect={(val) => {
          setState(val);
          setStateModalVisible(false);
        }}
        onClose={() => setStateModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, paddingTop: 30 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  currentLocationCard: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 25,
    alignItems: "center",
    marginBottom: 18,
  },
  pinBadge: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  currentLocationText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
  },
  fieldLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  stateField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 18,
  },
  stateValue: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  statePlaceholder: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  fieldWrap: {
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 18,
  },
  fieldInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 0,
  },
  landmarkLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reliabilityBadge: {
    backgroundColor: COLORS.reliabilityBg,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  reliabilityText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    letterSpacing: 0.5,
    color: COLORS.primary,
  },
  landmarkFieldWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 10,
  },
  landmarkHelperText: {
    fontFamily: FONTS.regular,
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  mapWrap: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 8,
  },
  mapImage: {
    width: "190%",
    height: 160,
  },
  mapBadge: {
    position: "absolute",
    left: 12,
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  mapBadgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },
  mapBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    marginHorizontal: 24,
    marginBottom: 28,
  },
  saveBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(16, 56, 47, 0.4)",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F3",
  },
  modalOptionText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
});
