"use client";

import React from "react";

interface LoginFormProps {
  onSubmit: (event: React.FormEvent) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Email Address</label>
        <input type="email" className="w-full px-4 py-2 border rounded-md" placeholder="alex@email.com" />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input type="password" className="w-full px-4 py-2 border rounded-md" placeholder="Enter your password" />
      </div>
      <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">
        Login Now
      </button>
    </form>
  );
}
