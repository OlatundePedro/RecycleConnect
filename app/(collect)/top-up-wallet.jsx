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
  { id: "card", label: "Debit / Credit Card", icon: "card-outline" },
  { id: "bank-transfer", label: "Bank Transfer", icon: "apps-outline" },
  { id: "ussd", label: "USSD", icon: "business-outline" },
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={COLORS.primaryDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Up Wallet</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
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
          const active = method.id === selectedMethod;
          return (
            <TouchableOpacity
              key={method.id}
              style={[styles.methodRow, active && styles.methodRowActive]}
              onPress={() => setSelectedMethod(method.id)}
              activeOpacity={0.85}
            >
              <View style={styles.methodIconWrap}>
                <Ionicons name={method.icon} size={22} color={COLORS.primary} />
              </View>
              <Text style={styles.methodLabel}>{method.label}</Text>
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
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 35 },

  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },

  amountInputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 13,
    marginBottom: 20,
  },
  nairaPrefix: {
    fontFamily: FONTS.bold,
    fontSize: 23,
    color: COLORS.textPrimary,
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
    padding: 0,
  },
  quickAmountsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  quickAmountBtn: {
    width: "31%",
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  quickAmountBtnActive: { borderColor: COLORS.primary },
  quickAmountText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  quickAmountTextActive: { color: COLORS.primary },

  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  methodRowActive: { borderColor: COLORS.primary },
  methodIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1.0,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  methodLabel: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  secureBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    padding: 15,
    marginTop: 5,
    marginBottom: 28,
  },
  secureText: {
    flex: 1,
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.primary,
  },

  continueBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  continueBtnDisabled: { opacity: 0.45 },
  continueBtnText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});
