'use client';

import { useState, useCallback, useEffect } from 'react';
import { url } from '@/utils/constants';

export function useEmailVerificationStatus() {
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const fetchStatus = async () => {
    try {
      const statusRes = await fetch(`${url}/api/email-status`, {
        credentials: "include",
      });
  
      if (!statusRes.ok) {
        console.warn("Not authenticated or server error, skipping email status fetch.");
        setEmailVerified(false);
        return false;
      }
  
      const data = await statusRes.json();
      const verified = Boolean(data.EmailVerified ?? data.email_verified ?? false);
      setEmailVerified(verified);
      return verified;
    } catch (err: any) {
      console.error("Error fetching email status:", err.message);
      setEmailVerified(false);
      return false;
    }
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
      const res = await fetch(`${url}/api/resend-verification`, {
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