import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function OfferAccepted() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successSection}>
          <Image
            source={require("../../assets/images/check.png")}
            style={styles.checkImage}
            resizeMode="contain"
          />

          <Text style={styles.successTitle}>Deal locked in</Text>
        </View>

        <Text style={styles.sectionTitle}>DEAL SUMMARY</Text>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Buyer</Text>
            <Text style={styles.summaryValue}>Lagos Fibre & Pulp Co.</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Material</Text>
            <Text style={styles.summaryValue}>Plastic • 1,200 kg</Text>
          </View>

          <View style={[styles.summaryRow, styles.summaryLastRow]}>
            <Text style={styles.summaryLabel}>Total value</Text>

            <Text style={styles.totalValue}>₦114,000</Text>
          </View>
        </View>
        <View style={styles.timeline}>
          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.completedCircle}>
                <Ionicons name="checkmark" size={22} color={COLORS.white} />
              </View>

              <View style={styles.timelineLine} />
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Buyer notified</Text>

              <Text style={styles.timelineSubtitle}>Just now</Text>
            </View>
          </View>

          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.numberCircle}>
                <Text style={styles.numberText}>2</Text>
              </View>

              <View style={styles.timelineLine} />
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>
                Pickup on Aug 17, 9:00–12:00 am
              </Text>

              <Text style={styles.timelineSubtitle}>
                Bring material to your depot
              </Text>
            </View>
          </View>

          <View style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View style={styles.numberCircle}>
                <Text style={styles.numberText}>3</Text>
              </View>
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Payment on collection</Text>

              <Text style={styles.timelineSubtitle}>
                ₦114,000 to your wallet
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.9}
          onPress={() => router.replace("/collector/home")}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
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
    paddingTop: 30,
    paddingBottom: 40,
  },

  successSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 45,
  },

  checkImage: {
    width: 140,
    height: 140,
    marginBottom: 18,
  },

  successTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 30,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },

  successSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 25,
  },

  sectionTitle: {
    marginBottom: 18,
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },

  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 22,
    marginBottom: 34,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  summaryLastRow: {
    marginBottom: 0,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  summaryLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textSecondary,
  },

  summaryValue: {
    flex: 1,
    textAlign: "right",
    marginLeft: 20,
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  totalValue: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primary,
  },
  timeline: {
    marginBottom: 42,
  },

  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  timelineLeft: {
    width: 42,
    alignItems: "center",
  },

  completedCircle: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  numberCircle: {
    width: 34,
    height: 34,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D4D4D4",
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  numberText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#D9D9D9",
    marginTop: 4,
    marginBottom: 4,
  },

  timelineContent: {
    flex: 1,
    paddingLeft: 16,
    paddingBottom: 28,
  },

  timelineTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  timelineSubtitle: {
    marginTop: 4,
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  homeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },

  homeButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});
