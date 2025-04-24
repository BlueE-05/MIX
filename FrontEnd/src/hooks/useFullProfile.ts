"use client";

import useSWR from "swr";
import { ProfileData } from "@/types/profile";

const fetchFullProfile = async (): Promise<ProfileData> => {
  const res = await fetch("http://localhost:4000/api/profile", {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Unauthorized");

  const data = await res.json();

  return {
    name: data.Name,
    lastName: data.LastName,
    email: data.ID,
    phone: data.PhoneNumber,
    education: data.Education,
    dateOfJoining: new Date(data.JoiningDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    position: data.JobPositionName || "N/A",
    profilePic: data.ProfilePic || null,
    isAdmin: data.isAdmin
  };
};

export function useFullProfile() {
  const { data, error, isLoading } = useSWR("full-profile", fetchFullProfile);
  return {
    profile: data,
    loading: isLoading,
    error,
  };
}