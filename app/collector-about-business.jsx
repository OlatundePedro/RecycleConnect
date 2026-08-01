import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
export default function CollectionBusinessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Tell us about your{"\n"}
            collection business
          </Text>

          <Text style={styles.subtitle}>
            Let's understand where you are in your recycling journey so we can
            personalize your onboarding experience.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.optionCard}
          onPress={() => router.push("/collector-checklist")}
        >
          <Text style={styles.optionText}>New Business</Text>

          <Ionicons name="chevron-forward" size={18} color="#6B7280" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.optionCard}
          onPress={() => router.push("/collector-about-you")}
        >
          <Text style={styles.optionText}>Existing Business</Text>

          <Ionicons name="chevron-forward" size={18} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
  },

  header: {
    alignItems: "center",
    marginBottom: 36,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 35,
    marginBottom: 18,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 25,
    paddingHorizontal: 8,
  },

  optionCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    height: 100,
    paddingHorizontal: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  optionText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
});
