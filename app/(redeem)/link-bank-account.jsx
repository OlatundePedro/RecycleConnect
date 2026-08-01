import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
import { setLinkedBank } from "../../linkedbankstore";

const COLORS = {
  primary: "#188A5A",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  headerBg: "#F7F9F8",
  border: "#D9E4DD",
  selectedBg: "#EAF6F0",
  nameCardBg: "#F5F7F6",
  placeholder: "#9AA9A3",
  white: "#FFFFFF",
};

const ACCOUNT_NUMBER_LENGTH = 10;

function BankBadge({ logoKey }) {
  const logo = BANK_LOGOS[logoKey];
  if (!logo) return <View style={styles.bankBadge} />;
  return (
    <View style={styles.bankBadge}>
      <Image source={logo} style={styles.bankLogo} resizeMode="cover" />
    </View>
  );
}

export default function LinkBankAccount() {
  const router = useRouter();
  const { bankKey, bankName, bankLogo } = useLocalSearchParams();

  const [accountNumber, setAccountNumber] = useState("");
  const [verifiedName, setVerifiedName] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (accountNumber.length === ACCOUNT_NUMBER_LENGTH) {
      setVerifying(true);
      const timer = setTimeout(() => {
        setVerifiedName("JOHN DAVID");
        setVerifying(false);
      }, 600);
      return () => clearTimeout(timer);
    }
    setVerifiedName("");
  }, [accountNumber]);

  const handleChangeAccountNumber = (value) => {
    setAccountNumber(
      value.replace(/[^0-9]/g, "").slice(0, ACCOUNT_NUMBER_LENGTH),
    );
  };

  const handleChangeBank = () => {
    router.push({
      pathname: "/select-bank",
      params: { selectedBankKey: bankKey },
    });
  };

  const canLink = !!verifiedName;

  const handleLinkBankAccount = () => {
    if (!canLink) return;
    setLinkedBank({
      key: bankKey,
      name: bankName,
      logoKey: bankLogo,
      accountNumber,
      accountName: verifiedName,
    });
    router.replace({
      pathname: "/bank-linked-success",
      params: {
        bankKey,
        bankName,
        bankLogo,
        accountNumber,
        accountName: verifiedName,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.headerBg} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backRow}
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          <Text style={styles.headerTitle}>Link Bank Account</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Selected Bank</Text>

        <View style={styles.selectedBankCard}>
          <BankBadge logoKey={bankLogo} />
          <Text style={styles.selectedBankName}>{bankName}</Text>
          <TouchableOpacity onPress={handleChangeBank} hitSlop={10}>
            <Text style={styles.changeText}>change</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.fieldLabel}>Account Number</Text>
        <View style={styles.fieldWrap}>
          <TextInput
            value={accountNumber}
            onChangeText={handleChangeAccountNumber}
            placeholder="0123456789"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="number-pad"
            maxLength={ACCOUNT_NUMBER_LENGTH}
            style={styles.fieldInput}
          />
        </View>

        <View style={styles.nameCard}>
          <Text style={styles.nameCardLabel}>Account Name</Text>
          <Text style={styles.nameCardValue}>
            {verifying ? "Verifying..." : verifiedName || "—"}
          </Text>
          <View style={styles.verifyNoteRow}>
            <Ionicons
              name="shield-checkmark"
              size={20}
              color={COLORS.primary}
            />
            <Text style={styles.verifyNoteText}>Account will be verified</Text>
          </View>
        </View>

        <Text style={styles.disclaimerText}>
          Your account is securely verified before any withdrawal is processed
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.linkBtn, !canLink && styles.linkBtnDisabled]}
          activeOpacity={0.85}
          disabled={!canLink}
          onPress={handleLinkBankAccount}
        >
          <Text style={styles.linkBtnText}>Link Bank Account</Text>
        </TouchableOpacity>

        <View style={styles.securedRow}>
          <Ionicons name="lock-closed" size={14} color={COLORS.textSecondary} />
          <Text style={styles.securedText}>Secured by Paystack</Text>
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
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  selectedBankCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.selectedBg,
    borderWidth: 1.0,
    borderColor: "#CFE6D9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 40,
  },
  bankBadge: {
    width: 44,
    height: 44,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 16,
  },
  bankLogo: {
    width: "100%",
    height: "100%",
  },
  selectedBankName: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
  },
  changeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  fieldLabel: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  fieldWrap: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },
  fieldInput: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: COLORS.textPrimary,
    padding: 0,
  },
  nameCard: {
    backgroundColor: COLORS.nameCardBg,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
  },
  nameCardLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  nameCardValue: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.primary,
    marginBottom: 16,
  },
  verifyNoteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  verifyNoteText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  disclaimerText: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  linkBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  linkBtnDisabled: { opacity: 0.5 },
  linkBtnText: {
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
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
