import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONTS } from "../constants/typography";

const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  card: "#F5F7F8",
  border: "#D9E4DD",
};

export default function GetStarted() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          What brings you to{"\n"}RecycleConnect?
        </Text>

        <Text style={styles.subtitle}>
          This helps us personalize your experience.
        </Text>
      </View>

      {/* Household Card */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push("/create-account-house")}
      >
        <View style={styles.iconWrapper}>
          <Ionicons name="home-outline" size={30} color={COLORS.primary} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            I want to recycle{"\n"}my household waste
          </Text>

          <Text style={styles.cardSubtitle}>For individuals and families</Text>
        </View>

        <AntDesign name="right" size={15} color="#111" />
      </TouchableOpacity>

      {/* Collector Card — routes to its own dedicated sign-up screen */}
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => router.push("/create-account-collector")}
      >
        <View style={styles.iconWrapper}>
          <SimpleLineIcons name="briefcase" size={30} color={COLORS.primary} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            I run or want to start a{"\n"}recycling collection{"\n"}business
          </Text>

          <Text style={styles.cardSubtitle}>For Collection partners</Text>
        </View>

        <AntDesign name="right" size={15} color="#111" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
  },

  header: {
    marginTop: 85,
    marginBottom: 55,
    alignItems: "center",
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    lineHeight: 40,
    color: COLORS.textPrimary,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 16,
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  iconWrapper: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.textPrimary,
  },

  cardSubtitle: {
    marginTop: 15,
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },
});
