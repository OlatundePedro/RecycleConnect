import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

// Kept in sync with mark-as-ready.jsx's MATERIALS list — same ids,
// icons, and labels, so a material id passed through route params
// resolves back to the right display here.
const MATERIAL_DISPLAY = {
  plastic: { label: "Plastic", icon: "water-outline" },
  paper: { label: "Paper", icon: "document-text-outline" },
  metal: { label: "Metal", icon: "hardware-chip-outline" },
  glass: { label: "Glass", icon: "wine-outline" },
};

const PARTNERS = [
  {
    id: "greencycle-ikorodu",
    name: "GreenCycle Ikorodu",
    verified: true,
    area: "Ikorodu, Lagos",
    nextCollection: {
      date: "Saturday, May 15",
      time: "9:00 AM - 12:30 PM",
      location: "Ikorodu, Lagos",
    },
  },
];

export default function CollectionPartners() {
  const router = useRouter();
  const { materials } = useLocalSearchParams();

  // Whatever the household checked off on mark-as-ready, in order.
  const selectedMaterialIds = (materials ?? "")
    .toString()
    .split(",")
    .filter(Boolean);

  const handleCancelOrder = () => {
    Alert.alert(
      "Cancel Collection",
      "Are you sure you want to cancel this scheduled collection?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Collection Cancelled",
              "Your scheduled collection has been cancelled.",
            );

            // Go back to the pickup screen
            router.replace("/(pickup)/mark-as-ready");
          },
        },
      ],
    );
  };
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedId, setSelectedId] = useState(PARTNERS[0]?.id ?? null);
  const selectedPartner = PARTNERS[0];

  const handleConfirm = () => {
    if (!selectedPartner) return;
    router.push({
      pathname: "/(pickup)/material-confirm",
      params: { partnerId: selectedPartner.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collection Partners</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.confirmedTitle}>
          Your Materials have been Confirmed!
        </Text>

        {/* Partner */}
        <View style={styles.partnerCard}>
          <Text style={styles.partnerName}>{selectedPartner.name}</Text>

          <View style={styles.verifiedRow}>
            <Ionicons name="star" size={12} color="#14834B" />
            <Text style={styles.verifiedText}>Verified Partner</Text>
          </View>

          <View style={styles.areaRow}>
            <Ionicons name="location-outline" size={15} color="#8A9690" />
            <Text style={styles.areaText}>{selectedPartner.area}</Text>
          </View>
        </View>

        {/* Next Collection */}

        <View style={styles.nextCollectionCard}>
          <View style={styles.nextHeaderRow}>
            <View>
              <Text style={styles.nextLabel}>Next Collection</Text>

              <Text style={styles.nextDate}>
                {selectedPartner.nextCollection.date}
              </Text>

              <Text style={styles.nextTime}>
                {selectedPartner.nextCollection.time}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowCancelModal(true)}
            >
              <Text style={styles.cancelBtnText}>Cancel Order</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.areaRow}>
            <Ionicons name="location-outline" size={18} color="#8A9690" />
            <Text style={styles.areaText}>
              {selectedPartner.nextCollection.location}
            </Text>
          </View>
        </View>

        {/* Materials — whatever the household selected on mark-as-ready,
            not the partner's full accepted list. */}
        <View style={styles.materialsRow}>
          {selectedMaterialIds.map((id) => {
            const material = MATERIAL_DISPLAY[id];
            if (!material) return null;
            return (
              <View key={id} style={styles.materialCard}>
                <View style={styles.materialIconCircle}>
                  <Ionicons
                    name={material.icon}
                    size={30}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.materialText}>{material.label}</Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(pickup)/mark-as-ready",
            })
          }
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            !selectedPartner && styles.confirmBtnDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!selectedPartner}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Done</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showCancelModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons
              name="warning-outline"
              size={35}
              color="#E53935"
              style={{ marginBottom: 12 }}
            />

            <Text style={styles.modalTitle}>Cancel Collection?</Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to cancel your scheduled collection?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.keepBtn}
                onPress={() => setShowCancelModal(false)}
              >
                <Text style={styles.keepBtnText}>Keep Collection</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmCancelBtn}
                onPress={() => {
                  setShowCancelModal(false);
                  router.replace("/(pickup)/mark-as-ready");
                }}
              >
                <Text style={styles.confirmCancelText}>Yes, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },

  confirmedTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 26,
  },

  partnerCard: {
    backgroundColor: "#F8FAF9",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },

  partnerName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 8,
  },
  verifiedText: {
    marginLeft: 6,
    fontFamily: FONTS.medium,
    color: "#14834B",
    fontSize: 13,
  },

  areaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  areaText: {
    marginLeft: 8,
    fontFamily: FONTS.regular,
    color: "#8A9690",
    fontSize: 13,
  },

  nextCollectionCard: {
    backgroundColor: "#F8FAF9",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },

  nextHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  nextLabel: {
    fontFamily: FONTS.medium,
    color: "#8A9690",
    fontSize: 13,
    marginBottom: 10,
  },

  nextDate: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
  },

  nextTime: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    marginTop: 4,
    marginBottom: 5,
  },

  cancelBtn: {
    borderWidth: 1,
    borderColor: "#FF3B30",
    borderRadius: 28,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  cancelBtnText: {
    color: "#FF3B30",
    fontFamily: FONTS.medium,
    fontSize: 11,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "70%",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },

  modalMessage: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  keepBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: "center",
  },

  keepBtnText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    fontSize: 12,
  },

  confirmCancelBtn: {
    flex: 1,
    backgroundColor: "#E53935",
    borderRadius: 14,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: "center",
  },

  confirmCancelText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    fontSize: 12,
  },

  materialsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    marginBottom: 18,
  },

  materialCard: {
    width: 92,
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  materialIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: "#8EF08A",
    alignItems: "center",
    justifyContent: "center",
  },

  materialText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: "#707070",
  },

  editText: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 15,
    textDecorationLine: "underline",
    marginTop: 10,
  },

  footer: {
    paddingHorizontal: 22,
    paddingVertical: 20,
  },

  confirmBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },

  confirmBtnText: {
    color: "#FFF",
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
});
