'use client';

import { useState, useEffect } from 'react';
import { url } from '@/utils/constants';

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const startForgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${url}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (typeof data.secondsLeft === 'number') {
          setSecondsLeft(data.secondsLeft);
        }
        throw new Error(data.error || 'Failed to send forgot password email');
      }

      if (typeof data.secondsLeft === 'number') {
        setSecondsLeft(data.secondsLeft);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (secondsLeft === null) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (typeof prev === 'number' && prev > 0) return prev - 1;
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return {
    loading,
    error,
    secondsLeft,
    startForgotPassword,
  };
}