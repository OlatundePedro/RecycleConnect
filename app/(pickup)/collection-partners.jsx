import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
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
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(PARTNERS[0]?.id ?? null);

  const filteredPartners = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PARTNERS;
    return PARTNERS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.area.toLowerCase().includes(q),
    );
  }, [query]);

  const selectedPartner = PARTNERS.find((p) => p.id === selectedId);

  const handleConfirm = () => {
    if (!selectedPartner) return;
    router.push({
      pathname: "/(pickup)/material-confirm",
      params: { partnerId: selectedPartner.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collection Partners</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
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

        {filteredPartners.map((partner) => {
          const active = partner.id === selectedId;
          return (
            <View
              key={partner.id}
              style={styles.partnerCard}
              onPress={() => setSelectedId(partner.id)}
              activeOpacity={0.8}
            >
              <View style={styles.partnerCardText}>
                <Text style={styles.partnerName}>{partner.name}</Text>
                {partner.verified && (
                  <View style={styles.verifiedRow}>
                    <Ionicons name="star" size={12} color={COLORS.primary} />
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
            </View>
          );
        })}

        {filteredPartners.length === 0 && (
          <Text style={styles.emptyText}>
            No partners match "{query}". Try a different name or area.
          </Text>
        )}

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
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    borderWidth: 1.0,
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
    fontSize: 16,
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
    fontSize: 13,
    color: COLORS.primary,
  },
  areaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  areaText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
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
    padding: 16,
    marginBottom: 24,
  },
  mutedLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  nextCollectionDate: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  nextCollectionTime: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  nextCollectionLocation: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  acceptsLabel: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 14,
    paddingLeft: 10,
  },
  acceptsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
    paddingLeft: 5,
  },
  acceptsIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 32,
    backgroundColor: "#8FE3A4",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    padding: 18,
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

  confirmBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
