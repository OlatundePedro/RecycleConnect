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
import { COLORS } from "../../../constants/colors";
import { FONTS } from "../../../constants/typography";

const HUBS = [
  {
    id: "h1",
    name: "EcoCollect Hub",
    address: "Maryland, Ikorodu",
    distance: "0.8 km",
    hours: "Open · Closes 6:00 PM",
    hoursOpen: true,
  },
  {
    id: "h2",
    name: "GreenCycle Center",
    address: "Ojingungen, Ikorodu",
    distance: "1.2 km",
    hours: "Open · Closes 6:00 PM",
    hoursOpen: true,
  },
  {
    id: "h3",
    name: "Recycle Point",
    address: "Sabo, Ikorodu",
    distance: "3.6 km",
    hours: "Open · Closes 6:00 PM",
    hoursOpen: true,
  },
  {
    id: "h4",
    name: "EcoCollect Hub Ikorodu",
    address: "Ijede Road, Ikorodu",
    distance: "4.1 km",
    hours: "Open · Closes 6:00 PM",
    hoursOpen: true,
  },
  {
    id: "h5",
    name: "GreenCycle Center",
    address: "Owutu, Ikorodu",
    distance: "5.3 km",
    hours: "Open · Closes 7:00 PM",
    hoursOpen: true,
  },
];

export default function FindDropoff() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = HUBS.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Drop-off Location</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Map placeholder */}
      <View style={styles.mapBox}>
        <View style={styles.mapInner}>
          {[...Array(5)].map((_, row) => (
            <View key={row} style={styles.mapRow}>
              {[...Array(5)].map((_, col) => (
                <View key={col} style={styles.mapCell} />
              ))}
            </View>
          ))}
          {/* Pins */}
          {[
            { top: "25%", left: "20%" },
            { top: "40%", left: "55%" },
            { top: "60%", left: "35%" },
          ].map((pos, i) => (
            <View key={i} style={[styles.mapPin, pos]}>
              <Ionicons name="location" size={14} color={COLORS.white} />
            </View>
          ))}
        </View>

        {/* Use my location button overlaid */}
        <TouchableOpacity style={styles.locationBtn}>
          <Ionicons name="navigate" size={14} color={COLORS.primary} />
          <Text style={styles.locationBtnText}>Use my location</Text>
        </TouchableOpacity>
      </View>

      {/* Search + list */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={COLORS.muted} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search hub or area"
          placeholderTextColor={COLORS.muted}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={18} color={COLORS.primary} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.nearbyLabel}>Nearby Hubs</Text>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.map((hub) => (
          <TouchableOpacity
            key={hub.id}
            style={styles.hubRow}
            onPress={() => router.push({ pathname: "/household/dropoff/hub", params: { hubId: hub.id, hubName: hub.name } })}
            activeOpacity={0.8}
          >
            {/* Hub icon */}
            <View style={styles.hubIcon}>
              <Ionicons name="location" size={18} color={COLORS.primary} />
            </View>

            {/* Info */}
            <View style={styles.hubInfo}>
              <Text style={styles.hubName}>{hub.name}</Text>
              <Text style={styles.hubAddress}>{hub.address}</Text>
              <Text style={[styles.hubHours, !hub.hoursOpen && styles.hubHoursClosed]}>
                {hub.hours}
              </Text>
            </View>

            {/* Distance */}
            <View style={styles.hubRight}>
              <Text style={styles.hubDistance}>{hub.distance}</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.muted} />
            </View>
          </TouchableOpacity>
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
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  mapBox: {
    height: 160,
    backgroundColor: "#e8f5e9",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  mapInner: { flex: 1, position: "relative" },
  mapRow: { flexDirection: "row", flex: 1 },
  mapCell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "rgba(24,138,90,0.1)",
  },
  mapPin: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  locationBtn: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  locationBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primary,
  },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    marginLeft: 4,
  },
  filterText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.primary,
  },

  nearbyLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },

  scroll: { paddingHorizontal: 20, paddingBottom: 32 },

  hubRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  hubIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  hubInfo: { flex: 1 },
  hubName: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  hubAddress: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  hubHours: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.primary,
  },
  hubHoursClosed: { color: COLORS.danger },
  hubRight: { alignItems: "flex-end", gap: 4, flexShrink: 0 },
  hubDistance: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
});
