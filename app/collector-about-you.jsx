import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

export default function CollectionAboutYou() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Let's know you</Text>

          <Text style={styles.subtitle}>Enter your name</Text>
        </View>

        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name</Text>

          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!firstName.trim() || !lastName.trim()) && styles.disabledButton,
            ]}
            disabled={!firstName.trim() || !lastName.trim()}
            onPress={() => router.push("/collector-contact")}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 50,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 5,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 18,
  },

  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primary,
    marginBottom: 10,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    fontFamily: FONTS.regular,
    fontSize: 17,
    color: COLORS.textPrimary,
  },

  spacer: {
    flex: 1,
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },

  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
    width: "110%",
  },

  continueText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },

  backButton: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    width: "110%",
  },

  backText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
  },
});
