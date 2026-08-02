import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const COLLECTOR_AVATAR = require("../../assets/images/profile.png");

const SUMMARY = {
  confirmed: 4,
  pending: 1,
  disputed: 1,
};

const TRANSACTIONS = [
  {
    id: "1",
    day: "TODAY",
    name: "Olamide Adekunle",
    amount: 1488,
    status: "confirmed",
    material: "PET - 12.4 kg",
    tags: ["REGISTERED", "SCHEDULED"],
    time: "09:12",
  },
  {
    id: "2",
    day: "TODAY",
    name: "Emeka Chuks",
    amount: 800,
    status: "pending",
    material: "PET - 4 kg + Cardboard - 4 kg",
    tags: ["REGISTERED", "SCHEDULED"],
    time: "08:45",
  },
  {
    id: "3",
    day: "TODAY",
    name: "General seller - Adeniran gate",
    amount: 1440,
    status: "confirmed",
    material: "Aluminium - 3.2 kg",
    tags: ["GENERAL", "DROP-OFF"],
    time: "08:20",
  },
  {
    id: "4",
    day: "YESTERDAY",
    name: "Chidera Okafor",
    amount: 1760,
    status: "disputed",
    material: "Cardboard - 22 kg",
    tags: ["REGISTERED", "SCHEDULED"],
    time: "16:02",
  },
  {
    id: "5",
    day: "YESTERDAY",
    name: "Segun Ade",
    amount: 732,
    status: "confirmed",
    material: "PET - 6.1 kg",
    tags: ["REGISTERED", "SCHEDULED"],
    time: "14:11",
  },
  {
    id: "6",
    day: "YESTERDAY",
    name: "General seller - Shitta drop-off",
    amount: 1200,
    status: "confirmed",
    material: "Cardboard - 15 kg",
    tags: ["GENERAL", "DROP-OFF"],
    time: "11:30",
  },
];

const STATUS_STYLES = {
  confirmed: { bg: "#D9F2DF", text: COLORS.primary, label: "CONFIRMED" },
  pending: { bg: "#FCEACB", text: "#B8770A", label: "PENDING" },
  disputed: { bg: "#FBDCDA", text: "#C23B2E", label: "DISPUTED" },
};

function groupByDay(transactions) {
  const groups = [];
  let currentDay = null;
  transactions.forEach((tx) => {
    if (tx.day !== currentDay) {
      groups.push({ day: tx.day, items: [] });
      currentDay = tx.day;
    }
    groups[groups.length - 1].items.push(tx);
  });
  return groups;
}

function TransactionRow({ tx }) {
  const statusStyle = STATUS_STYLES[tx.status];
  return (
    <View style={styles.txRow}>
      <View style={styles.txTopRow}>
        <Text style={styles.txName}>{tx.name}</Text>
        <View style={styles.txAmountWrap}>
          <Text style={styles.txAmount}>₦{tx.amount.toLocaleString()}</Text>
          <View
            style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}
          >
            <Text style={[styles.statusPillText, { color: statusStyle.text }]}>
              {statusStyle.label}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.txMaterial}>{tx.material}</Text>

      <View style={styles.txBottomRow}>
        <View style={styles.tagsRow}>
          {tx.tags.map((tag) => (
            <View key={tag} style={styles.tagPill}>
              <Text style={styles.tagPillText}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.txTime}>- {tx.time}</Text>
      </View>
    </View>
  );
}

export default function CollectorTransactionHistory() {
  const groups = groupByDay(TRANSACTIONS);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Transaction history</Text>
          <Image source={COLLECTOR_AVATAR} style={styles.avatar} />
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>CONFIRMED</Text>
            <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
              {SUMMARY.confirmed}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>PENDING</Text>
            <Text style={[styles.summaryValue, { color: "#D89A1C" }]}>
              {SUMMARY.pending}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>DISPUTED</Text>
            <Text style={[styles.summaryValue, { color: "#C23B2E" }]}>
              {SUMMARY.disputed}
            </Text>
          </View>
        </View>

        {groups.map((group) => (
          <View key={group.day}>
            <Text style={styles.dayLabel}>{group.day}</Text>
            {group.items.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 32 },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: COLORS.textPrimary,
    paddingRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
  },

  summaryCard: {
    flexDirection: "row",
    borderWidth: 1.0,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 23,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  summaryValue: {
    fontFamily: FONTS.bold,
    fontSize: 24,
  },

  dayLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    letterSpacing: 0.5,
    color: COLORS.textSecondary,
    marginBottom: 13,
    marginTop: 5,
  },

  txRow: {
    marginBottom: 24,
  },
  txTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  txName: {
    flex: 1,
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingRight: 12,
  },
  txAmountWrap: {
    alignItems: "flex-end",
  },
  txAmount: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  statusPill: {
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusPillText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    letterSpacing: 0.3,
  },

  txMaterial: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  txBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagsRow: {
    flexDirection: "row",
    gap: 8,
  },
  tagPill: {
    backgroundColor: "#D9F2DF",
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  tagPillText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    letterSpacing: 0.3,
    color: COLORS.primary,
  },
  txTime: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
});
