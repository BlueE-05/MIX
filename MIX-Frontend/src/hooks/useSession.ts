"use client";

import { useEffect, useState } from "react";
import { url } from '@/utils/constants';

export function useSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${url}/api/session`, { credentials: "include" })
      .then(res => res.ok)
      .then(setIsAuthenticated)
      .finally(() => setLoading(false));
  }, []);

  return { isAuthenticated, loading };
}

