'use client';
import { useEffect, useState } from 'react';
import { MailCheck, Loader2 } from 'lucide-react';

interface EmailVerificationProps {
  isVerified?: boolean;
  onContinue?: () => void;
  origin?: 'signup' | 'login';
}

export default function EmailVerification({
  isVerified = false,
  onContinue,
  origin = 'signup',
}: EmailVerificationProps) {
  const COOLDOWN_SECONDS = 660;

  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');
  const [hasSentInitially, setHasSentInitially] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    const lastSent = localStorage.getItem('lastVerificationSent');
    if (lastSent) {
      const diff = Math.floor((Date.now() - parseInt(lastSent)) / 1000);
      const remaining = COOLDOWN_SECONDS - diff;
      if (remaining > 0) setCooldownRemaining(remaining);
    }
  }, []);

  useEffect(() => {
    if (!cooldownRemaining) return;
    const interval = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownRemaining]);

  useEffect(() => {
    if (hasSentInitially || isVerified) return;
    handleResend();
    setHasSentInitially(true);
  }, [hasSentInitially, isVerified]);

  const handleResend = async () => {
    if (cooldownRemaining > 0) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/resend-verification', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Could not resend email');

      setResent(true);
      const now = Date.now();
      localStorage.setItem('lastVerificationSent', now.toString());
      setCooldownRemaining(COOLDOWN_SECONDS);
    } catch (err: any) {
      console.error(err);
      setError('Error sending email. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) return null;

  const getTitle = () =>
    origin === 'login' ? 'Verify your account' : 'Check your email';

  const getMessage = () =>
    origin === 'login'
      ? "Your email isn't verified yet. Please check your inbox before continuing."
      : "Please verify your email address to continue.\nWe've sent a verification link to your email.";

  if (isVerified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <MailCheck className="h-6 w-6 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
          <p className="text-center text-gray-600 whitespace-pre-line">{getMessage()}</p>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {resent && !error && (
            <p className="text-sm text-green-600 text-center">
              Verification email resent!
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={onContinue}
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors duration-200"
            >
              Continue to Dashboard
            </button>

            <button
              disabled={loading || cooldownRemaining > 0}
              onClick={handleResend}
              className={`flex items-center gap-2 rounded-md border border-blue-300 px-4 py-2 text-blue-700 transition-colors duration-200 ${
                loading || cooldownRemaining > 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Sending...
                </>
              ) : cooldownRemaining > 0 ? (
                `Wait ${cooldownRemaining}s`
              ) : (
                'Resend verification'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}