import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/typography";

const STEPS = ["Material", "Address", "Time", "Confirm"];

export default function StepIndicator({ currentStep }) {
  return (
    <View style={styles.container}>
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < currentStep;
        const active = stepNum === currentStep;
        return (
          <React.Fragment key={label}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.circle,
                  active && styles.circleActive,
                  done && styles.circleDone,
                ]}
              >
                {done ? (
                  <Text style={styles.circleCheck}>✓</Text>
                ) : (
                  <Text
                    style={[
                      styles.circleText,
                      (active || done) && styles.circleTextActive,
                    ]}
                  >
                    {stepNum}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  (active || done) && styles.stepLabelActive,
                ]}
              >
                {label}
              </Text>
            </View>

            {i < STEPS.length - 1 && (
              <View
                style={[styles.connector, done && styles.connectorDone]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  stepItem: { alignItems: "center", width: 52 },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  circleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  circleDone: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  circleText: {
    fontFamily: FONTS.semiBold,
    fontSize: 13,
    color: COLORS.muted,
  },
  circleTextActive: { color: COLORS.white },
  circleCheck: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.white,
  },
  stepLabel: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.muted,
    textAlign: "center",
  },
  stepLabelActive: { color: COLORS.primary },
  connector: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    marginTop: 14,
    marginHorizontal: 2,
  },
  connectorDone: { backgroundColor: COLORS.primary },
});
