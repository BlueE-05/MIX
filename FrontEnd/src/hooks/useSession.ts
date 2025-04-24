"use client";

import { useEffect, useState } from "react";

export function useSession() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/session", { credentials: "include" })
      .then(res => res.ok)
      .then(setIsAuthenticated)
      .finally(() => setLoading(false));
  }, []);

  return { isAuthenticated, loading };
}

