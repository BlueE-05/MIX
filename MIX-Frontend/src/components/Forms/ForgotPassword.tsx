'use client';

import { useState } from 'react';
import { MiniSpinner } from '@/components/MiniSpinner';
import { useForgotPassword } from '@/hooks/useForgotPassword';

interface ForgotPasswordProps {
  onClose: () => void;
}

export default function ForgotPassword({ onClose }: ForgotPasswordProps) {
  const { loading, error, secondsLeft, startForgotPassword } = useForgotPassword();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);
    if (emailValidationError) return;

    await startForgotPassword(email);
  };

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Recover Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              className={`w-full px-4 py-3 rounded-lg border-2 ${
                (emailError || error)
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } focus:outline-none focus:ring-2 transition`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || (secondsLeft !== null && secondsLeft > 0)}
            />
            {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
            {error && (
              <p className="mt-2 text-sm text-red-600">
                {error}. Please check the email entered is correct.
              </p>
            )}
          </div>

          {secondsLeft !== null && secondsLeft > 0 && (
            <p className="text-sm text-gray-500 text-center">
              You can request another email in {formatTime(secondsLeft)}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (secondsLeft !== null && secondsLeft > 0)}
              className="w-1/2 flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <MiniSpinner />
                  Sending...
                </>
              ) : (
                'Send reset email'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}