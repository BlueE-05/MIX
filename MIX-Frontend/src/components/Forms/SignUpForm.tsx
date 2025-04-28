"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UnauthorizedAccess from "@/components/Cards/Authorizations/UnauthorizedAccess";
import { SignupFormProps, SignupFormData } from "@/types/signup";
import { useEmailVerificationStatus } from "@/hooks/useEmailVerification";
import Navbar from "@/components/NavBar";
import { Eye, EyeOff } from 'lucide-react';
import { fieldMaxLengths, fieldMinLengths, fieldLabels, passwordRegex, emailRegex, phoneRegex, birthDateRange, educationLevels } from "@/constants/formFields";
import { url } from '@/utils/constants';

export default function SignupForm({ onSubmit }: Partial<SignupFormProps>) {
  const router = useRouter();

  const cleanFormData = (data: SignupFormData): SignupFormData => {
    const cleanedData: Partial<SignupFormData> = {};
    for (const [key, value] of Object.entries(data)) {
      cleanedData[key as keyof SignupFormData] =
        value === undefined || value === null || (typeof value === "string" && value.trim() === "")
          ? null
          : value;
    }
    return cleanedData as SignupFormData;
  };

  const [formData, setFormData] = useState<SignupFormData>({
    Name: "",
    LastName: "",
    BirthDate: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
    Education: "",
    ProfilePic: null,
    IDJobPosition: "",
  });

  const [teamsFromDb, setTeamsFromDb] = useState<{ ID: number; TeamName: string }[]>([]);
  const [jobsFromDb, setJobsFromDb] = useState<{ ID: number; Name: string; IDTeam: number }[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const {
    emailVerified,
    secondsLeft,
    loading: resendLoading,
    checkStatus,
    resend,
    isChecking,
    redirecting,
  } = useEmailVerificationStatus();

  useEffect(() => {
    fetch(`${url}/api/teams`)
      .then(res => res.json())
      .then(setTeamsFromDb)
      .catch(err => console.error("Error fetching teams:", err));
  }, []);

  useEffect(() => {
    fetch(`${url}/api/jobs`)
      .then(res => res.json())
      .then(setJobsFromDb)
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

    const validateField = (name: string, value: string) => {
        if (!value) return `${fieldLabels[name]} is required`;

        if (fieldMinLengths[name] && value.length < fieldMinLengths[name])
            return `${fieldLabels[name]} must be at least ${fieldMinLengths[name]} characters`;

        if (fieldMaxLengths[name] && value.length > fieldMaxLengths[name])
            return `${fieldLabels[name]} must be at most ${fieldMaxLengths[name]} characters`;

        if (name === "Email" && !emailRegex.test(value))
            return "Invalid email format";

        if (name === "Password" && !passwordRegex.test(value))
            return "Password must include uppercase, number, and special character";

        if (name === "PhoneNumber" && !phoneRegex.test(value))
            return "Invalid phone number format";

        if (name === "BirthDate" && (value < birthDateRange.min || value > birthDateRange.max))
            return `Birthdate must be between ${birthDateRange.min.slice(0, 4)} and ${birthDateRange.max.slice(0, 4)}`;

        return "";
    };
  

  const isStepValid = () => {
    const stepFields: (keyof SignupFormData)[] =
      currentStep === 1 ? ["Name", "LastName", "BirthDate", "PhoneNumber"] :
      currentStep === 2 ? ["Email", "Password"] :
      ["Education"];

    return stepFields.every((field) => formData[field] && !validateField(field, formData[field] as string));
  };

  const handleFormSubmit = async (e: React.FormEvent, data: SignupFormData) => {
    e.preventDefault();
    const cleaned = cleanFormData(data);

    try {
      const response = await fetch(`${url}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleaned),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Signup failed");

      const profileRes = await fetch(`${url}/api/email-status`, { credentials: "include" });
      if (profileRes.status === 403) {
        setShowVerification(true);
        return;
      }

      if (!profileRes.ok) throw new Error("Error fetching profile");

      const profile = await profileRes.json();
      const verified = Boolean(profile.email_verified ?? profile.EmailVerified);

      if (!verified) {
        setShowVerification(true);
      } else {
        router.push("/crm/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error al registrar usuario");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, profilePic: "Only .jpg, .jpeg and .png files are allowed" }));
      setFormData((prev) => ({ ...prev, ProfilePic: null }));
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({ ...prev, ProfilePic: base64 }));
      setImagePreview(base64);
      setErrors((prev) => ({ ...prev, profilePic: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedTeamId(value);
    setFormData((prev) => ({ ...prev, IdJobPosition: "" }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const cleanedValue = name === "Email" ? value.trim() : value;
    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, cleanedValue) }));
  };  

  const handleNext = async () => {
    const stepFields: (keyof SignupFormData)[] =
      currentStep === 1 ? ["Name", "LastName", "BirthDate", "PhoneNumber"] :
      currentStep === 2 ? ["Email", "Password"] :
      ["Education"];
  
    // Validar los campos actuales
    const newErrors: { [key: string]: string } = {};
    stepFields.forEach((field) => {
      const value = formData[field] as string;
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
  
    if (Object.keys(newErrors).length > 0) return;
  
    if (currentStep === 2) {
      try {
        const res = await fetch(`${url}/api/users/exists?email=${formData.Email}`);
        const data = await res.json();
        if (data.exists) {
          setErrors(prev => ({ ...prev, Email: "Email is already registered" }));
          return;
        }
      } catch (err) {
        console.error("Error checking email:", err);
        setErrors(prev => ({ ...prev, Email: "Error verifying email" }));
        return;
      }
    }
  
    setCurrentStep((prev) => prev + 1);
  };  
  
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const handleSubmit = (e: React.FormEvent) => isStepValid() && handleFormSubmit(e, formData);

    return (
        <>
            {!emailVerified && showVerification && !isChecking && (
                <UnauthorizedAccess
                    reason="not-verified"
                    onRetry={checkStatus}
                    onResend={resend}
                    loading={resendLoading}
                    emailVerified={!!emailVerified}
                    secondsLeft={secondsLeft}
                    redirecting={redirecting}
                />
            )}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8 flex items-center justify-center">
                    <div className="w-full max-w-2xl">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                            {/* Progress Bar */}
                            <div className="bg-gray-100 h-2">
                                <div 
                                    className="bg-green-600 h-full transition-all duration-300" 
                                    style={{ width: `${(currentStep / 3) * 100}%` }}
                                ></div>
                            </div>

                            <div className="p-8 sm:p-10">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create your account</h1>
                                    <p className="text-gray-600">Step {currentStep} of 3</p>
                                </div>
                                
                                <form className="space-y-6">
                                    {currentStep === 1 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {["Name", "LastName", "BirthDate", "PhoneNumber"].map((field) => (
                                                <div key={field} className={field === "BirthDate" ? "md:col-span-2" : ""}>
                                                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                                      {fieldLabels[field] ?? field} <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                    id={field}
                                                    type={field === "BirthDate" ? "date" : "text"}
                                                    name={field}
                                                    value={formData[field as keyof typeof formData] || ""}
                                                    placeholder={fieldLabels[field] ?? field}
                                                    min={field === "BirthDate" ? birthDateRange.min : undefined}
                                                    max={field === "BirthDate" ? birthDateRange.max : undefined}
                                                    className={`w-full px-4 py-3 rounded-lg border ${errors[field] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                                                    onChange={handleChange}
                                                    />
                                                    {errors[field] && (
                                                        <p className="mt-2 text-sm text-red-600">{errors[field]}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                        <label htmlFor="Email" className="block text-sm font-medium text-gray-700 mb-1">
                                            {fieldLabels["Email"] ?? "Email"} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="Email"
                                            type="email"
                                            name="Email"
                                            placeholder={fieldLabels["Email"] ?? "Email"}
                                            value={formData.Email || ""}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors["Email"] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                                            onChange={handleChange}
                                        />
                                        {errors["Email"] && (
                                            <p className="mt-2 text-sm text-red-600">{errors["Email"]}</p>
                                        )}
                                        </div>

                                        <div className="relative">
                                        <label htmlFor="Password" className="block text-sm font-medium text-gray-700 mb-1">
                                            {fieldLabels["Password"] ?? "Password"} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                            id="Password"
                                            type={showPassword ? "text" : "password"}
                                            name="Password"
                                            placeholder={fieldLabels["Password"] ?? "Password"}
                                            value={formData.Password || ""}
                                            className={`w-full px-4 py-3 rounded-lg border ${errors["Password"] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition pr-10`}
                                            onChange={handleChange}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                                onClick={() => {
                                                setShowPassword((prev) => {
                                                    if (!prev) {
                                                    const id = setTimeout(() => {
                                                        setShowPassword(false);
                                                    }, 3000);
                                                    setTimeoutId(id);
                                                    } else if (timeoutId) {
                                                    clearTimeout(timeoutId);
                                                    }
                                                    return !prev;
                                                });
                                                }}
                                            >
                                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                        </div>
                                        {errors["Password"] && (
                                            <p className="mt-2 text-sm text-red-600">{errors["Password"]}</p>
                                        )}
                                        </div>
                                    </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="space-y-6">
                                            <div>
                                                <label htmlFor="Education" className="block text-sm font-medium text-gray-700 mb-1">
                                                  {fieldLabels["Education"] ?? "Education"} <span className="text-red-500">*</span>
                                                </label>
                                                <select 
                                                    id="Education"
                                                    name="Education" 
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition"
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Education Level</option>
                                                    {educationLevels.map((level) => (
                                                        <option key={level} value={level}>{level}</option>
                                                    ))}
                                                </select>
                                                {errors.education && (
                                                    <p className="mt-2 text-sm text-red-600">{errors.education}</p>
                                                )}
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
                                                <div className="flex flex-col items-center space-y-4">
                                                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full overflow-hidden flex items-center justify-center bg-gray-50">
                                                        {imagePreview ? (
                                                            <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-gray-400">No Image</span>
                                                        )}
                                                    </div>
                                                    <label className="cursor-pointer">
                                                        <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                                                            Upload Photo
                                                        </span>
                                                        <input 
                                                            type="file" 
                                                            accept="image/png, image/jpeg, image/jpg"
                                                            className="hidden"
                                                            onChange={handleImageChange}
                                                        />
                                                    </label>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="IdTeam" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Team (Optional)
                                                </label>
                                                <select
                                                    id="IdTeam"
                                                    name="IdTeam"
                                                    value={selectedTeamId}
                                                    onChange={handleTeamChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition"
                                                >
                                                    <option value="">Select Team (To be confirmed)</option>
                                                    {teamsFromDb.map((team) => (
                                                    <option key={team.ID} value={team.ID}>
                                                        {team.TeamName}
                                                    </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="IDJobPosition" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Job Position (Optional)
                                                </label>
                                                <select
                                                    id="IDJobPosition"
                                                    name="IDJobPosition"
                                                    value={formData.IDJobPosition}
                                                    disabled={!selectedTeamId}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition disabled:bg-gray-100"
                                                >
                                                    <option value="">{selectedTeamId ? "Select Job Position (To be confirmed)" : "Select a Team first"}</option>
                                                    {jobsFromDb
                                                    .filter((job) => String(job.IDTeam) === String(selectedTeamId))
                                                    .map((job) => (
                                                        <option key={job.ID} value={job.ID}>
                                                        {job.Name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    <div className={`flex ${currentStep > 1 ? 'justify-between' : 'justify-end'} space-x-4 pt-4`}>
                                        {currentStep > 1 && (
                                            <button 
                                                type="button" 
                                                className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                                onClick={handleBack}
                                            >
                                                Back
                                            </button>
                                        )}
                                        <button 
                                            type={currentStep < 3 ? "button" : "submit"} 
                                            disabled={!isStepValid()}
                                            className={`px-6 py-3 rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition
                                                ${!isStepValid() 
                                                    ? 'bg-gray-400 cursor-not-allowed' 
                                                    : 'bg-blue-600 hover:bg-blue-700'}`}
                                            onClick={currentStep < 3 ? handleNext : handleSubmit}
                                        >
                                            {currentStep < 3 ? 'Continue' : 'Complete Registration'}
                                        </button>
                                    </div>
                                </form>

                                {currentStep === 1 && (
                                    <p className="text-center text-sm mt-6 text-gray-600">
                                        Already have an account?{' '}
                                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                                            Log In
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}