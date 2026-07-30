import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BANK_LOGOS } from "../../constants/bankLogos";
import { FONTS } from "../../constants/typography";
import { getLinkedBank, maskAccountNumber } from "../../linkedbankstore";

const COLORS = {
  primary: "#188A5A",
  primaryDark: "#0F3D2A",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  headerBg: "#F7F9F8",
  border: "#D9E4DD",
  pillBg: "#8FE3A6",
  pillBgYellow: "#F5C445",
  linkedCardBg: "#EAF6F0",
  linkedCardBorder: "#CFE6D9",
  noteBg: "#EAFBEF",
  noteBorder: "#B7EAC4",
  placeholder: "#9AA9A3",
  white: "#FFFFFF",
};

// Placeholder wallet balance — swap for the real signed-in user's balance.
const WALLET_BALANCE = 5240.0;

const QUICK_AMOUNTS = [500, 1000, 5000, 10000];

export default function Withdraw() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [linkedBank, setLinkedBankState] = useState(getLinkedBank());

  // Re-read the linked bank every time this screen regains focus, so
  // picking a different bank via "change" is reflected immediately.
  useFocusEffect(
    useCallback(() => {
      setLinkedBankState(getLinkedBank());
    }, []),
  );

  const handleChangeAmount = (value) => {
    setAmount(value.replace(/[^0-9]/g, ""));
  };

  const handleQuickAmount = (value) => {
    setAmount(String(value));
  };

  const handleChangeBank = () => {
    router.push({
      pathname: "/select-bank",
      params: { selectedBankKey: linkedBank?.key },
    });
  };

  const numericAmount = Number(amount || 0);
  const canWithdraw =
    numericAmount > 0 && numericAmount <= WALLET_BALANCE && !!linkedBank;

  const handleWithdraw = () => {
    if (!canWithdraw) return;
    // TODO: submit the withdrawal via the actual API call before navigating
    router.replace({
      pathname: "/withdrawal-success",
      params: {
        amount: numericAmount.toFixed(2),
        bankName: linkedBank.name,
        bankLogo: linkedBank.logoKey,
        accountName: linkedBank.accountName,
        accountNumber: linkedBank.accountNumber,
      },
    });
  };

  const logo = linkedBank && BANK_LOGOS[linkedBank.logoKey];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerBg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backRow}
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Rewards</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet balance card */}
        <View style={styles.walletCard}>
          <View style={styles.walletTopRow}>
            <View>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
              <Text style={styles.walletBalance}>
                ₦{WALLET_BALANCE.toFixed(2).split(".")[0]}
                <Text style={styles.walletBalanceDecimals}>
                  .{WALLET_BALANCE.toFixed(2).split(".")[1]}
                </Text>
              </Text>
            </View>
            <Image
              source={require("../../assets/images/rewards-wallet-icon.png")}
              style={styles.walletIcon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.walletBottomRow}>
            <View style={styles.pointsDotsRow}>
              <View
                style={[styles.pointsDot, { backgroundColor: COLORS.white }]}
              >
                <Ionicons
                  name="leaf-outline"
                  size={16}
                  color={COLORS.primary}
                />
              </View>
              <View style={[styles.pointsDot, styles.pointsDotYellow]}>
                <Ionicons name="flash" size={16} color={COLORS.primaryDark} />
              </View>
            </View>
            <TouchableOpacity style={styles.historyPill} activeOpacity={0.85}>
              <Text style={styles.historyPillText}>History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Withdrawal amount */}
        <Text style={styles.sectionTitle}>Withdrawal Amount</Text>
        <View style={styles.amountField}>
          <Text style={styles.nairaPrefix}>₦</Text>
          <TextInput
            value={amount}
            onChangeText={handleChangeAmount}
            placeholder="0"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="number-pad"
            style={styles.amountInput}
          />
        </View>

        <View style={styles.quickAmountsRow}>
          {QUICK_AMOUNTS.map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.quickAmountChip}
              activeOpacity={0.7}
              onPress={() => handleQuickAmount(value)}
            >
              <Text style={styles.quickAmountText}>
                ₦{value.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Withdraw to */}
        <Text style={styles.sectionTitle}>Withdraw To</Text>
        {linkedBank ? (
          <View style={styles.linkedBankCard}>
            {logo && (
              <Image source={logo} style={styles.bankLogo} resizeMode="cover" />
            )}
            <View style={styles.linkedBankText}>
              <Text style={styles.linkedBankName}>{linkedBank.name}</Text>
              <Text style={styles.linkedAccountNumber}>
                {maskAccountNumber(linkedBank.accountNumber)}
              </Text>
              <Text style={styles.linkedAccountName}>
                {linkedBank.accountName}
              </Text>
            </View>
            <TouchableOpacity onPress={handleChangeBank} hitSlop={10}>
              <Text style={styles.changeText}>change</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.linkBankPrompt}
            activeOpacity={0.8}
            onPress={() => router.push("/select-bank")}
          >
            <Ionicons
              name="add-circle-outline"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.linkBankPromptText}>
              Link a bank account to withdraw
            </Text>
          </TouchableOpacity>
        )}

        {/* Note */}
        <View style={styles.noteBox}>
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color={COLORS.primary}
          />
          <View style={styles.noteTextWrap}>
            <Text style={styles.noteTitle}>
              Withdrawals are processed within 24 hours
            </Text>
            <Text style={styles.noteDescription}>
              Make sure your bank account details are correct to avoid delays.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.withdrawBtn,
            !canWithdraw && styles.withdrawBtnDisabled,
          ]}
          activeOpacity={0.85}
          disabled={!canWithdraw}
          onPress={handleWithdraw}
        >
          <Text style={styles.withdrawBtnText}>Withdraw</Text>
        </TouchableOpacity>

        <View style={styles.securedRow}>
          <Ionicons name="lock-closed" size={14} color={COLORS.textSecondary} />
          <Text style={styles.securedText}>
            Your transactions are secure and protected.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
    marginLeft: 4,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  walletCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
  },
  walletTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  walletLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: "#C9D6D0",
    marginBottom: 8,
  },
  walletBalance: {
    fontFamily: FONTS.bold,
    fontSize: 34,
    color: COLORS.white,
  },
  walletBalanceDecimals: {
    fontSize: 20,
  },
  walletIcon: {
    width: 110,
    height: 110,
  },
  walletBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pointsDotsRow: {
    flexDirection: "row",
  },
  pointsDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -10,
    borderWidth: 2,
    borderColor: COLORS.primaryDark,
  },
  pointsDotYellow: {
    backgroundColor: COLORS.pillBgYellow,
  },
  historyPill: {
    backgroundColor: COLORS.pillBg,
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  historyPillText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primaryDark,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  amountField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 16,
  },
  nairaPrefix: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    marginRight: 12,
  },
  amountInput: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.textPrimary,
    padding: 0,
  },
  quickAmountsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  quickAmountChip: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  quickAmountText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },
  linkedBankCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.linkedCardBg,
    borderWidth: 1.5,
    borderColor: COLORS.linkedCardBorder,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  bankLogo: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 14,
  },
  linkedBankText: {
    flex: 1,
  },
  linkedBankName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  linkedAccountNumber: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  linkedAccountName: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  changeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  linkBankPrompt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },
  linkBankPromptText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  noteBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.noteBg,
    borderWidth: 1.5,
    borderColor: COLORS.noteBorder,
    borderRadius: 16,
    padding: 18,
    gap: 14,
  },
  noteTextWrap: {
    flex: 1,
  },
  noteTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 4,
  },
  noteDescription: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 8,
  },
  withdrawBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  withdrawBtnDisabled: { opacity: 0.5 },
  withdrawBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
  securedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  securedText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
