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

const BREAKDOWN = [
  { label: "Plastic", weight: "1.5 kg", amount: "₦225.00" },
  { label: "Paper", weight: "1.0 kg", amount: "₦100.00" },
  { label: "Glass", weight: "0.4 kg", amount: "₦32.00" },
  { label: "Metal", weight: "0.5 kg", amount: "₦40.00" },
];

export default function DropoffConfirm() {
  const router = useRouter();
  const [stage, setStage] = useState("directions");
  const [dropped, setDropped] = useState(false);

  const totalWeight = "3.4 kg";
  const totalAmount = "₦397.00";
  const transactionId = "RC-2024-06-00125";

  if (stage === "receipt") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Receipt</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.receiptCard}>
            <View style={styles.receiptHub}>
              <View style={styles.receiptHubIcon}>
                <Ionicons name="leaf" size={20} color={COLORS.white} />
              </View>
              <View>
                <Text style={styles.receiptHubName}>EcoCollect Hub</Text>
                <Text style={styles.receiptHubAddress}>Maryland, Ikorodu, Lagos</Text>
              </View>
            </View>

            <View style={styles.receiptDivider} />

            <Text style={styles.receiptTxId}>Transaction ID: {transactionId}</Text>
            <Text style={styles.receiptDate}>June 14, 2024 · 2:34 PM</Text>

            <View style={styles.receiptDivider} />

            {BREAKDOWN.map((item, i) => (
              <View key={i} style={styles.receiptRow}>
                <Text style={styles.receiptLabel}>{item.label}</Text>
                <Text style={styles.receiptWeight}>{item.weight}</Text>
                <Text style={styles.receiptAmount}>{item.amount}</Text>
              </View>
            ))}

            <View style={styles.receiptDivider} />

            <View style={styles.receiptRow}>
              <Text style={styles.receiptTotalLabel}>Total ({totalWeight})</Text>
              <Text style={styles.receiptTotalWeight}></Text>
              <Text style={styles.receiptTotalAmount}>{totalAmount}</Text>
            </View>

            <Text style={styles.receiptThanks}>Thank you for recycling. Together, we make a difference!</Text>
          </View>

          <TouchableOpacity style={styles.downloadBtn}>
            <Ionicons name="download-outline" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
            <Text style={styles.downloadBtnText}>Download Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-social-outline" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
            <Text style={styles.shareBtnText}>Share Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeBtn} onPress={() => router.replace("/household/home")}>
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (stage === "payment") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStage("arrived")} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.paymentSuccess}>
            <View style={styles.successIconWrap}>
              <Ionicons name="checkmark-circle" size={60} color={COLORS.primary} />
            </View>
            <Text style={styles.paymentTitle}>Payment Received!</Text>
            <Text style={styles.paymentAmount}>{totalAmount}</Text>
          </View>

          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Breakdown</Text>
            {BREAKDOWN.map((item, i) => (
              <View key={i} style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>{item.label}</Text>
                <Text style={styles.breakdownWeight}>{item.weight}</Text>
                <Text style={styles.breakdownAmt}>{item.amount}</Text>
              </View>
            ))}
            <View style={styles.breakdownDivider} />
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownTotalLabel}>Total</Text>
              <Text style={styles.breakdownTotalWeight}>{totalWeight}</Text>
              <Text style={styles.breakdownTotalAmt}>{totalAmount}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.homeBtn} onPress={() => setStage("receipt")}>
            <Text style={styles.homeBtnText}>View Receipt</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (stage === "arrived") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setStage("directions")} hitSlop={12}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Drop-off Confirmation</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.arrivedContainer}>
          <View style={styles.arrivedIllustration}>
            <Ionicons name="checkmark-circle" size={72} color={COLORS.primary} />
          </View>
          <Text style={styles.arrivedTitle}>You've arrived!</Text>
          <Text style={styles.arrivedSub}>
            Let the attendant know you're here to drop off your recyclables.
          </Text>
          <View style={styles.arrivedCard}>
            <View style={styles.arrivedRow}>
              <Ionicons name="business-outline" size={16} color={COLORS.primary} />
              <Text style={styles.arrivedHubName}>EcoCollect Hub – Maryland, Ikorodu</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.droppedBtn}
            onPress={() => setStage("payment")}
          >
            <Text style={styles.droppedBtnText}>I've Dropped Off</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // directions stage
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Directions</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Route tabs */}
      <View style={styles.routeTabs}>
        {["Drive", "Walk", "Bike"].map((m) => (
          <TouchableOpacity key={m} style={[styles.routeTab, m === "Drive" && styles.routeTabActive]}>
            <Text style={[styles.routeTabText, m === "Drive" && styles.routeTabTextActive]}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Map */}
      <View style={styles.mapBox}>
        <View style={styles.mapInner}>
          {[...Array(5)].map((_, row) => (
            <View key={row} style={styles.mapRow}>
              {[...Array(5)].map((_, col) => (
                <View key={col} style={styles.mapCell} />
              ))}
            </View>
          ))}
          <View style={styles.mapCurrentPin}>
            <Ionicons name="navigate" size={14} color={COLORS.white} />
          </View>
          <View style={styles.mapDestPin}>
            <Ionicons name="location" size={14} color={COLORS.white} />
          </View>
        </View>
      </View>

      <View style={styles.etaCard}>
        <View>
          <Text style={styles.etaTime}>3 min (0.8 km)</Text>
          <Text style={styles.etaLabel}>Fastest route, light traffic</Text>
        </View>
        <View style={styles.etaHub}>
          <Ionicons name="business-outline" size={16} color={COLORS.primary} />
          <Text style={styles.etaHubName}>EcoCollect Hub</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => setStage("arrived")}
          activeOpacity={0.85}
        >
          <Text style={styles.startBtnText}>Start Directions</Text>
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
  headerTitle: { fontFamily: FONTS.semiBold, fontSize: 17, color: COLORS.textPrimary },
  scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 },

  routeTabs: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  routeTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  routeTabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  routeTabText: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.muted },
  routeTabTextActive: { color: COLORS.white },

  mapBox: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    position: "relative",
  },
  mapInner: { flex: 1, position: "relative" },
  mapRow: { flexDirection: "row", flex: 1 },
  mapCell: { flex: 1, borderWidth: 0.5, borderColor: "rgba(24,138,90,0.1)" },
  mapCurrentPin: {
    position: "absolute",
    top: "60%",
    left: "30%",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4299E1",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  mapDestPin: {
    position: "absolute",
    top: "25%",
    left: "62%",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  etaCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  etaTime: { fontFamily: FONTS.bold, fontSize: 16, color: COLORS.textPrimary, marginBottom: 2 },
  etaLabel: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.muted },
  etaHub: { flexDirection: "row", alignItems: "center", gap: 5 },
  etaHubName: { fontFamily: FONTS.semiBold, fontSize: 13, color: COLORS.primary },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  startBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  startBtnText: { fontFamily: FONTS.semiBold, fontSize: 15, color: COLORS.white },

  // Arrived stage
  arrivedContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
    gap: 16,
  },
  arrivedIllustration: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  arrivedTitle: { fontFamily: FONTS.bold, fontSize: 24, color: COLORS.textPrimary, textAlign: "center" },
  arrivedSub: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 10,
  },
  arrivedCard: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  arrivedRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  arrivedHubName: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.textPrimary, flex: 1 },
  droppedBtn: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  droppedBtnText: { fontFamily: FONTS.semiBold, fontSize: 15, color: COLORS.white },

  // Payment stage
  paymentSuccess: { alignItems: "center", marginBottom: 24 },
  successIconWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  paymentTitle: { fontFamily: FONTS.bold, fontSize: 20, color: COLORS.textPrimary, marginBottom: 6 },
  paymentAmount: { fontFamily: FONTS.bold, fontSize: 32, color: COLORS.primary },

  breakdownCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 24,
    gap: 10,
  },
  breakdownTitle: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 4 },
  breakdownRow: { flexDirection: "row", alignItems: "center" },
  breakdownLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textSecondary, flex: 1 },
  breakdownWeight: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.muted, width: 54, textAlign: "right" },
  breakdownAmt: { fontFamily: FONTS.semiBold, fontSize: 13, color: COLORS.textPrimary, width: 70, textAlign: "right" },
  breakdownDivider: { height: 1, backgroundColor: COLORS.border },
  breakdownTotalLabel: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.textPrimary, flex: 1 },
  breakdownTotalWeight: { fontFamily: FONTS.semiBold, fontSize: 13, color: COLORS.muted, width: 54, textAlign: "right" },
  breakdownTotalAmt: { fontFamily: FONTS.bold, fontSize: 15, color: COLORS.primary, width: 70, textAlign: "right" },

  homeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  homeBtnText: { fontFamily: FONTS.semiBold, fontSize: 15, color: COLORS.white },

  // Receipt stage
  receiptCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    gap: 12,
  },
  receiptHub: { flexDirection: "row", alignItems: "center", gap: 10 },
  receiptHubIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  receiptHubName: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.textPrimary },
  receiptHubAddress: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.muted },
  receiptDivider: { height: 1, backgroundColor: COLORS.border },
  receiptTxId: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.textPrimary },
  receiptDate: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.muted, marginTop: -4 },
  receiptRow: { flexDirection: "row", alignItems: "center" },
  receiptLabel: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.textSecondary, flex: 1 },
  receiptWeight: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.muted, width: 54, textAlign: "right" },
  receiptAmount: { fontFamily: FONTS.semiBold, fontSize: 13, color: COLORS.textPrimary, width: 70, textAlign: "right" },
  receiptTotalLabel: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.textPrimary, flex: 1 },
  receiptTotalWeight: { fontFamily: FONTS.regular, fontSize: 13, color: COLORS.muted, width: 54, textAlign: "right" },
  receiptTotalAmount: { fontFamily: FONTS.bold, fontSize: 15, color: COLORS.primary, width: 70, textAlign: "right" },
  receiptThanks: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.muted, textAlign: "center", lineHeight: 18 },

  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 13,
    marginBottom: 10,
  },
  downloadBtnText: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.primary },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 13,
    marginBottom: 16,
  },
  shareBtnText: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.textPrimary },
});
