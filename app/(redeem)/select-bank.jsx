import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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

const COLORS = {
  primary: "#188A5A",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  headerBg: "#F7F9F8",
  border: "#D9E4DD",
  selectedBg: "#EAF6F0",
  placeholder: "#9AA9A3",
  white: "#FFFFFF",
};

// Bank names/keys live here; the actual logo images come from the shared
// constants/bankLogos.js map (keys must match).
const POPULAR_BANKS = [
  { key: "access", name: "Access Bank", logo: BANK_LOGOS.access },
  { key: "gtbank", name: "GTBank", logo: BANK_LOGOS.gtbank },
  { key: "firstbank", name: "First Bank", logo: BANK_LOGOS.firstbank },
  { key: "uba", name: "UBA", logo: BANK_LOGOS.uba },
];

function BankBadge({ logo }) {
  return (
    <View style={styles.bankBadge}>
      <Image source={logo} style={styles.bankLogo} resizeMode="cover" />
    </View>
  );
}

export default function SelectBank() {
  const router = useRouter();
  const { selectedBankKey } = useLocalSearchParams();
  const [query, setQuery] = useState("");

  const filteredBanks = POPULAR_BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const handleSelectBank = (bank) => {
    router.push({
      pathname: "/link-bank-account",
      params: {
        bankKey: bank.key,
        bankName: bank.name,
        bankLogo: bank.key,
      },
    });
  };

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
          <Text style={styles.headerTitle}>Link Bank Account</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Select Your Bank</Text>

        <View style={styles.searchWrap}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.placeholder}
            style={{ marginRight: 10 }}
          />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for your bank"
            placeholderTextColor={COLORS.placeholder}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionLabel}>Popular Banks</Text>

        {filteredBanks.map((bank) => (
          <TouchableOpacity
            key={bank.key}
            style={[
              styles.bankRow,
              bank.key === selectedBankKey && styles.bankRowSelected,
            ]}
            activeOpacity={0.7}
            onPress={() => handleSelectBank(bank)}
          >
            <BankBadge logo={bank.logo} />
            <Text style={styles.bankName}>{bank.name}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.bankRow} activeOpacity={0.7}>
          <View style={styles.moreBanksIcon}>
            <Ionicons
              name="business-outline"
              size={26}
              color={COLORS.textPrimary}
            />
          </View>
          <Text style={styles.bankName}>see more banks</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 24,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 32,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
    padding: 0,
  },
  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: -1,
  },
  bankRowSelected: {
    backgroundColor: COLORS.selectedBg,
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
  moreBanksIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  bankName: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
});
