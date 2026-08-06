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

export default function PublishedScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.container}>
        <Image
          source={require("../../assets/images/check.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.title}>Published</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => router.replace("/collector/home")}
        >
          <Text style={styles.buttonText}>Back to home</Text>
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
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 120,
    paddingBottom: 45,
  },

  icon: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  title: {
    marginTop: -120,
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: "#4B5552",
  },

  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
  },

  buttonText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
});
