import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Linking,
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

const HUBS = [
  {
    id: "greencycle-ikorodu",
    name: "GreenCycle Ikorodu",
    verified: true,
    address: "12 Ajisan street, Ikorodu, Lagos",
    phone: "+2348012345678",
    lat: 6.6018,
    lng: 3.5106,
    accepts: [
      { id: "plastic", icon: "water-outline" },
      { id: "paper", icon: "document-text-outline" },
      { id: "metal", icon: "hardware-chip-outline" },
      { id: "glass", icon: "wine-outline" },
    ],
  },
  {
    id: "ecocollect",
    name: "EcoCollect",
    verified: true,
    address: "3 Balogun crescent, Maryland, Lagos",
    phone: "+2348023456789",
    lat: 6.5721,
    lng: 3.3667,
    accepts: [
      { id: "plastic", icon: "water-outline" },
      { id: "paper", icon: "document-text-outline" },
      { id: "metal", icon: "hardware-chip-outline" },
    ],
  },
  {
    id: "ojuelegba-collection-point",
    name: "Ojuelegba Collection point",
    verified: true,
    address: "10 Ganiyu rd, Ojuelegba, Lagos",
    phone: "+2348034567890",
    lat: 6.5083,
    lng: 3.3667,
    accepts: [
      { id: "plastic", icon: "water-outline" },
      { id: "paper", icon: "document-text-outline" },
      { id: "metal", icon: "hardware-chip-outline" },
      { id: "glass", icon: "wine-outline" },
    ],
  },
];

export default function CollectionHubs() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const selectedPartner =
    typeof params.selectedPartner === "string" ? params.selectedPartner : "";
  const [query, setQuery] = useState("");

  const filteredHubs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HUBS;
    return HUBS.filter(
      (h) =>
        h.name.toLowerCase().includes(q) || h.address.toLowerCase().includes(q),
    );
  }, [query]);

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleDirections = (hub) => {
    Linking.openURL(`https://maps.google.com/?q=${hub.lat},${hub.lng}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Collection Hubs</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color={COLORS.textSecondary} />
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

        {filteredHubs.map((hub) => (
          <View key={hub.id}>
            <TouchableOpacity
              style={[
                styles.hubCard,
                selectedPartner === hub.id && {
                  borderWidth: 2,
                  borderColor: COLORS.primary,
                  backgroundColor: "#F6FFF8",
                },
              ]}
              activeOpacity={0.8}
              onPress={() =>
                router.replace({
                  pathname: "/(pickup)/collection-partners",
                  params: { hubId: hub.id },
                })
              }
            >
              <Text style={styles.hubName}>{hub.name}</Text>
              {hub.verified && (
                <View style={styles.verifiedRow}>
                  <Ionicons name="star" size={12} color={COLORS.primary} />
                  <Text style={styles.verifiedText}>Verified Partner</Text>
                </View>
              )}
              <View style={styles.addressRow}>
                <View style={styles.addressLeft}>
                  <Ionicons
                    name="location-outline"
                    size={15}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.addressText}>{hub.address}</Text>
                </View>
                <View style={styles.hubActions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleCall(hub.phone)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name="call-outline"
                      size={19}
                      color={COLORS.textPrimary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleDirections(hub)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name="navigate-outline"
                      size={19}
                      color={COLORS.textPrimary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <Text style={styles.acceptsLabel}>Accepts</Text>
            <View style={styles.acceptsRow}>
              {hub.accepts.map((item) => (
                <View key={item.id} style={styles.acceptsIconWrap}>
                  <Ionicons
                    name={item.icon}
                    size={26}
                    color={COLORS.primaryDark}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        {filteredHubs.length === 0 && (
          <Text style={styles.emptyText}>
            No hubs match "{query}". Try a different name or area.
          </Text>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.textPrimary,
  },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 },

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

  hubCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
  hubName: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  verifiedText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingRight: 12,
  },
  addressText: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  hubActions: { flexDirection: "row", gap: 14 },
  actionBtn: {
    width: 24,
    height: 24,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
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

  emptyText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 12,
  },
});
