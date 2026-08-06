// app/context/HouseholdOnboardingContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const HouseholdOnboardingContext = createContext(null);

const initialData = {
  phone: "",
  otp: "",
  pin: "",
  // add more fields here as later steps need them
  // (aboutYou, location, education, etc.)
};

export function HouseholdOnboardingProvider({ children }) {
  const [data, setData] = useState(initialData);

  const updateData = (patch) => {
    setData((prev) => ({ ...prev, ...patch }));
  };

  const resetData = () => setData(initialData);

  const value = useMemo(() => ({ data, updateData, resetData }), [data]);

  return (
    <HouseholdOnboardingContext.Provider value={value}>
      {children}
    </HouseholdOnboardingContext.Provider>
  );
}

export function useHouseholdOnboarding() {
  const ctx = useContext(HouseholdOnboardingContext);
  if (!ctx) {
    throw new Error(
      "useHouseholdOnboarding must be used within a HouseholdOnboardingProvider",
    );
  }
  return ctx;
}
