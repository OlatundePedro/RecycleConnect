import { useRouter } from "expo-router";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const HOME_ROUTE = "/household/home";

export default function MaterialsConfirmed() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.content}>
        <Image
          source={require("../../assets/images/check.png")}
          style={styles.badgeImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>Materials{"\n"}Confirmed</Text>
        <Text style={styles.subtitle}>
          You will get a reminder before the collection date.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() => router.replace(HOME_ROUTE)}
          activeOpacity={0.85}
        >
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  badgeImage: {
    width: 180,
    height: 180,
    marginBottom: 32,
  },
  title: {
    fontFamily: FONTS.black,
    fontSize: 40,
    lineHeight: 46,
    color: COLORS.primaryDark,
    textAlign: "center",
    marginBottom: 14,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.primaryDark,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  homeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  homeBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.white,
  },
});
