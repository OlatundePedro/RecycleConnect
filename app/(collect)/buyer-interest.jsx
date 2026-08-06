import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
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

const OFFER = {
  company: "Lagos Fibre & Pulp Co.",
  location: "Ikeja, Lagos",
  distance: "3.2 km away",
  verified: true,
  deals: 12,

  material: "Plastic",
  quantity: "1,200 kg",
  price: "₦95/kg",
  total: "₦114,000",

  marketPrice: "₦88/kg",
  difference: "8%",

  pickupDate: "Friday, 16 May",
  address: "42 Acme Road, Ogba, Lagos",
};

export default function BuyerOffer() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Buyer Offer</Text>

          <View style={{ width: 28 }} />
        </View>

        <View style={styles.headerDivider} />

        {/* Company Section */}
        <View style={styles.companyRow}>
          <View style={styles.companyIcon}>
            <Ionicons name="business" size={30} color={COLORS.white} />
          </View>

          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{OFFER.company}</Text>

            <Text style={styles.companyLocation}>
              {OFFER.location} • {OFFER.distance}
            </Text>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgesRow}>
          <View style={styles.verifiedBadge}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={COLORS.primary}
            />
            <Text style={styles.verifiedText}>Verified buyer</Text>
          </View>

          <View style={styles.dealsBadge}>
            <Text style={styles.dealsText}>{OFFER.deals} past deals</Text>
          </View>
        </View>
        {/* Offer Details */}
        <Text style={styles.sectionTitle}>OFFER DETAILS</Text>

        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Material</Text>
            <Text style={styles.detailValue}>Plastic</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>1,200 kg</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Offered price</Text>
            <Text style={styles.detailValue}>₦95/kg</Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.detailRow}>
            <Text style={styles.totalLabel}>Total value</Text>
            <Text style={styles.totalValue}>₦114,000</Text>
          </View>
        </View>
        {/* Market Comparison */}
        <View style={styles.marketBanner}>
          <Ionicons
            name="trending-up"
            size={20}
            color={COLORS.primary}
            style={styles.marketIcon}
          />

          <Text style={styles.marketText}>
            Your current plastic price is{" "}
            <Text style={styles.marketBold}>₦88/kg</Text>. This offer is{" "}
            <Text style={styles.marketBold}>8% above market.</Text>
          </Text>
        </View>
        {/* Pickup */}
        <Text style={styles.sectionTitle}>PICKUP</Text>

        <View style={styles.card}>
          <View style={styles.pickupRow}>
            <View style={styles.pickupIcon}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.pickupContent}>
              <Text style={styles.pickupLabel}>Preferred pickup</Text>
              <Text style={styles.pickupValue}>Friday, 16 May</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.pickupRow}>
            <View style={styles.pickupIcon}>
              <Ionicons
                name="location-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.pickupContent}>
              <Text style={styles.pickupLabel}>Delivery location</Text>

              <Text style={styles.pickupAddress}>Lagos Fibre & Pulp Co.</Text>

              <Text style={styles.pickupSub}>42 Acme Road, Ogba, Lagos</Text>
            </View>
          </View>
        </View>
        {/* Action Buttons */}
        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.acceptButton}
            activeOpacity={0.9}
            onPress={() => router.push("/(collect)/offer-accepted")}
          >
            <Text style={styles.acceptButtonText}>Accept Offer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.declineButton}
            activeOpacity={0.9}
            onPress={() => router.back()}
          >
            <Text style={styles.declineButtonText}>Decline Offer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 18,
  },

  backButton: {
    width: 30,
  },

  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },

  headerDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 28,
  },

  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  companyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F4A300",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  companyInfo: {
    flex: 1,
  },

  companyName: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },

  companyLocation: {
    marginTop: 4,
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  companySection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  companyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F4A100",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  companyInfo: {
    flex: 1,
  },

  companyName: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  companyLocation: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  badgesRow: {
    flexDirection: "row",
    marginBottom: 28,
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  verifiedText: {
    marginLeft: 6,
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primary,
  },

  dealsBadge: {
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    paddingHorizontal: 16,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  dealsText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 14,
    letterSpacing: 0.6,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 22,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  detailLabel: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textSecondary,
  },

  detailValue: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  cardDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 18,
  },

  totalLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  totalValue: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primary,
  },
  marketBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EAF7EF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 28,
  },

  marketIcon: {
    marginTop: 2,
    marginRight: 10,
  },

  marketText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.primary,
  },

  marketBold: {
    fontFamily: FONTS.bold,
  },
  pickupRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  pickupIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  pickupContent: {
    flex: 1,
  },

  pickupLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  pickupValue: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },

  pickupAddress: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  pickupSub: {
    marginTop: 4,
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  pickupRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  pickupContent: {
    flex: 1,
    marginLeft: 14,
  },

  pickupTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  pickupValue: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },

  pickupAddress: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  pickupSub: {
    marginTop: 2,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },

  pickupDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 18,
  },

  noteCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 26,
  },

  noteText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.primary,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 40,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },

  acceptButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.white,
  },

  declineButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },

  declineButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
});
