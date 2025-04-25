'use client';

import { useState, useCallback, useEffect } from 'react';

export function useEmailVerificationStatus() {
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const fetchStatus = async () => {
    try {
      const statusRes = await fetch("http://localhost:4000/api/email-status", {
        credentials: "include",
      });
      if (statusRes.ok) {
        const data = await statusRes.json();
        const verified = Boolean(data.EmailVerified ?? data.email_verified ?? false);
        setEmailVerified(verified);
        return verified;
      }
    } catch (err: any) {
      setError(err.message);
    }
    return false;
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const checkStatus = useCallback(async () => {
    setIsChecking(true);
    try {
      const verified = await fetchStatus();
      setEmailVerified(verified);
      if (verified) {
        setRedirecting(true);
        window.location.href = "/crm/dashboard";
      }
      return verified;
    } finally {
      setIsChecking(false);
    }
  }, []);

  const resend = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/resend-verification", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (typeof data.secondsLeft === "number") {
        setSecondsLeft(data.secondsLeft);
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend email");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (typeof prev === 'number' && prev > 0) return prev - 1;
        return prev;
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);  


  return {
    emailVerified,
    secondsLeft,
    loading,
    error,
    checkStatus,
    resend,
    isChecking,
    redirecting,
  };
}