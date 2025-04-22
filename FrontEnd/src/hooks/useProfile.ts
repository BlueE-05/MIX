"use client";

import { useEffect, useState } from "react";
import { LayOutProfileData } from "@/types/profile";

export function useProfile() {
  const [profile, setProfile] = useState<LayOutProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();

        setProfile({
          name: data.Name,
          lastName: data.LastName,
          profilePic: data.ProfilePic || null,
          emailVerified: data.EmailVerified
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
}
