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
import { FONTS } from "../constants/typography";

const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#3F4B47",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  white: "#FFFFFF",
};

export default function AccountSuccess() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const isCollector = type === "collector";

  const handleCreatePin = () => {
    router.push({
      pathname: isCollector ? "/create-pin-collector" : "/create-pin",
      params: { type },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.content}>
        <Image
          source={require("../assets/images/check.png")}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Verified{"\n"}Successfully</Text>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        activeOpacity={0.85}
        onPress={handleCreatePin}
      >
        <Text style={styles.continueButtonText}>Create login PIN</Text>
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
    width: 260,
    height: 260,
    marginBottom: 32,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 40,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 75,
  },
  continueButtonText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    fontSize: 16,
  },
});
