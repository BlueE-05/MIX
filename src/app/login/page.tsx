"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return "Invalid email format";
        }
        const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "company.com"];
        const domain = email.split("@")[1];
        if (!allowedDomains.includes(domain)) {
            return "Email domain not allowed";
        }
        return "";
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Password must be at least 8 characters, include an uppercase letter, a number, and a special character";
        }
        return "";
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);
        
        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        if (!emailValidationError && !passwordValidationError) {
            console.log("Logging in...");
        }
    };

    const isButtonDisabled = !!emailError || !!passwordError || !email || !password;

    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center mb-4 text-black">Log In</h2>
            <form onSubmit={handleSubmit} className="w-full">
              <input 
                type="email" 
                placeholder="Email Address" 
                className={`w-full p-2 border rounded ${emailError ? 'border-red-500' : 'border-gray-300'}`} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              <input 
                type="password" 
                placeholder="Password" 
                className={`w-full p-2 border rounded mt-2 ${passwordError ? 'border-red-500' : 'border-gray-300'}`} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              <button 
                type="submit" 
                disabled={isButtonDisabled}
                className={`px-4 py-2 rounded mt-2 w-full transition 
                  ${isButtonDisabled ? 'bg-orange-300 cursor-not-allowed opacity-75' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
              >
                Log In
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    );
}
