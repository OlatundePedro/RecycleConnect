import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
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
import { NIGERIAN_BANKS } from "../../constants/banks";
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

const POPULAR_BANKS = [
  {
    key: "access-bank",
    name: "Access Bank",
    bankCode: "044",
    logoKey: "access-bank",
  },
  {
    key: "guaranty-trust-bank-gtbank",
    name: "GTBank",
    bankCode: "058",
    logoKey: "guaranty-trust-bank-gtbank",
  },
  {
    key: "first-bank-of-nigeria",
    name: "First Bank",
    bankCode: "011",
    logoKey: "first-bank-of-nigeria",
  },
  {
    key: "united-bank-for-africa-uba",
    name: "UBA",
    bankCode: "033",
    logoKey: "united-bank-for-africa-uba",
  },
];

function BankBadge({ logo }) {
  return (
    <View style={styles.bankBadge}>
      {logo ? (
        <Image source={logo} style={styles.bankLogo} resizeMode="cover" />
      ) : (
        <Ionicons
          name="business-outline"
          size={20}
          color={COLORS.textPrimary}
        />
      )}
    </View>
  );
}

export default function SelectBank() {
  const router = useRouter();

  const { selectedBankKey } = useLocalSearchParams();

  const [query, setQuery] = useState("");
  const [moreBanksVisible, setMoreBanksVisible] = useState(false);
  const [moreBanksQuery, setMoreBanksQuery] = useState("");

  const filteredBanks = POPULAR_BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const filteredAllBanks = NIGERIAN_BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(moreBanksQuery.trim().toLowerCase()),
  );

  const goToLinkAccount = (bankKey, bankName, bankLogoKey, bankCode) => {
    router.push({
      pathname: "/link-bank-account",
      params: {
        bankKey,
        bankName,
        bankLogo: bankLogoKey,
        bankCode,
      },
    });
  };

  const handleSelectBank = (bank) => {
    goToLinkAccount(bank.key, bank.name, bank.key, bank.bankCode);
  };

  const handleSelectFromAllBanks = (bank) => {
    setMoreBanksVisible(false);
    setMoreBanksQuery("");

    goToLinkAccount(bank.key, bank.name, bank.key, bank.bankCode);
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

        {filteredBanks.map((bank) => {
          const logo = BANK_LOGOS[bank.logoKey];

          return (
            <TouchableOpacity
              key={bank.key}
              style={[
                styles.bankRow,
                bank.key === selectedBankKey && styles.bankRowSelected,
              ]}
              activeOpacity={0.7}
              onPress={() => handleSelectBank(bank)}
            >
              <BankBadge logo={logo} />

              <Text style={styles.bankName}>{bank.name}</Text>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textPrimary}
              />
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.bankRow}
          activeOpacity={0.7}
          onPress={() => setMoreBanksVisible(true)}
        >
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

      <Modal
        visible={moreBanksVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setMoreBanksVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Your Bank</Text>

              <TouchableOpacity
                onPress={() => setMoreBanksVisible(false)}
                hitSlop={12}
              >
                <Ionicons name="close" size={22} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSearchWrap}>
              <Ionicons
                name="search"
                size={18}
                color={COLORS.placeholder}
                style={{ marginRight: 8 }}
              />

              <TextInput
                value={moreBanksQuery}
                onChangeText={setMoreBanksQuery}
                placeholder="Search for your bank"
                placeholderTextColor={COLORS.placeholder}
                style={styles.modalSearchInput}
                autoFocus
              />
            </View>

            <FlatList
              data={filteredAllBanks}
              keyExtractor={(item) => item.key}
              style={{ maxHeight: 420 }}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const logo = BANK_LOGOS[item.logoKey];

                return (
                  <TouchableOpacity
                    style={styles.modalBankRow}
                    onPress={() => handleSelectFromAllBanks(item)}
                  >
                    <BankBadge logo={BANK_LOGOS[item.key]} />
                    <Text style={styles.modalBankName}>{item.name}</Text>

                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={COLORS.textPrimary}
                    />
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text style={styles.modalEmptyText}>
                  No banks match "{moreBanksQuery}"
                </Text>
              }
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 5,
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.primary,
    marginLeft: 105,
  },

  scroll: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },

  title: {
    fontFamily: FONTS.bold,
    fontSize: 23,
    color: COLORS.textPrimary,
    marginBottom: 19,
  },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 19,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },

  bankRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: -1,
  },

  bankRowSelected: {
    backgroundColor: COLORS.selectedBg,
  },

  bankBadge: {
    width: 42,
    height: 42,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: COLORS.headerBg,
    alignItems: "center",
    justifyContent: "center",
  },

  bankLogo: {
    width: "100%",
    height: "100%",
  },

  moreBanksIcon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  bankName: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  // --------------------------------------------------
  // MODAL
  // --------------------------------------------------

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(16, 56, 47, 0.4)",
    justifyContent: "flex-end",
  },

  modalSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: "65%",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },

  modalSearchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },

  modalSearchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
    padding: 0,
  },

  modalBankRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F3",
  },

  modalBankName: {
    flex: 1,
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  modalEmptyText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingVertical: 24,
  },
});
