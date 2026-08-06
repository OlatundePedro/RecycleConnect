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

export default function BankLinkedSuccess() {
  const router = useRouter();
  const { bankLogo, bankName, accountNumber, accountName } =
    useLocalSearchParams();

  const logo = BANK_LOGOS[bankLogo];

  const handleContinue = () => {
    router.replace("/withdraw");
  };

  const handleViewRewards = () => {
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

        <Text style={styles.title}>Bank Linked{"\n"}Successfully!</Text>
        <Text style={styles.subtitle}>
          Your bank account has been{"\n"}securely linked.
        </Text>

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

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.85}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleViewRewards}>
          <Text style={styles.viewRewardsText}>View Rewards</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 32,
  },
  bankCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.0,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 16,
    width: "100%",
  },
  bankLogo: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: 13,
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
  footer: {
    paddingBottom: 28,
    gap: 16,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    fontSize: 16,
  },
  viewRewardsText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: 14,
    textAlign: "center",
  },
});
