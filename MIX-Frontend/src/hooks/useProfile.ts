"use client";

import useSWR from "swr";
import { LayOutProfileData } from "@/types/profile";
import { url } from '@/utils/constants';

const fetchProfile = async (): Promise<LayOutProfileData> => {
  const res = await fetch(`${url}/api/profile`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Unauthorized");
  const data = await res.json();
  return {
    name: data.Name,
    lastName: data.LastName,
    profilePic: data.ProfilePic || null,
    emailVerified: Boolean(data.email_verified ?? data.EmailVerified),
  };
};

export function useProfile() {
  const { data: profile, error, isLoading, mutate } = useSWR(
    `${url}/api/profile`,
    fetchProfile
  );

  return {
    profile,
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
