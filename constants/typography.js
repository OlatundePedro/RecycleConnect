// Font family names — must match the keys used in useFonts() in app/_layout.jsx
export const FONTS = {
  regular: "Inter-Regular",
  medium: "Inter-Medium",
  semiBold: "Inter-SemiBold",
  bold: "Inter-Bold",
  black: "Inter-Black",
};

// Type scale from the RecycleConnect design system
export const TEXT_STYLES = {
  heading1: {
    fontFamily: FONTS.bold,
    fontSize: 32,
  },
  heading2: {
    fontFamily: FONTS.bold,
    fontSize: 24,
  },
  heading3: {
    fontFamily: FONTS.semiBold,
    fontSize: 20,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  smallLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
};
