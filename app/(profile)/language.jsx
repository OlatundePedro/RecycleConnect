import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const LANGUAGES = [
  {
    id: "en",
    code: "EN",
    name: "English (Nigeria)",
  },
  {
    id: "yo",
    code: "YO",
    name: "Yoruba",
  },
  {
    id: "ig",
    code: "IG",
    name: "Igbo",
  },
  {
    id: "ha",
    code: "HA",
    name: "Hausa",
  },
  {
    id: "pi",
    code: "PI",
    name: "Pidgin",
  },
];

export default function LanguageScreen() {
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleSave = () => {
    // Save language here later
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}

      <View style={styles.header}>
        <View style={styles.backRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Language</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Hero */}

        <View style={styles.heroIconWrap}>
          <Ionicons
            name="language-outline"
            size={40}
            color={COLORS.primaryDark}
          />
        </View>

        <Text style={styles.description}>
          Choose your preferred language to customize your environmental impact
          tracking experience.
        </Text>
        {/* Language List */}

        {LANGUAGES.map((item) => {
          const selected = selectedLanguage === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => setSelectedLanguage(item.id)}
              style={[
                styles.languageCard,
                selected && styles.languageCardSelected,
              ]}
            >
              <View
                style={[
                  styles.languageBadge,
                  selected
                    ? styles.languageBadgeActive
                    : styles.languageBadgeInactive,
                ]}
              >
                <Text style={styles.languageCode}>{item.code}</Text>
              </View>

              <Text style={styles.languageName}>{item.name}</Text>

              {selected ? (
                <View style={styles.radioSelected}>
                  <Ionicons name="checkmark" size={22} color={COLORS.white} />
                </View>
              ) : (
                <View style={styles.radioOuter} />
              )}
            </TouchableOpacity>
          );
        })}

        {/* Preview */}

        <Image
          source={require("../../assets/images/Decorative Element.png")}
          style={styles.previewImage}
          resizeMode="cover"
        />

        {/* Save Button */}

        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.9}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
    marginLeft: 126,
  },

  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  heroIconWrap: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#86F27B",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },

  description: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 22,
    paddingHorizontal: 12,
  },

  languageCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 5,
  },

  languageCardSelected: {
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  languageBadge: {
    width: 44,
    height: 44,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  languageBadgeActive: {
    backgroundColor: "#86F27B",
  },

  languageBadgeInactive: {
    backgroundColor: "#ECECEC",
  },

  languageCode: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  languageName: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  radioOuter: {
    width: 28,
    height: 28,
    borderRadius: 19,
    borderWidth: 3,
    borderColor: "#C8D3C8",
  },

  radioSelected: {
    width: 28,
    height: 28,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  previewImage: {
    width: "100%",
    height: 160,
    borderRadius: 14,
    marginTop: 5,
    marginBottom: 32,
  },

  saveButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
  },

  saveButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
    marginRight: 10,
  },
});
