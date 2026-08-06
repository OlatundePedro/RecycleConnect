import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const PICKUPS = [
  {
    id: "1",
    material: "Metal",
    weight: "2.5 kg",
    pricePerKg: "₦1000/kg",
    amount: "₦2,500",
    date: "Today, 11:30 AM",
  },
  {
    id: "2",
    material: "Plastic",
    weight: "2 kg",
    pricePerKg: "₦300/kg",
    amount: "₦600",
    date: "May 19, 11:50 AM",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const handleConfirm = (pickup) => {};

  const handleCancel = (pickup) => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        <Text style={styles.title}>
          You have {PICKUPS.length} pickups awaiting your confirmation
        </Text>

        {PICKUPS.map((pickup) => (
          <View key={pickup.id} style={styles.card}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.materialText}>
                  {pickup.weight} {pickup.material}
                </Text>

                <Text style={styles.detailsText}>
                  {pickup.pricePerKg} - {pickup.date}
                </Text>
              </View>

              <Text style={styles.amountText}>{pickup.amount}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() =>
                  router.push({
                    pathname: "/(pickup)/confirm-rewards",
                    params: {
                      pickup: JSON.stringify(pickup),
                    },
                  })
                }
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#Ffffff",
  },

  content: {
    padding: 20,
    paddingTop: 25,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    marginRight: 12,
  },

  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginLeft: 100,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
    marginBottom: 18,
    lineHeight: 28,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  materialText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },

  detailsText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#8B92A6",
    lineHeight: 24,
  },
  amountText: {
    fontFamily: FONTS.bold,
    fontSize: 23,
    color: COLORS.primary,
    marginLeft: 16,
  },

  buttonRow: {
    marginTop: 10,
  },

  confirmButton: {
    width: "100%",
    height: 46,
    borderRadius: 31,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#49C17A",
  },

  confirmText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
  confirmText: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.white,
  },
});
