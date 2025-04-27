"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFullProfile } from "@/hooks/useFullProfile";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MiniSpinner } from "@/components/MiniSpinner";
import { useProfile } from "@/hooks/useProfile";
import { url } from '@/utils/constants';

export default function Profile() {
  const { profile, loading, refresh: refreshFullProfile } = useFullProfile();
  const [tempProfilePic, setTempProfilePic] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { refresh: refreshLayoutProfile } = useProfile();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${url}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Error logging out");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG and PNG formats are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmUpload = async () => {
    if (!tempProfilePic) return;
    setUploading(true);
    try {
      const res = await fetch(`${url}/api/upload-profile-pic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ProfilePic: tempProfilePic }),
      });
      if (!res.ok) throw new Error("Failed to upload profile picture");
  
      setTempProfilePic(null);
      await refreshFullProfile();
      await refreshLayoutProfile();
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };
  const handleCancelUpload = () => {
    setTempProfilePic(null);
  };

  if (loading || !profile) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {tempProfilePic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center">
            <Image
              src={tempProfilePic}
              alt="Profile Preview"
              width={150}
              height={150}
              className="rounded-full object-cover mb-6"
            />
            <p className="text-black text-lg mb-4 font-medium text-center">Are you sure you want to update your profile picture?</p>
            <div className="flex space-x-6">
              <button
                onClick={handleConfirmUpload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
                disabled={uploading}
              >
                {uploading ? <MiniSpinner /> : "Confirm"}
              </button>
              <button
                onClick={handleCancelUpload}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg"
                disabled={uploading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between min-h-[400px]">
        <div className="flex items-center space-x-6">
          {profile.profilePic ? (
            <Image
              src={profile.profilePic}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300" />
          )}
          <div>
            <h1 className="text-3xl font-bold text-black">{`${profile.name} ${profile.lastName}`}</h1>
            <p className="text-gray-700 font-semibold">
              <span className="text-gray-900">Position:</span> {profile.position}
            </p>
          </div>
        </div>

        <h3 className="mt-6 text-green-600 font-semibold">Contact Information</h3>
        <p className="text-gray-700 mt-2">
          <span className="font-semibold">E-Mail:</span> {profile.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone Number:</span> {profile.phone}
        </p>

        <h3 className="mt-6 text-green-600 font-semibold">General Information</h3>
        <p className="text-gray-700">
          <span className="font-semibold">Date of Joining:</span> {profile.dateOfJoining}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Education:</span> {profile.education}
        </p>

        <div className="mt-6 flex justify-end space-x-4">
          <label className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer inline-block">
            Upload New Photo
            <input type="file" onChange={handleImageChange} className="hidden" />
          </label>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between min-h-[400px] mt-10">
        <div className="flex items-center space-x-6">
          <Image src="/NexaCorp.png" alt="Company Logo" width={80} height={80} className="rounded-lg" />
          <div>
            <h1 className="text-3xl font-bold text-black">Instituto Minerva</h1>
            <p className="text-gray-700 font-semibold">
              <span className="text-gray-900">Industry:</span> Education & Professional Development
            </p>
          </div>
        </div>

        <h3 className="mt-6 font-semibold text-black">Description:</h3>
        <p className="text-gray-700 text-justify">
        Instituto Minerva specializes in the development of high-performance engineering professionals through its Residency Program, combining technical excellence with strategic management, leadership, and innovation skills. Committed to fostering corporate readiness, Minerva partners with leading companies to deliver specialized, practice-oriented education aligned with the demands of the modern business environment.
        </p>

        <h3 className="mt-6 font-semibold text-black">Headquarters Location:</h3>
        <p className="text-gray-700">R. Cláudio Soares, 72 - 17º andar - cj 1702 - Pinheiros, São Paulo - SP, 05422-030, Brasil</p>
      </div>
    </div>
  );
}
