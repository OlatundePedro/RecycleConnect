import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const TABS = ["Available", "Active", "Completed"];

const AVAILABLE = [
  {
    id: "a1",
    name: "Samuel A.",
    address: "15 Adeniran Ogunsanya St, Surulere",
    materials: ["Plastic", "Paper"],
    time: "10:00 AM – 12:00 PM",
    distance: "1.4 km",
    reward: "₦350 – ₦500",
  },
  {
    id: "a2",
    name: "Chioma N.",
    address: "22 Bode Thomas St, Surulere",
    materials: ["Glass", "Metal"],
    time: "12:00 PM – 2:00 PM",
    distance: "2.8 km",
    reward: "₦400 – ₦600",
  },
];

const ACTIVE_JOBS = [
  {
    id: "ac1",
    name: "Babatunde F.",
    address: "8 Oduduwa Crescent, Ikeja",
    materials: ["Electronics"],
    status: "En Route",
    eta: "~10 min",
  },
];

const COMPLETED_JOBS = [
  {
    id: "c1",
    name: "Adaeze O.",
    address: "5 Allen Avenue, Ikeja",
    materials: ["Organic"],
    date: "13 May, 2024",
    earned: "₦280",
  },
  {
    id: "c2",
    name: "Tunde B.",
    address: "9 Awolowo Road, Ikoyi",
    materials: ["Plastic", "Glass"],
    date: "10 May, 2024",
    earned: "₦470",
  },
];

export default function CollectorJobs() {
  const [activeTab, setActiveTab] = useState("Available");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jobs</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, activeTab === t && styles.tabActive]}
            onPress={() => setActiveTab(t)}
          >
            <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Available */}
        {activeTab === "Available" &&
          AVAILABLE.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <View style={styles.jobTop}>
                <View style={styles.jobAvatar}>
                  <Ionicons name="person" size={18} color={COLORS.primary} />
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobName}>{job.name}</Text>
                  <Text style={styles.jobAddr}>{job.address}</Text>
                </View>
                <Text style={styles.jobDist}>{job.distance}</Text>
              </View>
              <View style={styles.chipsRow}>
                {job.materials.map((m) => (
                  <View key={m} style={styles.chip}>
                    <Text style={styles.chipText}>{m}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.jobMeta}>
                <Ionicons name="time-outline" size={13} color={COLORS.muted} />
                <Text style={styles.jobMetaText}>{job.time}</Text>
                <Text style={styles.jobReward}>{job.reward}</Text>
              </View>
              <View style={styles.jobActions}>
                <TouchableOpacity style={styles.skipBtn}>
                  <Text style={styles.skipBtnText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptBtn}>
                  <Text style={styles.acceptBtnText}>Accept Job</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        {/* Active */}
        {activeTab === "Active" &&
          ACTIVE_JOBS.map((job) => (
            <View key={job.id} style={[styles.jobCard, styles.activeJobCard]}>
              <View style={styles.activeTopRow}>
                <View style={styles.livePill}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>ACTIVE</Text>
                </View>
                <Text style={styles.etaText}>ETA {job.eta}</Text>
              </View>
              <View style={styles.jobTop}>
                <View style={styles.jobAvatar}>
                  <Ionicons name="person" size={18} color={COLORS.primary} />
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobName}>{job.name}</Text>
                  <Text style={styles.jobAddr}>{job.address}</Text>
                </View>
              </View>
              <View style={styles.chipsRow}>
                {job.materials.map((m) => (
                  <View key={m} style={styles.chip}>
                    <Text style={styles.chipText}>{m}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.completeBtn}>
                <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.white} />
                <Text style={styles.completeBtnText}>Mark as Completed</Text>
              </TouchableOpacity>
            </View>
          ))}

        {/* Completed */}
        {activeTab === "Completed" &&
          COMPLETED_JOBS.map((job) => (
            <View key={job.id} style={styles.completedCard}>
              <View style={styles.completedLeft}>
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
                </View>
                <View style={styles.jobInfo}>
                  <Text style={styles.jobName}>{job.name}</Text>
                  <Text style={styles.jobAddr}>{job.address}</Text>
                  <Text style={styles.jobDate}>{job.date}</Text>
                </View>
              </View>
              <Text style={styles.earnedText}>{job.earned}</Text>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  tabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  tabText: { fontFamily: FONTS.medium, fontSize: 13, color: COLORS.muted },
  tabTextActive: { color: COLORS.white },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },

  jobCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeJobCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  activeTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  liveText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.primary,
  },
  etaText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  jobTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  jobAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  jobInfo: { flex: 1 },
  jobName: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  jobAddr: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  jobDate: {
    fontFamily: FONTS.regular,
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },
  jobDist: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  chip: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chipText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primary,
  },
  jobMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  jobMetaText: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  jobReward: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primary,
  },
  jobActions: { flexDirection: "row", gap: 10 },
  skipBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  skipBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  acceptBtn: {
    flex: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: "center",
  },
  acceptBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.white,
  },
  completeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
  },
  completeBtnText: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },

  completedCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  completedLeft: { flexDirection: "row", alignItems: "flex-start", flex: 1 },
  checkIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  earnedText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
  },
});
