import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BANK_LOGOS } from "../../constants/bankLogos";
import { FONTS } from "../../constants/typography";

const COLORS = {
  primary: "#188A5A",
  textPrimary: "#3F4B47",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  cardBorder: "#E2E8E5",
  white: "#FFFFFF",
};

export default function WithdrawalSuccess() {
  const router = useRouter();
  const { amount, bankName, bankLogo, accountName, accountNumber } =
    useLocalSearchParams();

  const logo = BANK_LOGOS[bankLogo];

  const handleBackToRewards = () => {
    router.replace("/household/rewards");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.content}>
        <Image
          source={require("../../assets/images/check.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Withdrawal{"\n"}Successful!</Text>
        <Text style={styles.subtitle}>₦{amount} has been sent to:</Text>

        <View style={styles.bankCard}>
          {logo && (
            <Image source={logo} style={styles.bankLogo} resizeMode="cover" />
          )}
          <View style={styles.bankCardText}>
            <Text style={styles.bankName}>{bankName}</Text>
            <Text style={styles.accountName}>{accountName}</Text>
            <Text style={styles.accountNumber}>{accountNumber}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.doneButton}
        activeOpacity={0.85}
        onPress={handleBackToRewards}
      >
        <Text style={styles.doneButtonText}>Back to Rewards</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  illustration: {
    width: 220,
    height: 220,
    marginBottom: 24,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 32,
  },
  bankCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 20,
    width: "100%",
  },
  bankLogo: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: 16,
  },
  bankCardText: {
    flex: 1,
  },
  bankName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  accountName: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  accountNumber: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  doneButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    fontSize: 16,
  },
});
