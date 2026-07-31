import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
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

export default function CollectionApplication() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const pickImage = async (setter) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    router.push("/pending-approval");
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
              size={28}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton}>
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

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>

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
          <Text style={styles.label}>Vehicle Type</Text>

          <DropdownInput
            label="Vehicle Type"
            placeholder="Select vehicle type"
            data={VEHICLE_TYPES}
            value={vehicleType}
            onChange={setVehicleType}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bank Name</Text>

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
                source={{ uri: governmentId }}
                style={styles.uploadPreview}
              />
            ) : (
              <View style={styles.uploadContent}>
                <Text style={styles.uploadText}>Upload</Text>

                <Ionicons name="add" size={32} color="#65748B" />
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
                source={{ uri: businessPhoto }}
                style={styles.uploadPreview}
              />
            ) : (
              <View style={styles.uploadContent}>
                <Text style={styles.uploadText}>Upload</Text>

                <Ionicons name="add" size={32} color="#65748B" />
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
                source={{ uri: storagePhoto }}
                style={styles.uploadPreview}
              />
            ) : (
              <View style={styles.uploadContent}>
                <Text style={styles.uploadText}>Upload</Text>

                <Ionicons name="add" size={32} color="#65748B" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Application</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  skipText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: COLORS.textPrimary,
    textAlign: "center",
    lineHeight: 38,
    marginBottom: 12,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 40,
  },

  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: 20,
    marginTop: 12,
  },

  inputGroup: {
    marginBottom: 22,
  },

  label: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
    marginBottom: 10,
  },

  input: {
    height: 58,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  searchInput: {
    height: 45,
    borderRadius: 10,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  uploadGroup: {
    marginBottom: 24,
  },

  uploadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  uploadLimit: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  uploadCard: {
    height: 130,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  uploadContent: {
    alignItems: "center",
    justifyContent: "center",
  },

  uploadText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },

  uploadPreview: {
    width: "100%",
    height: "100%",
  },

  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  submitText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.white,
  },
});
