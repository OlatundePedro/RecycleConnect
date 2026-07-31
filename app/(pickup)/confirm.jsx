import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckImage from "../../assets/images/check.png";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

export default function CollectionCompleted() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const receipt = params.receipt ? JSON.parse(String(params.receipt)) : {};

  const MATERIALS_BREAKDOWN = params.breakdown
    ? JSON.parse(String(params.breakdown))
    : [];

  const totalWeight = `${params.weight} kg`;
  const totalAmount = `₦${Number(params.amount).toLocaleString()}.00`;

  const [rating, setRating] = useState(0);
  const [cashReceived, setCashReceived] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Success */}
        <View style={styles.receiptCard}>
          <View style={styles.successIcon}>
            <Image
              source={CheckImage}
              style={styles.checkImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.successTitle}>Collection Complete!</Text>

          <Text style={styles.successSubtitle}>Thank you for recycling.</Text>

          <Text style={styles.successSubtitle}>You've earned</Text>

          <Text style={styles.receiptHeading}>Collection Receipt:</Text>

          <View style={styles.receiptRow}>
            <Text style={styles.left}>Receipt no.</Text>
            <Text style={styles.right}>{receipt.receiptNo}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.left}>Date</Text>
            <Text style={styles.right}>
              {receipt.date} ; {receipt.time}
            </Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.left}>Collection Type</Text>
            <Text style={styles.right}>{receipt.collectionType}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.left}>Partner</Text>
            <Text style={styles.right}>{receipt.partner}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.left}>Location</Text>
            <Text style={styles.right}>{receipt.location}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.left}>Household</Text>
            <Text style={styles.right}>{receipt.household}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.left}>Materials</Text>
            <Text style={styles.right}>{receipt.materials}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.left}>Wt</Text>
            <Text style={styles.right}>{receipt.weight}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment received</Text>

            <Text style={styles.paymentAmount}>
              ₦{Number(receipt.payment).toLocaleString()}.00
            </Text>
          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.replace("/household/home")}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.generated}>
          Receipt generated on {receipt.generated} {"\n"}RecycleConnect
        </Text>

        <Text style={styles.ratingTitle}>Rate your experience</Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <TouchableOpacity key={s} onPress={() => setRating(s)}>
              <Ionicons
                name={s <= rating ? "star" : "star-outline"}
                size={20}
                color={s <= rating ? "#F9C74F" : "#999"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, paddingTop: 5 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 },
  receiptCard: {
    backgroundColor: "#F4F5F6",
    borderRadius: 14,
    padding: 20,
    marginTop: 20,
  },

  successTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  successSubtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  successIcon: {
    alignSelf: "center",
    marginBottom: 10,
  },
  checkImage: {
    width: 90,
    height: 90,
  },
  receiptHeading: {
    marginTop: 25,
    marginBottom: 15,
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },

  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  left: {
    fontFamily: FONTS.medium,
    color: "#8E8E93",
    fontSize: 16,
  },

  right: {
    fontFamily: FONTS.semiBold,
    color: "#000",
    fontSize: 16,
    textAlign: "right",
    flex: 1,
    marginLeft: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 22,
  },

  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentLabel: {
    fontFamily: FONTS.bold,
    fontSize: 19,
  },

  paymentAmount: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: "#2E9E58",
  },

  doneButton: {
    marginTop: 28,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: {
    color: "#FFF",
    fontFamily: FONTS.semiBold,
    fontSize: 16,
  },
  generated: {
    textAlign: "center",
    marginTop: 18,
    color: "#8E8E93",
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 25,
  },
  ratingTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginTop: 25,
  },
  starsRow: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
    marginTop: 5,
  },
});
