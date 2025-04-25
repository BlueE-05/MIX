'use client';

import { useRouter } from 'next/navigation';
import { MiniSpinner } from '@/components/MiniSpinner';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface UnauthorizedAccessProps {
  reason?: 'not-verified' | 'forbidden' | 'unauthenticated';
  onRetry?: () => void;
  onResend?: () => void;
  secondsLeft?: number | null;
  verificationMessage?: string | null;
  emailVerified?: boolean;
  loading?: boolean;
  error?: string | null;
  redirecting?: boolean;
}

export default function UnauthorizedAccess({
  reason = 'forbidden',
  onRetry,
  onResend,
  secondsLeft: propSecondsLeft,
  verificationMessage,
  emailVerified = false,
  loading = false,
  redirecting = false,
}: UnauthorizedAccessProps) {
  
  const router = useRouter();

  if (redirecting) {
    return (<LoadingSpinner/>);
  }
  

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s.toString().padStart(2, '0')}`;
  };

  const cooldown = typeof propSecondsLeft === "number" ? propSecondsLeft : null;

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
            {reason === 'not-verified' && 'Verify your email'}
            {reason === 'unauthenticated' && 'Session expired'}
            {reason === 'forbidden' && 'Unauthorized access'}
          </h2>

          <p className="text-center text-gray-600">
            {reason === 'not-verified' && "Please verify your email. We've sent a verification link."}
            {reason === 'unauthenticated' && 'You may not be logged in. Please log in again.'}
            {reason === 'forbidden' && 'You do not have the necessary permissions to access this page.'}
          </p>

          {verificationMessage && (
            <p className="text-sm text-red-600 text-center">{verificationMessage}</p>
          )}

          {emailVerified && (
            <p className="text-sm text-green-600 text-center">Your email is verified! Refresh to continue.</p>
          )}

          {cooldown !== null && cooldown > 0 && (
            <p className="text-sm text-gray-500 text-center">
              You can resend the email in {formatTime(cooldown)}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {reason === 'not-verified' && (
              <>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    disabled={loading}
                    className="rounded-md border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50 transition disabled:opacity-50"
                  >
                    Retry
                  </button>
                )}
                {cooldown !== null && cooldown > 0 ? (
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-green-600 border-green-500 opacity-50 cursor-not-allowed"
                  >
                    Resend
                  </button>
                ) : (
                  <button
                    disabled={loading}
                    onClick={onResend}
                    className="flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-green-600 border-green-500 hover:bg-green-50 transition disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <MiniSpinner />
                        Sending...
                      </>
                    ) : (
                      'Resend'
                    )}
                  </button>
                )}
              </>
            )}

            {(reason === 'unauthenticated' || reason === 'forbidden') && (
              <>
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 rounded-md border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50 transition"
                >
                  ← Go back
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                >
                  Go to Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}