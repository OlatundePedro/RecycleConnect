import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

export default function HelpSupport() {
  const router = useRouter();

  const [expanded, setExpanded] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const [issueCategory, setIssueCategory] = useState("");
  const [description, setDescription] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow photo library access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const FAQS = [
    {
      id: 1,
      question: "How do I schedule a pickup?",
      answer:
        "Go to the Home screen, tap Mark as Ready, choose your recyclable materials, and submit your pickup request.",
    },
    {
      id: 2,
      question: "What happens to my recyclable waste?",
      answer:
        "Collected materials are sorted and transported to certified recycling facilities where they are processed into reusable products.",
    },
  ];
  const ISSUE_CATEGORIES = [
    "Pickup Issue",
    "Payment Issue",
    "App Bug",
    "Account Issue",
    "Rewards Issue",
    "Other",
  ];
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Help & Support</Text>

          <TouchableOpacity hitSlop={12}>
            <Ionicons name="search-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>How can we help you today?</Text>

          <Text style={styles.heroSubtitle}>
            Find answers to common questions or reach out to our team directly.
          </Text>
        </View>

        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactCard}
            activeOpacity={0.85}
            onPress={() => Linking.openURL("tel:+2348000000000")}
          >
            <View style={styles.contactIcon}>
              <Ionicons name="call-outline" size={24} color={COLORS.primary} />
            </View>

            <Text style={styles.contactTitle}>Call Us</Text>

            <Text style={styles.contactSubtitle}>
              Speak with our{"\n"}support team
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactCard}
            activeOpacity={0.85}
            onPress={() => Linking.openURL("https://wa.me/2348000000000")}
          >
            <View style={styles.contactIcon}>
              <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
            </View>

            <Text style={styles.contactTitle}>WhatsApp</Text>

            <Text style={styles.contactSubtitle}>
              Chat with us{"\n"}instantly
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.faqHeader}>
          <Text style={styles.faqHeading}>Frequently Asked Questions</Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {FAQS.map((item) => {
          const isOpen = expanded === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.faqCard}
              activeOpacity={0.85}
              onPress={() => setExpanded(isOpen ? null : item.id)}
            >
              <View style={styles.faqTop}>
                <Text style={styles.question}>{item.question}</Text>

                <Ionicons
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={22}
                  color={COLORS.textSecondary}
                />
              </View>

              {isOpen && <Text style={styles.answer}>{item.answer}</Text>}
            </TouchableOpacity>
          );
        })}

        <View style={styles.reportSection}>
          <Text style={styles.reportTitle}>Report an Issue</Text>

          <Text style={styles.reportSubtitle}>
            Having trouble? Let us know and we'll get back to you.
          </Text>

          <Text style={styles.label}>Issue Category</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowCategories(!showCategories)}
          >
            <Text
              style={[
                styles.dropdownText,
                !issueCategory && { color: "#A5A5A5" },
              ]}
            >
              {issueCategory || "Select issue category"}
            </Text>

            <Ionicons
              name={showCategories ? "chevron-up" : "chevron-down"}
              size={22}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
          {showCategories && (
            <View style={styles.dropdownList}>
              {ISSUE_CATEGORIES.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setIssueCategory(item);
                    setShowCategories(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.label}>Description</Text>

          <TextInput
            style={styles.descriptionInput}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the issue..."
            placeholderTextColor="#9B9B9B"
            textAlignVertical="top"
          />

          <Text style={styles.label}>Upload Image (Optional)</Text>

          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.previewImage}
              />
            ) : (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  size={32}
                  color={COLORS.primary}
                />

                <Text style={styles.uploadTitle}>Tap to upload</Text>

                <Text style={styles.uploadSub}>JPG, PNG (Max 5MB)</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={() => {
              if (!issueCategory) {
                Alert.alert("Error", "Please select an issue category.");
                return;
              }

              if (!description.trim()) {
                Alert.alert("Error", "Please describe the issue.");
                return;
              }

              Alert.alert(
                "Report Submitted",
                "Thank you. Our support team will review your report.",
                [
                  {
                    text: "OK",
                    onPress: () => router.back(),
                  },
                ],
              );
            }}
          >
            <Text style={styles.submitText}>Submit Report</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/images/Mood Section.png")}
          style={styles.footerImage}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },

  scroll: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  heroCard: {
    backgroundColor: "#0F4C33",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 24,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  heroTitle: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: "#8FE27C",
    lineHeight: 42,
    marginBottom: 8,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  heroSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: "#8FE27C",
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  contactCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  contactIcon: {
    width: 52,
    height: 52,
    borderRadius: 34,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  contactTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  dropdownList: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginBottom: 22,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },

  dropdownItemText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  contactSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  faqHeading: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },

  viewAll: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },

  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  faqTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  question: {
    flex: 1,
    marginRight: 15,
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  answer: {
    marginTop: 16,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  reportSection: {
    marginTop: 12,
  },

  reportTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },

  reportSubtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
    lineHeight: 22,
  },

  label: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },

  dropdown: {
    height: 56,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  descriptionInput: {
    height: 110,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    borderRadius: 14,
    padding: 14,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 22,
  },

  uploadBox: {
    height: 130,
    borderWidth: 2,
    borderColor: "#D7E8D8",
    borderStyle: "dashed",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  uploadTitle: {
    marginTop: 12,
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  uploadSub: {
    marginTop: 6,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  submitButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: "#FFFFFF",
  },
  footerImage: {
    width: "100%",
    height: 220,
    marginTop: 20,
    alignSelf: "center",
  },
});
