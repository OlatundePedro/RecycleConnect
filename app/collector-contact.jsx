import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropdownInput from "../components/DropdownInput";
import { NIGERIAN_BANKS } from "../constants/banks";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import { VEHICLE_TYPES } from "../constants/vechiles";
import { createProfile } from "../lib/profile";
import { supabase } from "../lib/supabase";

export default function CollectionApplication() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const [governmentId, setGovernmentId] = useState(null);
  const [businessPhoto, setBusinessPhoto] = useState(null);
  const [storagePhoto, setStoragePhoto] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const pickImage = async (setter) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setter(result.assets[0]);
    }
  };

  // Uploads a picked image into the private collector-documents
  // bucket under the current user's own folder, returns the storage path.
  const uploadDocument = async (userId, image, label) => {
    if (!image?.uri) return null;

    const response = await fetch(image.uri);

    if (!response.ok) {
      throw new Error(`Unable to read the selected ${label} image.`);
    }

    const arrayBuffer = await response.arrayBuffer();

    const extension = image.fileName?.split(".").pop()?.toLowerCase() || "jpg";

    const path = `${userId}/${label}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("collector-documents")
      .upload(path, arrayBuffer, {
        contentType: image.mimeType || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.log(`${label.toUpperCase()} UPLOAD ERROR:`, uploadError);
      throw uploadError;
    }

    return path;
  };

  const handleSubmit = async () => {
    if (submitting) return;

    setError("");

    if (!businessName.trim()) {
      setError("Business name is required.");
      return;
    }

    setSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "Your session could not be found. Please verify your email again.",
        );
      }

      // Upload whichever documents were provided
      const [governmentIdPath, businessPhotoPath, storagePhotoPath] =
        await Promise.all([
          uploadDocument(user.id, governmentId, "government-id"),
          uploadDocument(user.id, businessPhoto, "business-photo"),
          uploadDocument(user.id, storagePhoto, "storage-photo"),
        ]);

      await createProfile({
        account_type: "collector",
        phone,
        full_name: fullName,
        email: email || user.email || null,
        business_name: businessName,
        business_address: businessAddress,
        service_area: serviceArea,
        vehicle_type: vehicleType,
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName,
        government_id_path: governmentIdPath,
        business_photo_path: businessPhotoPath,
        storage_photo_path: storagePhotoPath,
        verification_status: "pending",
      });

      router.push("/pending-approval");
    } catch (err) {
      console.log("APPLICATION SUBMIT ERROR:", err);
      setError(
        err?.message || "Something went wrong submitting your application.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="chevron-back"
              size={18}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.replace("/collector/home")}
          >
            <Text style={styles.skipText}>Skip for now</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Complete Your Application</Text>

        <Text style={styles.subtitle}>
          Provide your business details for review.
          {"\n"}
          We'll notify you once your application has been approved.
        </Text>

        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
        </View>

        {/* Password field removed — your account password (PIN) was
            already set in the earlier create-pin step via
            supabase.auth.updateUser(). Collecting it again here served
            no purpose since nothing used its value. */}

        <Text style={styles.sectionTitle}>Business Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={businessName}
            onChangeText={setBusinessName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Address</Text>
          <TextInput
            style={styles.input}
            value={businessAddress}
            onChangeText={setBusinessAddress}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Area</Text>
          <TextInput
            style={styles.input}
            value={serviceArea}
            onChangeText={setServiceArea}
            placeholder="e.g. Ikorodu, Yaba"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <DropdownInput
            label="Vehicle Type"
            placeholder="Select vehicle type"
            data={VEHICLE_TYPES}
            value={vehicleType}
            onChange={setVehicleType}
          />
        </View>

        <View style={styles.inputGroup}>
          <DropdownInput
            label="Bank Name"
            placeholder="Select bank"
            data={NIGERIAN_BANKS}
            value={bankName}
            onChange={setBankName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bank Account Number</Text>
          <TextInput
            style={styles.input}
            value={accountNumber}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={setAccountNumber}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Account Name</Text>
          <TextInput
            style={styles.input}
            value={accountName}
            onChangeText={setAccountName}
          />
        </View>

        <Text style={styles.sectionTitle}>Upload Documents</Text>

        <View style={styles.uploadGroup}>
          <View style={styles.uploadHeader}>
            <Text style={styles.label}>Any Government ID</Text>
            <Text style={styles.uploadLimit}>JPEG Max 1mb</Text>
          </View>

          <TouchableOpacity
            style={styles.uploadCard}
            onPress={() => pickImage(setGovernmentId)}
          >
            {governmentId ? (
              <Image
                source={{ uri: governmentId.uri }}
                style={styles.uploadPreview}
              />
            ) : (
              <View style={styles.uploadContent}>
                <Text style={styles.uploadText}>Upload</Text>
                <Ionicons name="add" size={22} color="#65748B" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.uploadGroup}>
          <View style={styles.uploadHeader}>
            <Text style={styles.label}>Business Photo</Text>
            <Text style={styles.uploadLimit}>JPEG Max 1mb</Text>
          </View>

          <TouchableOpacity
            style={styles.uploadCard}
            onPress={() => pickImage(setBusinessPhoto)}
          >
            {businessPhoto ? (
              <Image
                source={{ uri: businessPhoto.uri }}
                style={styles.uploadPreview}
              />
            ) : (
              <View style={styles.uploadContent}>
                <Text style={styles.uploadText}>Upload</Text>
                <Ionicons name="add" size={22} color="#65748B" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.uploadGroup}>
          <View style={styles.uploadHeader}>
            <Text style={styles.label}>Storage Facility Photo</Text>
            <Text style={styles.uploadLimit}>JPEG Max 1mb</Text>
          </View>

          <TouchableOpacity
            style={styles.uploadCard}
            onPress={() => pickImage(setStoragePhoto)}
          >
            {storagePhoto ? (
              <Image
                source={{ uri: storagePhoto.uri }}
                style={styles.uploadPreview}
              />
            ) : (
              <View style={styles.uploadContent}>
                <Text style={styles.uploadText}>Upload</Text>
                <Ionicons name="add" size={22} color="#65748B" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[
            styles.submitButton,
            submitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.submitText}>Submit Application</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingTop: 50, paddingBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  skipButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  skipText: { fontFamily: FONTS.semiBold, fontSize: 13, color: COLORS.primary },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 18,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 18,
    marginTop: 10,
  },
  inputGroup: { marginBottom: 20 },
  label: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 5,
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  uploadGroup: { marginBottom: 15 },
  uploadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  uploadLimit: {
    fontFamily: FONTS.regular,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  uploadCard: {
    height: 130,
    borderRadius: 14,
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  uploadContent: { alignItems: "center", justifyContent: "center" },
  uploadText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  uploadPreview: { width: "100%", height: "100%" },
  errorText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: "#D14343",
    textAlign: "center",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitText: { fontFamily: FONTS.bold, fontSize: 14, color: COLORS.white },
});
