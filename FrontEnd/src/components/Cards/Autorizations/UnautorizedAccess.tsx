'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface UnauthorizedAccessProps {
  reason?: 'not-verified' | 'forbidden';
  onRetry?: () => void;
  onResend?: () => void;
}

export default function UnauthorizedAccess({
  reason = 'forbidden',
  onRetry,
  onResend,
}: UnauthorizedAccessProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(60);
  const [waiting, setWaiting] = useState(false);

  const handleGoBack = () => router.back();

  const handleResend = async () => {
    setLoading(true);
    setError('');
    try {
      if (onResend) await onResend();
      setResent(true);
      setWaiting(true);
      setCooldown(60);
    } catch (err) {
      setError('Failed to resend email. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!waiting) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setWaiting(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [waiting]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            {reason === 'not-verified' ? 'Verify your email' : 'Unauthorized access'}
          </h2>

          <p className="text-center text-gray-600">
            {reason === 'not-verified'
              ? "Please verify your email to access this page. We've sent you an email with a confirmation link."
              : 'You do not have the necessary permissions to access this page.'}
          </p>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {resent && !error && (
            <p className="text-sm text-green-600 text-center">
              Verification email has been resent.
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {reason === 'not-verified' && (
              <>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50 transition"
                  >
                    Retry
                  </button>
                )}
                {onResend && (
                  <button
                    disabled={loading || waiting}
                    onClick={handleResend}
                    className={`rounded-md border px-4 py-2 transition duration-200 flex items-center gap-2
                      ${loading || waiting ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed opacity-60' : 'border-green-500 text-green-500 hover:bg-green-50'}`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : waiting ? (
                      `Try again in ${cooldown}s`
                    ) : (
                      'Resend verification email'
                    )}
                  </button>
                )}
              </>
            )}

            {reason === 'forbidden' && (
              <button
                onClick={handleGoBack}
                className="flex items-center gap-2 rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Go back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}