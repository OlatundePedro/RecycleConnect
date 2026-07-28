import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";

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

// Swap for the real partner list for this household's area.
const PARTNERS = [
  {
    id: "greencycle-ikorodu",
    name: "GreenCycle Ikorodu",
    verified: true,
    area: "Ikorodu, Lagos",
    nextCollection: {
      date: "Saturday, May 15",
      time: "9:00 AM - 12:30 PM",
      location: "Ikorodu, Lagos",
    },
    accepts: [
      { id: "plastic", icon: "water-outline" },
      { id: "paper", icon: "document-text-outline" },
      { id: "metal", icon: "hardware-chip-outline" },
      { id: "glass", icon: "wine-outline" },
    ],
  },
];

export default function CollectionPartners() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(
    typeof params.selectedPartner === "string"
      ? params.selectedPartner
      : PARTNERS[0].id,
  );

  useEffect(() => {
    if (typeof params.selectedPartner === "string") {
      setSelectedId(params.selectedPartner);
    }
  }, [params.selectedPartner]);

  const filteredPartners = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return PARTNERS;

    return PARTNERS.filter(
      (partner) =>
        partner.name.toLowerCase().includes(q) ||
        partner.area.toLowerCase().includes(q),
    );
  }, [query]);

  const selectedPartner =
    PARTNERS.find((partner) => partner.id === selectedId) || PARTNERS[0];

  const handleConfirm = () => {
    router.push({
      pathname: "/(pickup)/material-confirm",
      params: {
        partnerId: selectedPartner.id,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collection Partners</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Search + filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              placeholder="Search partners or areas"
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons
              name="filter-outline"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Partner list */}
        {filteredPartners.map((partner) => {
          const active = partner.id === selectedId;

          return (
            <TouchableOpacity
              key={partner.id}
              style={[
                styles.partnerCard,
                active && {
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                },
              ]}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/(pickup)/collection-hub",
                  params: {
                    selectedPartner: partner.id,
                  },
                })
              }
            >
              <View style={styles.partnerCardText}>
                <Text style={styles.partnerName}>{partner.name}</Text>

                {partner.verified && (
                  <View style={styles.verifiedRow}>
                    <Ionicons name="star" size={13} color={COLORS.primary} />
                    <Text style={styles.verifiedText}>Verified Partner</Text>
                  </View>
                )}

                <View style={styles.areaRow}>
                  <Ionicons
                    name="location-outline"
                    size={15}
                    color={COLORS.textSecondary}
                  />

                  <Text style={styles.areaText}>{partner.area}</Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color={active ? COLORS.primary : COLORS.textSecondary}
              />
            </TouchableOpacity>
          );
        })}

        {filteredPartners.length === 0 && (
          <Text style={styles.emptyText}>
            No partners match "{query}". Try a different name or area.
          </Text>
        )}

        {/* Next collection + accepts, for the selected partner */}
        {selectedPartner && (
          <>
            <View style={styles.nextCollectionCard}>
              <Text style={styles.mutedLabel}>Next Collection</Text>
              <Text style={styles.nextCollectionDate}>
                {selectedPartner.nextCollection.date}
              </Text>
              <Text style={styles.nextCollectionTime}>
                {selectedPartner.nextCollection.time}
              </Text>
              <Text style={styles.nextCollectionLocation}>
                {selectedPartner.nextCollection.location}
              </Text>
            </View>

            <Text style={styles.acceptsLabel}>Accepts</Text>
            <View style={styles.acceptsRow}>
              {selectedPartner.accepts.map((item) => (
                <View key={item.id} style={styles.acceptsIconWrap}>
                  <Ionicons
                    name={item.icon}
                    size={26}
                    color={COLORS.primaryDark}
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      {/* Confirm */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            !selectedPartner && styles.confirmBtnDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!selectedPartner}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    color: COLORS.textPrimary,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  partnerCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
  partnerCardText: { flex: 1 },
  partnerName: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  verifiedText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.primary,
  },
  areaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  areaText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 16,
  },

  nextCollectionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
  },
  mutedLabel: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  nextCollectionDate: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  nextCollectionTime: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  nextCollectionLocation: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  acceptsLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  acceptsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  acceptsIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#8FE3A4",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  confirmBtnDisabled: { opacity: 0.45 },
  confirmBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 17,
    color: COLORS.white,
  },
});
