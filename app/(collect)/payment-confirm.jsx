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

// Where the button below sends the collector next.
const NEXT_ROUTE = "/collector/home";

export default function PaymentConfirm() {
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
        <Text style={styles.title}>Paid{"\n"}Successfully</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.replace(NEXT_ROUTE)}
          activeOpacity={0.85}
        >
          {/* Your screenshot labels this "Register" — that reads like it
              may be leftover from a shared success-screen template rather
              than copy meant for a top-up confirmation. Left it as-is;
              swap the label/route below if this should say something
              like "Done" or "Back to wallet" instead. */}
          <Text style={styles.actionBtnText}>Back to Home</Text>
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
    width: 260,
    height: 260,
    marginBottom: 28,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 35,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 45,
  },
  actionBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  actionBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
});
