'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import UnauthorizedAccess from "@/components/Cards/Authorizations/UnauthorizedAccess";
import { useEmailVerificationStatus } from "@/hooks/useEmailVerification";
import { Eye, EyeOff } from "lucide-react";
import ForgotPassword from "@/components/Forms/ForgotPassword";
import { url } from '@/utils/constants';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const {
    emailVerified,
    secondsLeft,
    loading: resendLoading,
    checkStatus,
    resend,
    isChecking,
    redirecting,
  } = useEmailVerificationStatus();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);
    if (emailValidationError) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${url}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.message || "Invalid credentials");
        setPasswordError(data.message || "Invalid credentials");
        return;
      }

      const profileRes = await fetch(`${url}/api/profile`, {
        credentials: "include",
      });

      if (profileRes.status === 403) {
        setShowVerification(true);
        return;
      }

      if (!profileRes.ok) throw new Error("Could not fetch profile");

      const profile = await profileRes.json();
      const verified = Boolean(profile.email_verified ?? profile.EmailVerified);

      if (!verified) {
        setShowVerification(true);
      } else {
        router.push("/crm/dashboard");
      }
    } catch (err) {
      setEmailError("Login failed");
      setPasswordError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !email || !password || loading;

  return (
    <>
      {!emailVerified && showVerification && !isChecking ? (
        <UnauthorizedAccess
          reason="not-verified"
          onRetry={checkStatus}
          onResend={resend}
          loading={resendLoading}
          emailVerified={!!emailVerified}
          secondsLeft={secondsLeft}
          redirecting={redirecting}
        />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navbar />
          <div className="container mx-auto px-4 py-16 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back</h1>
                  <p className="text-gray-600">Sign in to your account</p>
                </div>
  
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
                      className={`w-full px-4 py-3 rounded-lg border ${
                        emailError
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 transition`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
                  </div>
  
                  <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        passwordError
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 transition`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        setShowPassword((prev) => {
                          if (!prev) {
                            const id = setTimeout(() => {
                              setShowPassword(false);
                            }, 3000);
                            setTimeoutId(id);
                          } else if (timeoutId) {
                            clearTimeout(timeoutId);
                          }
                          return !prev;
                        });
                      }}
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
                  </div>
  
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </button>
                  </div>
  
                  <div>
                    <button
                      type="submit"
                      disabled={isButtonDisabled}
                      className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                        isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </form>
  
                <div className="mt-6 text-center text-sm">
                  <p className="text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

        {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} />}
      </div>
    )}
  </>
);
}