"use client";

import { useEffect, useState } from "react";
import { ProfileData } from "@/types/profile"


export function useProfile(accessToken: string) {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!accessToken) return;
  
      fetch("http://localhost:4000/api/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile({
            name: data.Name,
            lastName: data.LastName,
            email: data.Email,
            phone: data.PhoneNumber,
            education: data.Education,
            dateOfJoining: new Date(data.JoiningDate).toLocaleDateString(),
            position: data.JobPosition || "N/A",
            profilePic: data.ProfilePic || null,
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, [accessToken]);
  
    return { profile, loading };
}