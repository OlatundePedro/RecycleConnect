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

const FEATURES = [
  {
    id: "secured",
    icon: "shield-checkmark-outline",
    title: "Secured and Verified",
    description: "Your details are safe with us.",
  },
  {
    id: "fast",
    icon: "sync-outline",
    title: "Fast Payouts",
    description: "Get paid directly to your bank.",
  },
  {
    id: "easy",
    icon: "thumbs-up-outline",
    title: "Easy and Reliable",
    description: "One time set up.",
  },
];

const NEXT_ROUTE = "/(redeem)/select-bank";

export default function LinkBankAccountIntro() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={21} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Link Bank Account</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/images/bank illustration.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Withdraw your{"\n"}Cash</Text>
        <Text style={styles.subtitle}>
          Link your Bank account once and receive Cash{"\n"}rewards directly
          into your account.
        </Text>

        <View style={styles.featureCard}>
          {FEATURES.map((feature, index) => (
            <View
              key={feature.id}
              style={[
                styles.featureRow,
                index < FEATURES.length - 1 && styles.featureRowSpacing,
              ]}
            >
              <View style={styles.featureIconWrap}>
                <Ionicons
                  name={feature.icon}
                  size={20}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.featureTextWrap}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.getStartedBtn}
          onPress={() => router.push(NEXT_ROUTE)}
          activeOpacity={0.85}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  headerTitle: {
    fontFamily: FONTS.medium,
    fontSize: 17,
    color: COLORS.primary,
    marginLeft: 90,
  },
  scroll: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12 },

  illustration: {
    width: "100%",
    height: 260,
    marginBottom: 22,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    lineHeight: 42,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 23,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 25,
  },

  featureCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    padding: 20,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  featureRowSpacing: { marginBottom: 22 },
  featureIconWrap: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTextWrap: { flex: 1 },
  featureTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  featureDescription: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  getStartedBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  getStartedText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
});
