"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Mary Sue",
    position: "Senior Sales Executive",
    email: "Mary.Sue@Company.com",
    phone: "+1555454987",
    dateOfJoining: "March 15, 2018",
    education: "Bachelor's Degree in Business Administration, Harvard University",
  });

  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle form submit (simulated save)
  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between min-h-[400px]">
        <div className="flex items-center space-x-6">
          <Image src="/MarySue.png" alt="Profile Picture" width={80} height={80} className="rounded-full" />
          <div>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="text-3xl font-bold text-black border border-gray-300 p-2 rounded w-full"
              />
            ) : (
              <h1 className="text-3xl font-bold text-black">{profileData.name}</h1>
            )}
            <p className="text-gray-700 font-semibold">
              <span className="text-gray-900">Position:</span> {profileData.position}
            </p>
          </div>
        </div>

        <h3 className="mt-6 text-green-600 font-semibold">Contact Information</h3>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">E-Mail:</span>{" "}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          ) : (
            <a href={`mailto:${profileData.email}`} className="text-blue-600 hover:underline">
              {profileData.email}
            </a>
          )}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone Number:</span>{" "}
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          ) : (
            profileData.phone
          )}
        </p>

        <h3 className="mt-6 text-green-600 font-semibold">General Information</h3>
        <p className="text-gray-700">
          <span className="font-semibold">Date of Joining:</span> {profileData.dateOfJoining}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Education:</span>{" "}
          {isEditing ? (
            <input
              type="text"
              name="education"
              value={profileData.education}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          ) : (
            profileData.education
          )}
        </p>

        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
              Edit
            </button>
          )}
        </div>
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
