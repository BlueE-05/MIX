// File: src/app/signup/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormData } from "@/types/signup";
import Navbar from "@/components/NavBar";
import { teams, jobPosition, educationLevels, fieldLabels, passwordRegex, emailRegex, phoneRegex, birthDateRange } from "@/constants/formFields";
import Image from "next/image";
import EmailVerification from '../../components/Cards/Autorizations/EmailVerification';

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
    education: "",
    profilePic: null,
    idTeam: "",
    jobPosition: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  const requiredFields = ["name", "lastName", "birthDate", "phoneNumber", "email", "password", "education"];
  
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const teamName = e.target.value;
    const team = teams.find((t) => t.name === teamName);
    setSelectedTeamId(team?.id || null);
    setFormData({
      ...formData,
      idTeam: teamName,
      jobPosition: "", // Reset position when changing team
    });
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, jobPosition: e.target.value });
  };

  // Filter positions by selected team
  const filteredPositions = selectedTeamId
    ? jobPosition.filter((job) => job.teamId === selectedTeamId)
    : [];

  const validateField = (name: string, value: string) => {
    // Length validations
    if (name === "name" && value.length > 100) {
      return "First name must be 100 characters or less";
    }
    if (name === "lastName" && value.length > 100) {
      return "Last name must be 100 characters or less";
    }
    if (name === "phoneNumber" && value.length > 30) {
      return "Phone number must be 30 characters or less";
    }
    if (name === "education" && value.length > 255) {
      return "Education level must be 255 characters or less";
    }

    // Birth date validation
    if (name === "birthDate" && value) {
      const birthDate = new Date(value);
      const minDate = new Date(birthDateRange.min);
      const maxDate = new Date(birthDateRange.max);
      
      if (birthDate < minDate || birthDate > maxDate) {
        return "Birthdate must be between 1935 and 2009";
      }
    }
    
    // Required fields and format validations
    return requiredFields.includes(name) && !value
      ? `${fieldLabels[name]} is required`
      : name === "email" && !emailRegex.test(value)
      ? "Invalid email format"
      : name === "password" && !passwordRegex.test(value)
      ? "Password must be at least 8 characters, include an uppercase letter, a number, and a special character"
      : name === "phoneNumber" && (!phoneRegex.test(value) || value.length < 10)
      ? "Phone number must be at least 10 characters, with no spaces between numbers"
      : "";
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profilePic: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Special handling for birthDate to prevent future dates
    if (name === "birthDate") {
      const inputDate = new Date(value);
      const currentDate = new Date();
      if (inputDate > currentDate) {
        setErrors((prev) => ({ ...prev, [name]: "Birthdate cannot be in the future" }));
        return;
      }
    }
    
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const isStepValid = () => {
    const stepFields: (keyof typeof formData)[] =
      currentStep === 1
        ? ["name", "lastName", "birthDate", "phoneNumber"]
        : currentStep === 2
        ? ["email", "password"]
        : ["education"];

    // Additional check for birthDate in step 1
    if (currentStep === 1 && formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      const maxDate = new Date(birthDateRange.max);
      if (birthDate > maxDate) {
        return false;
      }
    }

    return stepFields.every((field) => !errors[field] && formData[field]);
  };

  const handleNext = () => isStepValid() && setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid()) {
      console.log("Form Data:", formData);
      // Instead of redirecting directly, show verification modal
      setShowVerification(true);
    }
  };

  const handleContinueToDashboard = () => {
    setShowVerification(false);
    router.push("/crm/dashboard");
  };

  return (
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldLabels["name"]} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        maxLength={100}
                        placeholder={fieldLabels["name"]}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldLabels["lastName"]} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        maxLength={100}
                        placeholder={fieldLabels["lastName"]}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldLabels["birthDate"]} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="birthDate"
                        type="date"
                        name="birthDate"
                        placeholder={fieldLabels["birthDate"]}
                        max={birthDateRange.max}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.birthDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                        onChange={handleChange}
                      />
                      {errors.birthDate && (
                        <p className="mt-2 text-sm text-red-600">{errors.birthDate}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldLabels["phoneNumber"]} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        maxLength={30}
                        placeholder={fieldLabels["phoneNumber"]}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phoneNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                        onChange={handleChange}
                      />
                      {errors.phoneNumber && (
                        <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldLabels["email"]} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder={fieldLabels["email"]}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldLabels["password"]} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder={fieldLabels["password"]}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        Password must be at least 8 characters, include an uppercase letter, a number, and a special character
                      </p>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                        {fieldLabels["education"]} <span className="text-red-500">*</span>
                      </label>
                      <select 
                        id="education"
                        name="education" 
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
                            <Image
                              src={imagePreview}
                              alt="Profile Preview"
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
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
                      <label htmlFor="idTeam" className="block text-sm font-medium text-gray-700 mb-1">
                        Team
                      </label>
                      <select
                        id="idTeam"
                        name="idTeam"
                        value={formData.idTeam}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition"
                        onChange={handleTeamChange}
                      >
                        <option value="">Select Team (To be confirmed)</option>
                        {teams.map((team) => (
                          <option key={team.id} value={team.name}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700 mb-1">
                        Job Position
                      </label>
                      <select
                        id="jobPosition"
                        name="jobPosition"
                        value={formData.jobPosition}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition"
                        onChange={handlePositionChange}
                        disabled={!selectedTeamId}
                      >
                        <option value="">Job Position (To be confirmed)</option>
                        {filteredPositions.map((job) => (
                          <option key={job.id} value={job.name}>
                            {job.name}
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
                    onClick={currentStep < 3 ? handleNext : undefined}
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

              {showVerification && (
                <EmailVerification 
                  isVerified={false}
                  onContinue={handleContinueToDashboard}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}