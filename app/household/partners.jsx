import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const PARTNERS = [
  {
    id: "p1",
    name: "GreenCycle Ikorodu",
    verified: true,
    rating: 4.8,
    date: "Sat, May 18",
    time: "9:00 AM – 1:00 PM",
    location: "Ikorodu, Lagos",
    materials: ["Plastic", "Paper", "Metal", "Glass"],
    priority: true,
  },
  {
    id: "p2",
    name: "EcoCycle Solutions",
    verified: true,
    rating: 4.5,
    date: "Sat, May 19",
    time: "9:00 AM – 1:00 PM",
    location: "Yaba, Lagos",
    materials: ["Plastic", "Paper"],
    priority: false,
  },
  {
    id: "p3",
    name: "GreenHub Collectors",
    verified: false,
    rating: 4.2,
    date: "Sun, May 20",
    time: "10:00 AM – 2:00 PM",
    location: "Surulere, Lagos",
    materials: ["Metal", "Glass", "Others"],
    priority: false,
  },
];

export default function CollectionPartners() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = PARTNERS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collection Partners</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={COLORS.muted} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search partners or areas"
          placeholderTextColor={COLORS.muted}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color={COLORS.muted} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.map((partner) => (
          <View key={partner.id} style={styles.partnerCard}>
            {/* Top row */}
            <View style={styles.partnerTop}>
              <View style={styles.partnerIconBg}>
                <Ionicons name="leaf" size={18} color={COLORS.white} />
              </View>
              <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>{partner.name}</Text>
                {partner.verified && (
                  <View style={styles.verifiedRow}>
                    <Ionicons name="checkmark-circle" size={13} color={COLORS.primary} />
                    <Text style={styles.verifiedText}> Verified Partner</Text>
                  </View>
                )}
              </View>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#F9C74F" />
                <Text style={styles.ratingText}> {partner.rating}</Text>
              </View>
            </View>

            {/* Schedule */}
            <View style={styles.scheduleRow}>
              <Ionicons name="calendar-outline" size={14} color={COLORS.primary} />
              <Text style={styles.scheduleText}>
                {partner.date} · {partner.time}
              </Text>
            </View>
            <View style={styles.scheduleRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.primary} />
              <Text style={styles.scheduleText}>{partner.location}</Text>
            </View>

            {/* Materials tags */}
            <View style={styles.materialsRow}>
              {partner.materials.map((m) => (
                <View key={m} style={styles.materialTag}>
                  <Text style={styles.materialTagText}>{m}</Text>
                </View>
              ))}
            </View>

            {/* Actions */}
            <View style={styles.cardActions}>
              {partner.priority && (
                <View style={styles.nextBadge}>
                  <Text style={styles.nextBadgeText}>Next collection</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => router.push("/household/pickup")}
              >
                <Text style={styles.viewBtnText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  scroll: { paddingHorizontal: 20, paddingBottom: 32 },

  partnerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    gap: 10,
  },
  partnerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  partnerIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  partnerInfo: { flex: 1 },
  partnerName: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  verifiedRow: { flexDirection: "row", alignItems: "center" },
  verifiedText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.primary,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    flexShrink: 0,
  },
  ratingText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: "#92400E",
  },

  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  scheduleText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  materialsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  materialTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  materialTagText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primary,
  },

  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  nextBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  nextBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: COLORS.primary,
  },
  viewBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 10,
    marginLeft: "auto",
  },
  viewBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.white,
  },
});
