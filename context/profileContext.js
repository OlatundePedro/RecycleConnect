import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMyProfile } from "../lib/profile";
import { supabase } from "../lib/supabase";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMyProfile();
      setProfile(data);
      if (data?.avatar_url) {
        setAvatar(data.avatar_url);
      }
    } catch (err) {
      console.log("REFRESH PROFILE ERROR:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        refreshProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        refreshProfile();
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [refreshProfile]);

  return (
    <ProfileContext.Provider
      value={{
        avatar,
        setAvatar,
        profile,
        setProfile,
        loading,
        refreshProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
