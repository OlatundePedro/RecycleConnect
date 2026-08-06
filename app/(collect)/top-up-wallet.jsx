import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const QUICK_AMOUNTS = [1000, 2000, 5000, 10000, 20000];
const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Debit / Credit Card",
    icon: "card-outline",
    right: "card",
  },
  {
    id: "bank-transfer",
    label: "Bank Transfer",
    icon: "business-outline",
    right: "radio",
  },
  {
    id: "ussd",
    label: "USSD",
    icon: "keypad-outline",
    right: "text",
    text: "*123#",
  },
];

export default function TopUpWallet() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [amount, setAmount] = useState(
    params.amount ? String(params.amount) : "5000",
  );
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(5000);
  const [customMode, setCustomMode] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(
    params.method === "bank" ? "bank-transfer" : "card",
  );

  const handleQuickAmount = (value) => {
    setSelectedQuickAmount(value);
    setCustomMode(false);
    setAmount(String(value));
  };

  const handleOther = () => {
    setSelectedQuickAmount(null);
    setCustomMode(true);
    setAmount("");
  };

  const handleAmountChange = (text) => {
    const digitsOnly = text.replace(/[^0-9]/g, "");
    setAmount(digitsOnly);
    setSelectedQuickAmount(
      QUICK_AMOUNTS.includes(Number(digitsOnly)) ? Number(digitsOnly) : null,
    );
  };

  const canContinue = Number(amount) > 0 && selectedMethod;
  const handleContinue = () => {
    if (!canContinue) return;

    router.push({
      pathname: "/(collect)/payment-confirm",
      params: { amount, method: selectedMethod },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      translucent={false}
      backgroundColor={COLORS.primaryDark}
      barStyle="light-content"
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={34} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Top Up Wallet</Text>

        <View style={{ width: 34 }} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.sectionLabel}>Enter amount</Text>
        <View style={styles.amountInputBox}>
          <Text style={styles.nairaPrefix}>₦</Text>
          <TextInput
            style={styles.amountInput}
            value={amount ? Number(amount).toLocaleString() : ""}
            onChangeText={handleAmountChange}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor={COLORS.muted}
            autoFocus={customMode}
          />
        </View>

        <View style={styles.quickAmountsGrid}>
          {QUICK_AMOUNTS.map((value) => {
            const active = selectedQuickAmount === value;
            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.quickAmountBtn,
                  active && styles.quickAmountBtnActive,
                ]}
                onPress={() => handleQuickAmount(value)}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    active && styles.quickAmountTextActive,
                  ]}
                >
                  ₦{value.toLocaleString()}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[
              styles.quickAmountBtn,
              customMode && styles.quickAmountBtnActive,
            ]}
            onPress={handleOther}
          >
            <Text
              style={[
                styles.quickAmountText,
                customMode && styles.quickAmountTextActive,
              ]}
            >
              Other
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionLabel}>Payment Method</Text>

        {PAYMENT_METHODS.map((method) => {
          const active = selectedMethod === method.id;

          return (
            <TouchableOpacity
              key={method.id}
              style={styles.methodCard}
              activeOpacity={0.8}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodLeft}>
                <View style={styles.methodIconBox}>
                  <Ionicons
                    name={method.icon}
                    size={28}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.methodTitle}>{method.label}</Text>
              </View>

              <View style={styles.methodRight}>
                {method.id === "card" && (
                  <View style={styles.cardLogos}>
                    <Text style={styles.visa}>VISA</Text>

                    <View style={styles.mastercard}>
                      <View style={styles.redCircle} />
                      <View style={styles.orangeCircle} />
                    </View>
                  </View>
                )}

                {method.id === "ussd" && (
                  <Text style={styles.ussdText}>*123#</Text>
                )}

                <View
                  style={[styles.radioOuter, active && styles.radioOuterActive]}
                >
                  {active && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.secureBanner}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={COLORS.primary}
          />
          <Text style={styles.secureText}>
            Your payment is secure and encrypted.{"\n"}We do not store your card
            details.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.continueBtn,
            !canContinue && styles.continueBtnDisabled,
          ]}
          onPress={handleContinue}
          disabled={!canContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
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
    backgroundColor: COLORS.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 32,
  },

  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.white,
  },

  scroll: {
    paddingHorizontal: 32,
    paddingTop: 38,
    paddingBottom: 40,
  },

  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 18,
  },

  amountInputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 22,
    height: 98,
    paddingHorizontal: 18,
    marginBottom: 34,
    backgroundColor: COLORS.white,
  },

  nairaPrefix: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    marginRight: 4,
  },

  amountInput: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: COLORS.textPrimary,
    padding: 0,
  },

  quickAmountsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
    marginBottom: 52,
  },

  quickAmountBtn: {
    width: "30.5%",
    height: 74,
    borderWidth: 2,
    borderColor: "#D5D5D5",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },

  quickAmountBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  quickAmountText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: "#4F5E5B",
  },

  quickAmountTextActive: {
    color: COLORS.primary,
  },

  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D7D7D7",
    borderRadius: 18,
    height: 86,
    paddingHorizontal: 18,
    marginBottom: 18,
    backgroundColor: COLORS.white,
  },

  methodRowActive: {
    borderColor: COLORS.primary,
  },

  methodIconWrap: {
    width: 46,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  methodLabel: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },

  methodRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  paymentText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },

  radioOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#64748B",
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterActive: {
    borderColor: COLORS.primary,
  },

  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
  },

  secureBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6F0",
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 22,
    marginTop: 18,
    marginBottom: 65,
  },

  secureText: {
    flex: 1,
    marginLeft: 18,
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 28,
    color: COLORS.primary,
  },

  continueBtn: {
    height: 72,
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  continueBtnDisabled: {
    opacity: 0.45,
  },

  continueBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 21,
    color: COLORS.white,
  },
});
