// app/context/HouseholdOnboardingContext.jsx

import { createContext, useContext, useMemo, useState } from "react";

const HouseholdOnboardingContext = createContext(null);

const initialData = {
  // Authentication
  email: "",
  userId: "",
  otp: "",
  pin: "",

  // Profile information
  full_name: "",
  phone: "",
  account_type: "household",

  // Location
  state: "",
  area: "",
  landmark: "",
  latitude: null,
  longitude: "",
};

export function HouseholdOnboardingProvider({ children }) {
  const [data, setData] = useState(initialData);

  const updateData = (patch) => {
    setData((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  const resetData = () => {
    setData(initialData);
  };

  const value = useMemo(
    () => ({
      data,
      updateData,
      resetData,
    }),
    [data],
  );

  return (
    <HouseholdOnboardingContext.Provider value={value}>
      {children}
    </HouseholdOnboardingContext.Provider>
  );
}

export function useHouseholdOnboarding() {
  const context = useContext(HouseholdOnboardingContext);

  if (!context) {
    throw new Error(
      "useHouseholdOnboarding must be used within a HouseholdOnboardingProvider",
    );
  }

  return context;
}
