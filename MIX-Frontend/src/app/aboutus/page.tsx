"use client";

import Navbar from "@/components/NavBar";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-10">
        <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-6xl">
          <h2 className="text-4xl font-bold text-black mb-6 text-center">About Us</h2>

          <p className="text-gray-700 leading-relaxed text-lg">
            Welcome to <span className="text-green-600 font-semibold">MIX</span>, an innovative CRM platform designed to 
            streamline customer interactions and enhance sales management. Our mission is to empower businesses by providing 
            modern tools for client relationship management, sales tracking, and business analytics.
          </p>

          <h3 className="text-2xl font-semibold text-black mt-8">What is MIX?</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            MIX is a customer relationship management (CRM) web application developed to assist sales teams in managing 
            interactions with clients efficiently. Whether it's tracking negotiations, managing partners, or generating insightful 
            reports, MIX provides a seamless and powerful experience.
          </p>

          <h3 className="text-2xl font-semibold text-black mt-8">Who We Are</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            We are Raydev, a team of passionate developers specializing in full-stack development, UI/UX design, and database administration.
            As students of B.S. in Computer Science and Technology, our expertise spans across:
          </p>
          <ul className="text-gray-700 text-lg mt-4 list-disc list-inside">
            <li>Database design and management</li>
            <li>Modern web development</li>
            <li>Video game programming in Unity</li>
            <li>Software development lifecycle collaboration</li>
            <li>Version control and documentation using Git</li>
          </ul>

          <h3 className="text-2xl font-semibold text-black mt-8">Our Features</h3>
          <ul className="text-gray-700 text-lg mt-4 list-disc list-inside">
            <li>User Registration & Secure Login – Ensuring safe access with authentication and role-based permissions.</li>
            <li>Client & Partner Management – Register, modify, and search for partners effortlessly.</li>
            <li>Product Catalog – Add, modify, and showcase products to partners.</li>
            <li>Negotiation Tracking – Manage and review business negotiations with ease.</li>
            <li>Comprehensive Reporting – Generate real-time reports on sales, customer activity, and business trends.</li>
            <li>Data Export – Export reports in PDF and Excel formats for easy business analysis.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-black mt-8">Join Us</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            Whether you're a sales professional looking to optimize your workflow or a business owner seeking advanced CRM 
            capabilities, MIX is designed for you. Let's build the future of customer relationship management together!
          </p>

          <h3 className="text-2xl font-semibold text-black mt-12 text-center">Contact Us</h3>
          <p className="text-gray-700 leading-relaxed text-lg text-center mt-2">
            Have questions or need support? Reach out to us.
          </p>
          <div className="flex flex-col items-center mt-4 space-y-2">
            <p className="text-lg">
              Email: 
              <a className="text-green-600 hover:underline ml-1">
                support@raydevexample.com
              </a>
            </p>
            <p className="text-lg">
              Location: Remote Development Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
