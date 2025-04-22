"use client";

import Link from "next/link";
import Navbar from "@/components/NavBar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEmailVerification } from '@/hooks/useEmailVerification';
import EmailVerification from '@/components/Cards/Autorizations/EmailVerification';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    emailVerified,
    showVerification,
    setShowVerification,
    checkManually,
    isChecking,
  } = useEmailVerification();

  const router = useRouter();

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
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        setEmailError(data.message || "Invalid credentials");
        setPasswordError(data.message || "Invalid credentials");
        return;
      }

      const profileRes = await fetch("http://localhost:4000/api/profile", {
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
        return;
      }

      router.push("/crm/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setEmailError("Login failed");
      setPasswordError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !email || !password || loading;

  return (
    <>
      {showVerification && emailVerified === false && !isChecking ? (
        <EmailVerification
          isVerified={emailVerified}
          onContinue={checkManually}
          origin="login"
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
  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
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
                    {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
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
        </div>
      )}
    </>
  );  
}
