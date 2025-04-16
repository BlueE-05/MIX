"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UseSessionOptions = {
  redirect?: boolean;
  redirectTo?: string;
};

export function useSession(options: UseSessionOptions = {}) {
  const {
    redirect = true,
    redirectTo = "/login",
  } = options;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          if (redirect) router.push(redirectTo);
        }
      } catch {
        if (redirect) router.push(redirectTo);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [redirect, redirectTo, router]);

  return { isAuthenticated, loading };
}
