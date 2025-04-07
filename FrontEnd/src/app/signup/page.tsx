"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormProps, SignupFormData } from "@/types/signup";
import Navbar from "@/components/NavBar";
import { educationLevels, fieldLabels, passwordRegex, emailRegex, phoneRegex, birthDateRange } from "@/constants/formFields";

export default function SignupForm({ onSubmit }: SignupFormProps) {
    const router = useRouter();

    const cleanFormData = (data: SignupFormData): SignupFormData => {
        const cleanedData: any = {};
      
        for (const [key, value] of Object.entries(data)) {
          if (
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === "")
          ) {
            cleanedData[key] = null;
          } else {
            cleanedData[key] = value;
          }
        }
      
        return cleanedData as SignupFormData;
      };

    const handleFormSubmit = async (e: React.FormEvent, data: SignupFormData) => {
        e.preventDefault();
      
        try {
            const response = await fetch("http://localhost:4000/api/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(cleanFormData(data))
            });
      
          if (!response.ok) throw new Error("Signup failed");
          const result = await response.json();
          console.log("Signup result:", result);
          localStorage.setItem("access_token", result.access_token);
          router.push("/crm/dashboard");
        } catch (error) {
          console.error("Signup error:", error);
          alert("Error al registrar usuario");
        }
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
      IdTeam: "",
      JobPosition: "",
    });

    const [teamsFromDb, setTeamsFromDb] = useState<{ ID: string; TeamName: string }[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const fetchTeams = async () => {
          try {
            const res = await fetch("http://localhost:4000/api/teams");
            const data = await res.json();
            setTeamsFromDb(data);
          } catch (err) {
            console.error("Error fetching teams:", err);
          }
        };
        fetchTeams();
      }, []);

    const requiredFields = ["Name", "LastName", "BirthDate", "PhoneNumber", "Email", "Password", "Education"];

    const validateField = (name: string, value: string) => {
        return requiredFields.includes(name) && !value
          ? `${fieldLabels[name]} is required`
          : name === "Email" && !emailRegex.test(value)
          ? "Invalid email format"
          : name === "Password" && !passwordRegex.test(value)
          ? "Password must be at least 8 characters, include an uppercase letter, a number, and a special character"
          : name === "PhoneNumber" && (!phoneRegex.test(value) || value.length < 13)
          ? "Phone number must be at least 13 characters (including country code) with no spaces between numbers"
          : name === "BirthDate" && (value < birthDateRange.min || value > birthDateRange.max)
          ? "Birthdate must be between 1935 and 2009"
          : "";
    };

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    
            if (!allowedTypes.includes(file.type)) {
                setErrors((prev) => ({
                    ...prev,
                    profilePic: "Only .jpg, .jpeg and .png files are allowed",
                }));
                setFormData((prev) => ({ ...prev, profilePic: null }));
                setImagePreview(null);
                return;
            }
    
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
    
                setFormData((prev) => ({
                    ...prev,
                    ProfilePic: base64String,
                }));
                setImagePreview(base64String);
                setErrors((prev) => ({
                    ...prev,
                    profilePic: "",
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const isStepValid = () => {
        const stepFields: (keyof typeof formData)[] =
            currentStep === 1 ? ["Name", "LastName", "BirthDate", "PhoneNumber"] :
            currentStep === 2 ? ["Email", "Password"] :
            ["Education"];
    
        return stepFields.every((field) => !errors[field] && formData[field]);
    };

    const handleNext = () => isStepValid() && setCurrentStep((prev) => prev + 1);
    const handleBack = () => setCurrentStep((prev) => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
          handleFormSubmit(e, formData);
        }
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
                            
                            <form className="space-y-6">
                                {currentStep === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {["Name", "LastName", "BirthDate", "PhoneNumber"].map((field) => (
                                            <div key={field} className={field === "BirthDate" ? "md:col-span-2" : ""}>
                                                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                                    {fieldLabels[field]} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id={field}
                                                    type={field === "BirthDate" ? "date" : "text"}
                                                    name={field}
                                                    value={formData[field as keyof typeof formData] || ""}
                                                    placeholder={fieldLabels[field]}
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
                                        {["Email", "Password"].map((field) => (
                                            <div key={field}>
                                                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                                                    {fieldLabels[field]} <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id={field}
                                                    type={field}
                                                    name={field}
                                                    placeholder={fieldLabels[field]}
                                                    className={`w-full px-4 py-3 rounded-lg border ${errors[field] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} focus:outline-none focus:ring-2 transition`}
                                                    onChange={handleChange}
                                                />
                                                {errors[field] && (
                                                    <p className="mt-2 text-sm text-red-600">{errors[field]}</p>
                                                )}
                                                {field === "password" && (
                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Password must be at least 8 characters, include an uppercase letter, a number, and a special character
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="Education" className="block text-sm font-medium text-gray-700 mb-1">
                                                {fieldLabels["Education"]} <span className="text-red-500">*</span>
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
                                            <label htmlFor="JobPosition" className="block text-sm font-medium text-gray-700 mb-1">
                                                Job Position (Optional)
                                            </label>
                                            <input 
                                                id="JobPosition"
                                                type="text" 
                                                name="JobPosition" 
                                                placeholder="Job Position (To be confirmed)" 
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition" 
                                                onChange={handleChange} 
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="IdTeam" className="block text-sm font-medium text-gray-700 mb-1">
                                                Team (Optional)
                                            </label>
                                            <select 
                                                id="IdTeam"
                                                name="IdTeam" 
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 transition"
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Team (To be confirmed)</option>
                                                {teamsFromDb.map((team) => (
                                                    <option key={team.ID} value={team.ID}>
                                                        {team.TeamName}
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
    );
}