import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

export default function NotificationPreferences() {
  const router = useRouter();

  const [pickupReminder, setPickupReminder] = useState(true);
  const [appUpdates, setAppUpdates] = useState(false);
  const [tips, setTips] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Notifications</Text>

          <View style={{ width: 28 }} />
        </View>

        <Image
          source={require("../../assets/images/not-gradiant.png")}
          style={styles.banner}
          resizeMode="cover"
        />

        <Text style={styles.title}>Stay Informed</Text>

        <Text style={styles.subtitle}>
          Choose how you'd like to be notified about your environmental impact.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.greenIcon}>
              <Ionicons name="calendar-outline" size={27} color="#0B6A25" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Pickup Reminders</Text>

              <Text style={styles.cardDescription}>
                Get alerted before your scheduled waste collection.
              </Text>
            </View>
          </View>

          <Switch
            value={pickupReminder}
            onValueChange={setPickupReminder}
            trackColor={{
              false: "#D9D9D9",
              true: COLORS.primary,
            }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.cardLeft}>
            <View style={styles.iconOnly}>
              <MaterialCommunityIcons
                name="cellphone-arrow-down"
                size={28}
                color={COLORS.primaryDark}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>App Updates</Text>

              <Text style={styles.cardDescription}>
                Be the first to know about new features.
              </Text>
            </View>
          </View>

          <Switch
            value={appUpdates}
            onValueChange={setAppUpdates}
            trackColor={{
              false: "#D9D9D9",
              true: COLORS.primary,
            }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.darkCard}>
          <View style={styles.cardLeft}>
            <View style={styles.darkIcon}>
              <Ionicons name="bulb-outline" size={30} color="#A4E786" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.darkCardTitle}>Educational Tips</Text>

              <Text style={styles.darkCardDescription}>
                Daily advice on how to improve your waste sorting.
              </Text>
            </View>
          </View>

          <Switch
            value={tips}
            onValueChange={setTips}
            trackColor={{
              false: "#D9D9D9",
              true: "#8AF06B",
            }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.dndCard}>
          <View style={styles.dndLeft}>
            <Ionicons
              name="notifications-off-outline"
              size={26}
              color="#7A7A7A"
            />

            <View style={styles.dndText}>
              <Text style={styles.dndTitle}>Do Not Disturb</Text>

              <Text style={styles.dndDescription}>
                Pause all notifications temporarily.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.scheduleButton}>
            <Text style={styles.scheduleText}>Schedule</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <Text style={styles.footerText}>Changes are saved automatically.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scroll: {
    paddingHorizontal: 22,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
  },
  banner: {
    width: "100%",
    height: 195,
    borderRadius: 24,
    marginBottom: 28,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: "#1A1A1A",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "#515151",
    lineHeight: 18,
    marginBottom: 22,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  cardLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  greenIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#85F27C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  iconOnly: {
    width: 66,
    height: 66,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: "#202020",
    marginBottom: 6,
  },

  cardDescription: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "#555",
    lineHeight: 19,
  },

  darkCard: {
    backgroundColor: "#0E4A31",
    borderRadius: 14,
    padding: 10,
    marginBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  darkIcon: {
    width: 63,
    height: 63,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  darkCardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: "#FFFFFF",
    marginBottom: 6,
  },

  darkCardDescription: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#9CD78C",
    lineHeight: 19,
  },

  dndCard: {
    borderWidth: 1.0,
    borderColor: "#D5DDD2",
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 16,
    marginBottom: 33,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dndLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  dndText: {
    marginLeft: 18,
    flex: 1,
  },

  dndTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: "#676F65",
    marginBottom: 4,
  },

  dndDescription: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "#B3BBB0",
    lineHeight: 16,
  },

  scheduleButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  scheduleText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.primaryDark,
  },

  footerText: {
    textAlign: "center",
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: "#4F4F4F",
    marginBottom: 28,
  },
});
