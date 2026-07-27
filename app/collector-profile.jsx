import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS, TEXT_STYLES } from "../constants/typography";

// Where "Skip for now" and a successful submit both send the person.
const SKIP_ROUTE = "/collector-dashboard";
const SUBMIT_SUCCESS_ROUTE = "/application-submitted";

const PERSONAL_FIELDS = [
  { id: "fullName", label: "Full Name", keyboardType: "default" },
  { id: "phoneNumber", label: "Phone Number", keyboardType: "phone-pad" },
  { id: "email", label: "Email Address", keyboardType: "email-address" },
  { id: "altEmail", label: "Email Address", keyboardType: "email-address" },
];

const BUSINESS_FIELDS = [
  { id: "businessName", label: "Business Name" },
  { id: "businessAddress", label: "Business Address" },
  { id: "serviceArea", label: "Service Area" },
  { id: "vehicleType", label: "Vehicle Type" },
  { id: "bankName", label: "Bank Name" },
  {
    id: "bankAccountNumber",
    label: "Bank account number",
    keyboardType: "number-pad",
  },
  { id: "accountName", label: "Account Name" },
];

const DOCUMENTS = [
  { id: "governmentId", label: "Any Government ID" },
  { id: "businessPhoto", label: "Business Photo" },
  { id: "storagePhoto", label: "Storage Facility Photo" },
];

export default function CompleteApplication() {
  const router = useRouter();
  const [values, setValues] = useState({});
  const [uploads, setUploads] = useState({});

  const setField = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleUploadPress = (id) => {
    // Hook up expo-image-picker / expo-document-picker here.
    // Placeholder just marks the slot as filled so the UI reflects a pick.
    setUploads((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = () => {
    router.push(SUBMIT_SUCCESS_ROUTE);
  };

  const handleSkip = () => {
    router.push(SKIP_ROUTE);
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={COLORS.textPrimary} />
        </Pressable>
        <Pressable style={styles.skipPill} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Complete Your Application</Text>
        <Text style={styles.subtitle}>
          Provide your business details for review. We'll notify you once your
          application has been approved.
        </Text>

        <Text style={styles.sectionTitle}>Personal Information</Text>
        {PERSONAL_FIELDS.map((field, index) => (
          <FormInput
            key={`${field.id}-${index}`}
            label={field.label}
            value={values[`${field.id}-${index}`] || ""}
            onChangeText={(text) => setField(`${field.id}-${index}`, text)}
            keyboardType={field.keyboardType}
          />
        ))}

        <Text style={styles.sectionTitle}>Business Information</Text>
        {BUSINESS_FIELDS.map((field) => (
          <FormInput
            key={field.id}
            label={field.label}
            value={values[field.id] || ""}
            onChangeText={(text) => setField(field.id, text)}
            keyboardType={field.keyboardType}
          />
        ))}

        <Text style={styles.sectionTitle}>Upload Documents</Text>
        {DOCUMENTS.map((doc) => (
          <UploadSlot
            key={doc.id}
            label={doc.label}
            filled={!!uploads[doc.id]}
            onPress={() => handleUploadPress(doc.id)}
          />
        ))}

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Application</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function FormInput({ label, value, onChangeText, keyboardType = "default" }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
        placeholderTextColor={COLORS.muted}
      />
    </View>
  );
}

function UploadSlot({ label, filled, onPress }) {
  return (
    <View style={styles.fieldGroup}>
      <View style={styles.uploadLabelRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.uploadHint}>JPEG Max 1mb</Text>
      </View>
      <Pressable style={styles.uploadBox} onPress={onPress}>
        <Text style={styles.uploadText}>
          {filled ? "File selected" : "Upload"}
        </Text>
        {!filled && (
          <Ionicons
            name="add"
            size={20}
            color={COLORS.muted}
            style={styles.uploadIcon}
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  skipPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryLight,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 6,
  },
  skipText: {
    ...TEXT_STYLES.caption,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    ...TEXT_STYLES.heading2,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 10,
  },
  subtitle: {
    ...TEXT_STYLES.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  sectionTitle: {
    ...TEXT_STYLES.heading3,
    color: COLORS.textPrimary,
    marginTop: 12,
    marginBottom: 16,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    ...TEXT_STYLES.smallLabel,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginBottom: 8,
  },
  input: {
    ...TEXT_STYLES.body,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.textPrimary,
  },
  uploadLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  uploadHint: {
    ...TEXT_STYLES.smallLabel,
    color: COLORS.textSecondary,
  },
  uploadBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 28,
    gap: 8,
  },
  uploadText: {
    ...TEXT_STYLES.body,
    color: COLORS.muted,
  },
  uploadIcon: {
    marginLeft: 2,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  submitText: {
    ...TEXT_STYLES.body,
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
});
