"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormProps, SignupFormData } from "@/types/signup";
import Navbar from "@/components/NavBar";
import { teams, educationLevels, fieldLabels, passwordRegex, emailRegex, phoneRegex, birthDateRange } from "@/constants/formFields";

export default function SignupForm({ onSubmit }: SignupFormProps) {
    const router = useRouter();

    const handleFormSubmit = onSubmit ?? (() => {}); 

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

    const requiredFields = ["name", "lastName", "birthDate", "phoneNumber", "email", "password", "education"];

    const validateField = (name: string, value: string) => {
        return requiredFields.includes(name) && !value
            ? `${fieldLabels[name]} is required`
            : name === "email" && !emailRegex.test(value)
            ? "Invalid email format"
            : name === "password" && !passwordRegex.test(value)
            ? "Password must be at least 8 characters, include an uppercase letter, a number, and a special character"
            : name === "phoneNumber" && (!phoneRegex.test(value) || value.length < 13)
            ? "Phone number must be at least 13 characters (including country code) with no spaces between numbers"
            : name === "birthDate" && (value < birthDateRange.min || value > birthDateRange.max)
            ? "Birthdate must be between 1935 and 2009"
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const isStepValid = () => {
        const stepFields: (keyof typeof formData)[] =
            currentStep === 1 ? ["name", "lastName", "birthDate", "phoneNumber"] :
            currentStep === 2 ? ["email", "password"] :
            ["education"];
    
        return stepFields.every((field) => !errors[field] && formData[field]);
    };

    const handleNext = () => isStepValid() && setCurrentStep((prev) => prev + 1);
    const handleBack = () => setCurrentStep((prev) => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isStepValid()) {
            handleFormSubmit(e, formData);
            router.push("/crm/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navbar />
            <div className="flex flex-1 items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto space-y-4">
                    <h2 className="text-2xl font-bold text-center mb-4 text-black-600">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
                        {currentStep === 1 && (
                            <>
                                {["name", "lastName", "birthDate", "phoneNumber"].map((field) => (
                                    <div key={field}>
                                        <label className="block font-medium">{fieldLabels[field]} <span className="text-red-500">*</span></label>
                                        <input
                                            type={field === "birthDate" ? "date" : "text"}
                                            name={field}
                                            placeholder={fieldLabels[field]}
                                            className={`p-2 border rounded w-full ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                                            onChange={handleChange}
                                        />
                                        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                                    </div>
                                ))}
                                <p className="text-center text-sm mt-4">
                                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log In</a>
                                </p>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                {["email", "password"].map((field) => (
                                    <div key={field}>
                                        <label className="block font-medium">{fieldLabels[field]} <span className="text-red-500">*</span></label>
                                        <input
                                            type={field}
                                            name={field}
                                            placeholder={fieldLabels[field]}
                                            className={`p-2 border rounded w-full ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                                            onChange={handleChange}
                                        />
                                        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                                    </div>
                                ))}
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <label className="block font-medium">{fieldLabels["education"]} <span className="text-red-500">*</span></label>
                                <select name="education" className="p-2 border rounded w-full border-gray-300" onChange={handleChange}>
                                    <option value="">Select Education Level</option>
                                    {educationLevels.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>

                                <label className="block font-medium">Profile Picture (Optional)</label>
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 border-2 border-gray-300 rounded-full overflow-hidden flex items-center justify-center">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-gray-500">No Image</span>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="mt-4 border p-2 rounded-lg text-sm text-gray-600 cursor-pointer"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <label className="block font-medium">Job Position (Optional)</label>
                                <input 
                                    type="text" 
                                    name="jobPosition" 
                                    placeholder="Job Position (To be confirmed)" 
                                    className="p-2 border rounded w-full border-gray-300" 
                                    onChange={handleChange} 
                                />

                                <label className="block font-medium">Team (Optional)</label>
                                <select name="idTeam" className="p-2 border rounded w-full border-gray-300" onChange={handleChange}>
                                    <option value="">Select Team (To be confirmed)</option>
                                    {teams.map((team) => (
                                        <option key={team.id} value={team.name}>{team.name}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        <div className={`flex ${currentStep > 1 ? 'justify-between space-x-4' : ''} mt-4`}>
                            {currentStep > 1 && (
                                <button 
                                    type="button" 
                                    className="bg-green-500 text-white px-4 py-2 rounded w-1/2"
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                            )}
                            <button 
                                type={currentStep < 3 ? "button" : "submit"} 
                                disabled={!isStepValid()}
                                className={`px-4 py-2 rounded transition ${currentStep > 1 ? 'w-1/2' : 'w-full'}
                                    ${!isStepValid() ? 'bg-orange-300 cursor-not-allowed opacity-75' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                                onClick={currentStep < 3 ? handleNext : undefined}
                            >
                                {currentStep < 3 ? "Next" : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
