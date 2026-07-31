import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

export default function CollectorDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={styles.profileRow}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.partner}>Collection Partner</Text>

              <View style={styles.nameRow}>
                <Text style={styles.name}>Greencycle Lagos</Text>

                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={COLORS.white}
                />
              </View>
            </View>
          </View>

          <Text style={styles.walletLabel}>Wallet Balance</Text>

          <Text style={styles.wallet}>₦5,240.00</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/wallet-topup")}
          >
            <Ionicons name="add" size={40} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* TRIP CARD */}

        <View style={styles.tripCard}>
          <View style={styles.tripHeader}>
            <View style={styles.tripLeft}>
              <View style={styles.dot} />

              <Text style={styles.tripHeading}>NEXT SCHEDULED TRIP</Text>
            </View>

            <View style={styles.dayBadge}>
              <Text style={styles.dayText}>TUESDAY</Text>
            </View>
          </View>

          <Text style={styles.zone}>Surulere Zone A</Text>

          <Text style={styles.address}>
            May 14 · 8:00 - 12:00 · Adeniran Ogunsanya
          </Text>

          <Text style={styles.address}>Bode Thomas · Shitta</Text>

          <View style={styles.stats}>
            <View>
              <Text style={styles.statNumber}>42</Text>

              <Text style={styles.statLabel}>HOUSEHOLDS READY</Text>

              <Text style={styles.statSmall}>↑4 Since yesterday</Text>
            </View>

            <View>
              <Text style={styles.statNumber}>185 kg</Text>

              <Text style={styles.statLabel}>EST. VOLUME</Text>

              <Text style={styles.statSmall}>worth a trip</Text>
            </View>
          </View>
          {/* Log Collection */}

          <TouchableOpacity
            style={styles.logButton}
            onPress={() => router.push("/log-collection")}
          >
            <Ionicons
              name="document-text-outline"
              size={22}
              color={COLORS.white}
            />

            <Text style={styles.logButtonText}>Log Collection</Text>
          </TouchableOpacity>

          {/* Today's Summary */}

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Confirmed Today</Text>

              <Text style={styles.summaryValue}>18</Text>

              <Text style={styles.summarySub}>17 completed pickups</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Payment Made Today</Text>

              <Text style={styles.summaryValue}>₦42,800</Text>

              <Text style={styles.summarySub}>Cash paid to households</Text>
            </View>
          </View>

          {/* Buyer Interest */}

          <View style={styles.interestCard}>
            <View style={styles.interestHeader}>
              <View>
                <Text style={styles.interestTitle}>Buyer Interest</Text>

                <Text style={styles.interestSubtitle}>
                  Lagos Recycling Ltd.
                </Text>
              </View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>NEW</Text>
              </View>
            </View>

            <Text style={styles.interestText}>
              Wants 120kg of Plastic bottles.
            </Text>

            <Text style={styles.interestPrice}>₦350/kg</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => router.push("/buyer-request")}
              >
                <Text style={styles.acceptText}>Review & Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.declineButton}>
                <Text style={styles.declineText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    paddingBottom: 30,
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 95,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },

  partner: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  name: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.white,
    marginRight: 6,
  },

  walletLabel: {
    marginTop: 28,
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.white,
  },

  wallet: {
    marginTop: 8,
    fontFamily: FONTS.bold,
    fontSize: 44,
    color: COLORS.white,
  },

  addButton: {
    position: "absolute",
    right: 24,
    bottom: 40,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  tripCard: {
    marginHorizontal: 22,
    marginTop: -55,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: "#D8EEE3",
  },

  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tripLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5B6663",
    marginRight: 10,
  },

  tripHeading: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: "#5B6663",
  },

  dayBadge: {
    backgroundColor: "#F9C74F",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 18,
  },

  dayText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: "#7A4B00",
  },

  zone: {
    marginTop: 18,
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
  },

  address: {
    marginTop: 6,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textSecondary,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
  },

  statNumber: {
    fontFamily: FONTS.bold,
    fontSize: 36,
    color: COLORS.textPrimary,
  },

  statLabel: {
    marginTop: 4,
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textSecondary,
  },

  statSmall: {
    marginTop: 4,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  logButton: {
    marginHorizontal: 22,
    marginTop: 22,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    height: 62,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.white,
    marginLeft: 10,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 22,
    marginTop: 20,
  },

  summaryCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  summaryTitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  summaryValue: {
    marginTop: 10,
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
  },

  summarySub: {
    marginTop: 8,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  interestCard: {
    marginHorizontal: 22,
    marginTop: 24,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  interestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  interestTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },

  interestSubtitle: {
    marginTop: 4,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  badge: {
    backgroundColor: "#FFF4D6",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    fontFamily: FONTS.bold,
    color: "#A56B00",
    fontSize: 12,
  },

  interestText: {
    marginTop: 18,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  interestPrice: {
    marginTop: 8,
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.primary,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  acceptText: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 15,
  },

  declineButton: {
    width: 110,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  declineText: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: 15,
  },
});
