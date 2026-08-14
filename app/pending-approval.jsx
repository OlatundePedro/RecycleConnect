import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";
import { supabase } from "../lib/supabase";

const PendingImage = require("../assets/images/pending.png");

export default function PendingApproval() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState("pending");

  const checkApprovalStatus = async () => {
    try {
      setChecking(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.log("USER ERROR:", userError);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("verification_status")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.log("PROFILE STATUS ERROR:", profileError);
        return;
      }

      console.log("CURRENT VERIFICATION STATUS:", profile.verification_status);

      setStatus(profile.verification_status);

      if (profile.verification_status === "approved") {
        router.replace("/collector/home");
      }
    } catch (error) {
      console.log("CHECK APPROVAL ERROR:", error);
    } finally {
      setLoading(false);
      setChecking(false);
    }
  };

  useEffect(() => {
    checkApprovalStatus();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />

          <Text style={styles.loadingText}>Checking application status...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (status === "approved") {
    return null;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={PendingImage}
            style={styles.pendingImage}
            resizeMode="contain"
          />

          <Text style={styles.title}>Pending Approval</Text>

          <Text style={styles.subtitle}>
            We will notify you{"\n"}
            once your application has been reviewed and approved.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={checkApprovalStatus}
          disabled={checking}
        >
          {checking ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Check Approval Status</Text>
          )}
        </TouchableOpacity>
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
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 34,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -60,
  },

  pendingImage: {
    width: 150,
    height: 150,
    marginBottom: 28,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 35,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 16,
  },

  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
  },

  button: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
