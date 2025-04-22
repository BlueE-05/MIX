"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useEmailVerification(autoStart = false) {
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showVerification, setShowVerification] = useState(autoStart);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!showVerification) return;

    if (!emailSent) {
      fetch("http://localhost:4000/api/resend-verification", {
        method: "POST",
        credentials: "include",
      }).then(() => setEmailSent(true));
    }

    const interval = setInterval(async () => {
      setIsChecking(true);
      const res = await fetch("http://localhost:4000/api/profile", {
        credentials: "include",
      });

      if (!res.ok) return;

      const profile = await res.json();
      const verified = Boolean(profile.email_verified ?? profile.EmailVerified);

      if (verified) {
        setEmailVerified(true);
        setShowVerification(false);
        router.push("/crm/dashboard");
      } else {
        setEmailVerified(false);
      }

      setIsChecking(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [showVerification]);

  const checkManually = async () => {
    setIsChecking(true);
    const res = await fetch("http://localhost:4000/api/profile", {
      credentials: "include",
    });

    if (!res.ok) {
      setIsChecking(false);
      return false;
    }

    const profile = await res.json();
    const verified = Boolean(profile.email_verified ?? profile.EmailVerified);

    if (verified) {
      setEmailVerified(true);
      setShowVerification(false);
      router.push("/crm/dashboard");
    } else {
      setEmailVerified(false);
    }

    setIsChecking(false);
    return verified;
  };

  return {
    emailVerified,
    showVerification,
    setShowVerification,
    checkManually,
    isChecking,
  };
}
