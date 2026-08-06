import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const QUICK_AMOUNTS = [1000, 2000, 5000, 10000, 20000];
const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Debit / Credit Card",
    icon: "wallet-outline",
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
  const insets = useSafeAreaInsets();

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
    <View style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" style="light" />

      {/* Header — extends behind the status bar to the top edge of the screen */}
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={22} color={COLORS.white} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Top Up Wallet</Text>

        <View style={{ width: 30 }} />
      </View>

      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
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
                style={[styles.methodCard, active && styles.methodCardActive]}
                activeOpacity={0.8}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodLeft}>
                  <View style={styles.methodIconBox}>
                    <Ionicons
                      name={method.icon}
                      size={22}
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
                    <Text style={styles.ussdText}>{method.text}</Text>
                  )}

                  <View
                    style={[
                      styles.radioOuter,
                      active && styles.radioOuterActive,
                    ]}
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
              Your payment is secure and encrypted.{"\n"}We do not store your
              card details.
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
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.white,
  },

  scroll: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },

  sectionLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },

  amountInputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 14,
    height: 55,
    paddingHorizontal: 18,
    marginBottom: 28,
    backgroundColor: COLORS.white,
  },

  nairaPrefix: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    marginRight: 4,
  },

  amountInput: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
    padding: 0,
  },

  quickAmountsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
    marginBottom: 25,
  },

  quickAmountBtn: {
    width: "31%",
    height: 42,
    borderWidth: 1.0,
    borderColor: "#D5D5D5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },

  quickAmountBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },

  quickAmountText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: "#4F5E5B",
  },

  quickAmountTextActive: {
    color: COLORS.primary,
  },

  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.0,
    borderColor: "#D7D7D7",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: COLORS.white,
  },

  methodCardActive: {
    borderColor: COLORS.primary,
  },

  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  methodIconBox: {
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  methodTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  methodRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  cardLogos: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
  },

  visa: {
    fontFamily: FONTS.semiBold,

    fontSize: 14,
    color: "#1A1F71",
    marginRight: 8,
  },

  mastercard: {
    flexDirection: "row",
    alignItems: "center",
  },

  redCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EB001B",
  },

  orangeCircle: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#F79E1B",
    marginLeft: -8,
  },

  ussdText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  radioOuter: {
    width: 19,
    height: 19,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#94A3A0",
    justifyContent: "center",
    alignItems: "center",
  },

  radioOuterActive: {
    borderColor: COLORS.primary,
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },

  secureBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6F0",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 24,
  },

  secureText: {
    flex: 1,
    marginLeft: 14,
    fontFamily: FONTS.medium,
    fontSize: 12,
    lineHeight: 22,
    color: COLORS.primary,
  },

  continueBtn: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  continueBtnDisabled: {
    opacity: 0.45,
  },

  continueBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});
