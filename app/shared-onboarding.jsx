import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FONTS } from "../constants/typography";

// Same palette used across the rest of the app, for visual consistency
const COLORS = {
  primary: "#2D7A46",
  textPrimary: "#111111",
  textSecondary: "#6B7A75",
  background: "#FFFFFF",
  dotInactive: "#D8E3DE",
  white: "#FFFFFF",
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Where the flow lands once someone finishes or skips onboarding.
const NEXT_ROUTE = "/role-selection";

const SLIDES = [
  {
    key: "waste-into-value",
    title: "Your Recyclables are\nworth more than you think",
    subtitle:
      "Recyclables often end up mixed with waste \nbecause no one nearby is set up to collect, \nweigh, and pay for them",
    image: require("../assets/images/Waste management-amico 1.png"),
    buttonLabel: "Next",
  },
  {
    key: "recycle-easily",
    title: "Recycle on your \nown schedule",
    subtitle:
      "Find verified Collection Partners nearby, \nsee their pickup times, and choose \npickup or drop-off",
    image: require("../assets/images/Recycling-rafiki 1.png"),
    buttonLabel: "Next",
  },
  {
    key: "more-earnings",
    title: "More collections,\nmore earnings",
    subtitle:
      "See demand in your area, \nplan smart trips and earn more \ncollecting what matters.",
    image: require("../assets/images/Waste management-rafiki 2.png"),
    buttonLabel: "Get Started",
  },
];

export default function SharedOnboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === SLIDES.length - 1;

  const goToFlow = () => {
    router.replace(NEXT_ROUTE);
  };

  const handleMomentumScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const handlePrimaryAction = () => {
    if (isLastSlide) {
      goToFlow();
      return;
    }
    listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Skip — pinned top-right, always available */}
      <TouchableOpacity
        style={[styles.skipButton, { top: insets.top + 16 }]}
        onPress={goToFlow}
        hitSlop={10}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <Image
              source={item.image}
              style={styles.illustration}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dotsRow}>
        {SLIDES.map((slide, index) => (
          <View
            key={slide.key}
            style={[
              styles.dot,
              index === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Primary button — Next on slides 1-2, Get Started on the last slide */}
      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.85}
        onPress={handlePrimaryAction}
      >
        <Text style={styles.primaryButtonText}>
          {SLIDES[activeIndex].buttonLabel}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  skipButton: {
    position: "absolute",
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: COLORS.primary,
  },
  slide: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 105,
    alignItems: "center",
  },
  illustration: {
    width: "90%",
    height: 280,
    marginBottom: 30,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    lineHeight: 36,
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 44,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
  dotInactive: {
    backgroundColor: COLORS.dotInactive,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginBottom: 48,
  },
  primaryButtonText: {
    fontFamily: FONTS.semiBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
