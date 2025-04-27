"use client";

import useSWR from "swr";
import { ProfileData } from "@/types/profile";
import { url } from '@/utils/constants';

const fetchFullProfile = async (): Promise<ProfileData> => {
  const res = await fetch(`${url}/api/profile`, {
    credentials: "include",
    cache: "no-store",
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
    position: !data.JobPositionName || data.JobPositionName === "UNNASSIGNED"
      ? "Unassigned"
      : data.JobPositionName,
    profilePic: data.ProfilePic || null,
    isAdmin: data.isAdmin,
  };
};

export function useFullProfile() {
  const { data, error, isLoading, mutate } = useSWR("full-profile", fetchFullProfile, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
  });

  return {
    profile: data,
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
