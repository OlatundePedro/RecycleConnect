import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

export default function ComingSoon() {
  const router = useRouter();
  const { feature } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={26} color="#2D7A46" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>
          {feature || "This feature"} {"\n"}is coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  backBtn: {
    marginTop: 45,
    marginLeft: 20,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 36,
    textAlign: "center",
    color: COLORS.textSecondary,
    fontFamily: FONTS.bold,
  },
});
