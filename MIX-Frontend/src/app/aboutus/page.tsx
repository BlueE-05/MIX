"use client";

import Navbar from "@/components/NavBar";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-800 to-indigo-700 p-8 sm:p-12 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">About <span className="text-green-400">MIX</span></h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Revolutionizing Customer Relationship Management with Innovative Solutions
            </p>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            {/* Introduction */}
            <section className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-lg leading-relaxed">
                Welcome to <span className="text-green-600 font-semibold">MIX</span>, an innovative CRM platform designed to 
                streamline customer interactions and enhance sales management. Our mission is to empower businesses by providing 
                modern tools for client relationship management, sales tracking, and business analytics.
              </p>
            </section>

            {/* What is MIX */}
            <section className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">What is MIX?</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                MIX is a customer relationship management (CRM) web application developed to assist sales teams in managing 
                interactions with clients efficiently. Whether it&apos;s tracking negotiations, managing partners, or generating insightful 
                reports, MIX provides a seamless and powerful experience.
              </p>
            </section>

            {/* Who We Are */}
            <section className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">Who We Are</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We are Raydev, a team of passionate developers specializing in full-stack development, UI/UX design, and database administration.
                As students of B.S. in Computer Science and Technology, our expertise spans across:
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Database design and management",
                  "Modern web development",
                  "Video game programming in Unity",
                  "Software development lifecycle collaboration",
                  "Version control and documentation using Git"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Features */}
            <section className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">Our Features</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {[
                  "User Registration & Secure Login – Ensuring safe access with authentication and role-based permissions.",
                  "Client & Partner Management – Register, modify, and search for partners effortlessly.",
                  "Product Catalog – Add, modify, and showcase products to partners.",
                  "Negotiation Tracking – Manage and review business negotiations with ease.",
                  "Comprehensive Reporting – Generate real-time reports on sales, customer activity, and business trends.",
                  "Data Export – Export reports in PDF and Excel formats for easy business analysis."
                ].map((feature, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Join Us */}
            <section className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-100">Join Us</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Whether you&apos;re a sales professional looking to optimize your workflow or a business owner seeking advanced CRM 
                capabilities, MIX isdesigned for you. Let&apos;s build the future of customer relationship management together!
              </p>
            </section>

            {/* Contact */}
            <section className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
              <p className="text-gray-700 text-lg mb-8">
                Have questions or need support? Reach out to us.
              </p>
              <div className="bg-blue-50 rounded-lg p-6 inline-block">
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:support@raydevexample.com" className="text-green-600 hover:underline text-lg font-medium">
                      support@raydevexample.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 text-lg">Remote Development Team</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}