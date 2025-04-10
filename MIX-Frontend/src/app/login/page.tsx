"use client";

import Link from "next/link";
import Navbar from "@/components/NavBar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const router = useRouter();

    const correctEmail = "Mary.Sue@Company.com";
    const correctPassword = "SecurePass123!";

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email) ? "" : "Invalid email format";
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validación de email
        const emailValidationError = validateEmail(email);
        setEmailError(emailValidationError);

        // Validación de credenciales
        if (!emailValidationError) {
            if (email === correctEmail && password === correctPassword) {
                console.log("Login successful for Mary Sue");
                router.push("/crm/dashboard");
            } else {
                setEmailError("Invalid credentials");
                setPasswordError("Invalid credentials");
            }
        }
    };

    const isButtonDisabled = !email || !password;

    return (
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
                                    className={`w-full px-4 py-3 rounded-lg border ${emailError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && (
                                    <p className="mt-2 text-sm text-red-600">{emailError}</p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 rounded-lg border ${passwordError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordError && (
                                    <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isButtonDisabled}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                                        isButtonDisabled 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            <p className="text-gray-600">
                                Don&apos;t have an account?{' '}
                                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}