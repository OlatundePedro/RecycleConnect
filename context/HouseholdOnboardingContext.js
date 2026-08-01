import { createContext, useCallback, useContext, useState } from "react";

const HouseholdOnboardingContext = createContext(null);

const initialState = {
  phone: "",
  otp: "",
  pin: "",
  fullName: "",
  email: "",
  state: "",
  area: "",
  landmark: "",
};

export function HouseholdOnboardingProvider({ children }) {
  const [data, setData] = useState(initialState);

  // Merge partial updates in, e.g. updateData({ phone: "+234..." })
  const updateData = useCallback((updates) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetData = useCallback(() => {
    setData(initialState);
  }, []);

  return (
    <HouseholdOnboardingContext.Provider
      value={{ data, updateData, resetData }}
    >
      {children}
    </HouseholdOnboardingContext.Provider>
  );
}

// Usage in any screen: const { data, updateData } = useHouseholdOnboarding();
export function useHouseholdOnboarding() {
  const ctx = useContext(HouseholdOnboardingContext);
  if (!ctx) {
    throw new Error(
      "useHouseholdOnboarding must be used within a HouseholdOnboardingProvider",
    );
  }
  return ctx;
}
