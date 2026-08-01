import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

const PendingImage = require("../assets/images/pending.png");

export default function PendingApproval() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={PendingImage}
            style={styles.pendingImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>Pending Approval</Text>

          <Text style={styles.subtitle}>
            We will notify you {"\n"}once your application has been reviewed and
            approved.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/collector/home")}
        >
          <Text style={styles.buttonText}>Proceed to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 34,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
  },

  pendingImage: {
    width: 150,
    height: 150,
    marginBottom: 28,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 35,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 16,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
  },

  button: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});
