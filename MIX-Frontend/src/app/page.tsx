"use client";

import Navbar from "@/components/NavBar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      <Navbar />
    
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-green-600 to-green-400 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to MIX</h1>
        <p className="text-xl max-w-3xl">
            A powerful <span className="font-bold">CRM solution</span> designed to help businesses manage 
            customer relationships, streamline sales, and generate insightful reports.
        </p>
        <div className="mt-6 flex space-x-6">
          <Link href="/signup">
            <button className="bg-white text-green-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition">Get Started</button>
          </Link>
          <Link href="/aboutus">
            <button className="border border-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition">Learn More</button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-10">
        <h2 className="text-4xl font-bold text-center text-black mb-12">Why Choose MIX?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-3">Sales Optimization</h3>
            <p className="text-gray-700">Manage your leads and track customer interactions efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-3">Partner Management</h3>
            <p className="text-gray-700">Register, modify, and search partners with ease.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-green-600 mb-3">Advanced Reporting</h3>
            <p className="text-gray-700">Generate reports on sales trends and customer activity.</p>
          </div>
        </div>
      </section>

      <section className="text-center py-16 bg-gray-200">
        <h2 className="text-3xl font-bold text-black mb-4">Get Started with MIX Today</h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Join us and experience a seamless way to manage your sales and client interactions.
        </p>
        <Link href="/signup">
          <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">Sign Up Now</button>
        </Link>
      </section>
        <footer className="bg-gray-900 text-white text-center py-6 mt-10">
            <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-2">
                <Image src="/raydevRv2.svg" alt="Raydev Logo" width={100} height={24} className="h-6 w-auto" />
                    <p className="text-sm">By Raydev</p>
                </div>

                <p className="text-sm">
                    Contact us:  
                    <a className="text-green-400 hover:underline ml-1">
                        raydevcompany@gmail.com
                    </a>
                </p>
            </div>
        </footer>
    </div>
  );
}