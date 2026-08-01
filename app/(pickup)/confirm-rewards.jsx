import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Linking,
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

const NEXT_ROUTE = "/(pickup)/confirm";
const HELP_URL = "https://recycleconnect.example.com/help";

export default function ConfirmCollectionReward() {
  const router = useRouter();
  const { pickup } = useLocalSearchParams();

  const parsedPickup = pickup ? JSON.parse(String(pickup)) : null;

  const REWARD = {
    id: parsedPickup?.id ?? "",
    material: parsedPickup?.material ?? "",
    weightKg: parsedPickup?.weight ?? "",
    amount: Number(String(parsedPickup?.amount ?? "0").replace(/[₦,]/g, "")),
    breakdown: `${parsedPickup?.material ?? ""} - ${parsedPickup?.pricePerKg ?? ""}`,
    partnerName: "GreenCycle Lagos",
    timestamp: parsedPickup?.date ?? "",
    code: "GC087",
  };
  const [receivedCash, setReceivedCash] = useState(false);
  const [amountMatches, setAmountMatches] = useState(false);

  const canConfirm = receivedCash && amountMatches;
  const handleConfirm = () => {
    if (!canConfirm) return;

    const receipt = {
      receiptNo: REWARD.code,
      date: "May 15, 2025",
      time: "11:30 AM",
      collectionType: "Pickup",
      partner: REWARD.partnerName,
      location: "Ikorodu, Lagos",
      household: "John A. - Maryland",
      materials: REWARD.material,
      weight: `${REWARD.weightKg} kg`,
      payment: REWARD.amount,
      generated: "May 15, 2025; 11:32 AM",
    };

    router.push({
      pathname: "/(pickup)/confirm",
      params: {
        receipt: JSON.stringify(receipt),
      },
    });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Collection Reward</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Confirm cash received</Text>
        <Text style={styles.sectionSub}>
          Tick both boxes only if the Collection Partner handed you the correct
          cash amount.
        </Text>

        <View style={styles.rewardCard}>
          <Text style={styles.rewardCardLabel}>Logged by Partner</Text>
          <View style={styles.rewardTopRow}>
            <Text style={styles.rewardWeight}>
              {REWARD.weightKg} {REWARD.material}
            </Text>
            <Text style={styles.rewardAmount}>
              ₦{REWARD.amount.toLocaleString()}.00
            </Text>
          </View>
          <Text style={styles.rewardBreakdown}>{REWARD.breakdown}</Text>
          <Text style={styles.rewardMeta}>
            {REWARD.partnerName}. {REWARD.timestamp} {REWARD.code}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setReceivedCash((v) => !v)}
          activeOpacity={0.75}
        >
          <View
            style={[styles.checkbox, receivedCash && styles.checkboxActive]}
          >
            {receivedCash && (
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
            )}
          </View>
          <Text style={styles.checkLabel}>
            I received cash from the Collection Partner
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAmountMatches((v) => !v)}
          activeOpacity={0.75}
        >
          <View
            style={[styles.checkbox, amountMatches && styles.checkboxActive]}
          >
            {amountMatches && (
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
            )}
          </View>
          <Text style={styles.checkLabel}>
            The amount matches N{REWARD.amount.toLocaleString()}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmBtn, !canConfirm && styles.confirmBtnDisabled]}
          onPress={handleConfirm}
          disabled={!canConfirm}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Confirm Pickup</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>
          Reward issues? Contact{" "}
          <Text
            style={styles.helpLink}
            onPress={() => Linking.openURL(HELP_URL)}
          >
            Help
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, paddingTop: 15 },
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
    flex: 1,
    textAlign: "center",
  },
  scroll: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 24 },

  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  sectionSub: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 24,
  },

  rewardCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 15,
    marginBottom: 32,
  },
  rewardCardLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  rewardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rewardWeight: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  rewardAmount: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  rewardBreakdown: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  rewardMeta: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.primary,
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkLabel: {
    flex: 1,
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  confirmBtnDisabled: { opacity: 0.45 },
  confirmBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
  helpText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  helpLink: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
});
