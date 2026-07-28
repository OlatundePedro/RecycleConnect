import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/typography";

const TABS = [
  {
    id: "home",
    label: "Home",
    icon: "home-outline",
    name: "home",
  },
  {
    id: "history",
    label: "History",
    icon: "alarm-outline",
    name: "track",
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: "wallet-outline",
    name: "rewards",
  },
  {
    id: "profile",
    label: "Profile",
    icon: "person-outline",
    name: "profile",
  },
];

// Maps a TABS route ("/household/home") to its expo-router screen
// name ("home") — Tabs.Screen wants just the segment, not the full path.
const routeToScreenName = (route) => route.split("/").pop();

export default function HouseholdLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 75,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.medium,
          fontSize: 11,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.id}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}

      {/* Hidden routes - accessible via router.push but not shown in tab bar */}

      <Tabs.Screen name="partners" options={{ href: null }} />
      <Tabs.Screen name="dropoff" options={{ href: null }} />
    </Tabs>
  );
}
