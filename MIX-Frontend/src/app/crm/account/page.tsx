"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "Mary Sue",
    position: "Senior Sales Executive",
    email: "Mary.Sue@Company.com",
    phone: "+1555454987",
    dateOfJoining: "March 15, 2018",
    education: "Bachelor's Degree in Business Administration, Harvard University",
  });

  void setProfileData;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between min-h-[400px]">
        <div className="flex items-center space-x-6">
          <Image src="/MarySue.png" alt="Profile Picture" width={80} height={80} className="rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-black">{profileData.name}</h1>
            <p className="text-gray-700 font-semibold">
              <span className="text-gray-900">Position:</span> {profileData.position}
            </p>
          </div>
        </div>

        <h3 className="mt-6 text-green-600 font-semibold">Contact Information</h3>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">E-Mail:</span>{" "}
          <a href={`mailto:${profileData.email}`} className="text-blue-600 hover:underline">
            {profileData.email}
          </a>
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone Number:</span> {profileData.phone}
        </p>

        <h3 className="mt-6 text-green-600 font-semibold">General Information</h3>
        <p className="text-gray-700">
          <span className="font-semibold">Date of Joining:</span> {profileData.dateOfJoining}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Education:</span> {profileData.education}
        </p>
      </div>

      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between min-h-[400px] mt-10">
        <div className="flex items-center space-x-6">
          <Image src="/NexaCorp.png" alt="Company Logo" width={80} height={80} className="rounded-lg" />
          <div>
            <h1 className="text-3xl font-bold text-black">NexaCorp Solutions</h1>
            <p className="text-gray-700 font-semibold">
              <span className="text-gray-900">Industry:</span> Technology & Business Solutions
            </p>
          </div>
        </div>

        <h3 className="mt-6 font-semibold text-black">Description:</h3>
        <p className="text-gray-700">
          NexaCorp Solutions is a leading provider of innovative business solutions, specializing in sales optimization,
          customer relationship management, and digital transformation. With cutting-edge technology and data-driven
          strategies, NexaCorp helps businesses maximize efficiency and growth.
        </p>

        <h3 className="mt-6 font-semibold text-black">Headquarters Location:</h3>
        <p className="text-gray-700">345 Innovation Avenue, San Francisco, CA, USA</p>

        <div className="mt-6 flex justify-end">
          <Link href="/login">
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
              Log Out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
