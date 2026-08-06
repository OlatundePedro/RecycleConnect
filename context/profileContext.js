import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [avatar, setAvatar] = useState(null);

  return (
    <ProfileContext.Provider
      value={{
        avatar,
        setAvatar,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
