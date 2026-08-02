import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
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

const COLLECTOR = {
  avatar: require("../../assets/images/profile.png"),
};

const BUYER_INTEREST = {
  id: "lagos-fibre-pulp",
  company: "Lagos Fibre & Pulp Co.",
  timeAgo: "2 Hours Ago",
  material: "Cardboard",
  weightKg: 1200,
};

const INITIAL_INVENTORY = [
  {
    id: "pet",
    label: "PET Plastic (Clear)",
    availableKg: 18.5,
    onHoldKg: 4,
    sold: false,
  },
  {
    id: "aluminium",
    label: "Aluminium Cans",
    availableKg: 88.2,
    onHoldKg: 0,
    sold: true,
  },
  {
    id: "cardboard",
    label: "Cardboard",
    availableKg: 1200,
    onHoldKg: 26,
    sold: true,
  },
  {
    id: "mixed-paper",
    label: "Mixed Paper",
    availableKg: 320,
    onHoldKg: 0,
    sold: true,
  },
];

export default function Stock() {
  const router = useRouter();
  const [interestDismissed, setInterestDismissed] = useState(false);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);

  const handleAccept = () => {
    router.push({
      pathname: "/collector/buyer-interest",
      params: { interestId: BUYER_INTEREST.id, action: "accept" },
    });
  };

  const handleDecline = () => {
    setInterestDismissed(true);
  };

  const handleMarkSold = (item) => {
    if (item.sold) return;
    router.push({
      pathname: "/collector/mark-sold",
      params: { materialId: item.id, availableKg: String(item.availableKg) },
    });
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
            <Text style={styles.eyebrow}>
              Auto-Summed From Logged Collections
            </Text>
            <Text style={styles.title}>Inventory & buyers</Text>
          </View>
          <Image source={COLLECTOR.avatar} style={styles.avatar} />
        </View>

        {!interestDismissed && (
          <View style={styles.interestCard}>
            <View style={styles.interestTopRow}>
              <View style={styles.interestMetaRow}>
                <View style={styles.bellIconWrap}>
                  <Ionicons
                    name="notifications"
                    size={14}
                    color={COLORS.white}
                  />
                </View>
                <Text style={styles.interestMeta}>
                  In-App Interest · {BUYER_INTEREST.timeAgo}
                </Text>
              </View>
              <TouchableOpacity onPress={handleDecline} hitSlop={10}>
                <Ionicons
                  name="close"
                  size={20}
                  color="rgba(255,255,255,0.85)"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.interestCompany}>{BUYER_INTEREST.company}</Text>
            <Text style={styles.interestDetail}>
              Wants to buy your {BUYER_INTEREST.weightKg.toLocaleString()} kg of{" "}
              {BUYER_INTEREST.material}. Accept to share phone numbers and
              coordinate off-app.
            </Text>

            <View style={styles.interestActionsRow}>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={handleAccept}
                activeOpacity={0.85}
              >
                <Text style={styles.acceptBtnText}>Accept & share contact</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineBtn}
                onPress={handleDecline}
                activeOpacity={0.85}
              >
                <Text style={styles.declineBtnText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.inventoryHeaderRow}>
          <Text style={styles.inventoryHeading}>Available In Your Yard</Text>
          <Text style={styles.inventoryUnit}>Per material</Text>
        </View>

        {inventory.map((item) => (
          <View key={item.id} style={styles.inventoryRow}>
            <View style={styles.inventoryLeft}>
              <Text style={styles.inventoryLabel}>{item.label}</Text>
              <View style={styles.inventoryValueRow}>
                <Text style={styles.inventoryValue}>{item.availableKg} kg</Text>
                {!item.sold && (
                  <Text style={styles.inventoryValueUnit}>available</Text>
                )}
              </View>
              {!item.sold && item.onHoldKg > 0 && (
                <Text style={styles.onHoldText}>
                  +{item.onHoldKg} kg on hold (awaiting confirmation)
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={[styles.markSoldBtn, item.sold && styles.soldBtn]}
              onPress={() => handleMarkSold(item)}
              activeOpacity={item.sold ? 1 : 0.85}
              disabled={item.sold}
            >
              {!item.sold && (
                <Ionicons name="checkmark" size={16} color={COLORS.white} />
              )}
              <Text
                style={[
                  styles.markSoldBtnText,
                  item.sold && styles.soldBtnText,
                ]}
              >
                {item.sold ? "Sold" : "Mark sold"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.explainerBanner}>
          <Text style={styles.explainerText}>
            Totals update automatically as you log collections. Confirmed
            households and all general/drop-off entries count immediately.
            Pending or disputed weights stay on hold.
          </Text>
        </View>
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
    marginBottom: 20,
  },
  eyebrow: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primary,
    maxWidth: 240,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 25,
    color: COLORS.textPrimary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
  },
  interestCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 15,
    marginBottom: 28,
  },
  interestTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  interestMetaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  bellIconWrap: {
    width: 23,
    height: 23,
    borderRadius: 13,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  interestMeta: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
  },
  interestCompany: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.white,
    marginBottom: 8,
  },
  interestDetail: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 19,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 15,
  },
  interestActionsRow: { flexDirection: "row", gap: 12 },
  acceptBtn: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 21,
    paddingVertical: 10,
    alignItems: "center",
  },
  acceptBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.primaryDark,
  },
  declineBtn: {
    flex: 1,
    borderWidth: 1.0,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: 21,
    paddingVertical: 10,
    alignItems: "center",
  },
  declineBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.white,
  },
  inventoryHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  inventoryHeading: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  inventoryUnit: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  inventoryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  inventoryLeft: { flex: 1, paddingRight: 12 },
  inventoryLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  inventoryValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 4,
  },
  inventoryValue: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  inventoryValueUnit: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  onHoldText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: "#B9741E",
  },
  markSoldBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 9.5,
  },
  markSoldBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.white,
  },
  soldBtn: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    paddingHorizontal: 25,
    paddingVertical: 9.5,
    width: 105,
    alignSelf: "center",
  },
  soldBtnText: {
    color: COLORS.textSecondary,
    marginLeft: 15,
  },
  explainerBanner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
  },
  explainerText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 22,
    color: COLORS.primary,
  },
});
