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
    </Tabs>
  );
}
