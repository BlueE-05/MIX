'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/Forms/Input";
import RoundedButton from "@/components/Buttons/RoundedButton";
import { Check } from "lucide-react";
import { ContactData, EnterpriseData } from "@/types/Contact"

interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: ContactData | EnterpriseData) => void;
  onFormTypeChange: (type: string) => void;
}

export default function Formulario({ onClose, onSubmit, onFormTypeChange }: FormularioProps) {
  const [formType, setFormType] = useState<string>("New Contact");
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    lastName: "",
    enterprise: "",
    phone: "",
    email: "",
  });

  const [enterpriseData, setEnterpriseData] = useState<EnterpriseData>({
    name: "",
    description: "",
    industry: "",
    webpageUrl: "",
  });

  const enterprises = ["EcoLogix", "TechNova", "AgroVida", "FinanPlus"];

  const handleChangeContact = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleChangeEnterprise = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    setEnterpriseData({ ...enterpriseData, [e.target.name]: e.target.value });
  };

  const handleSubmitContact = (e: FormEvent): void => {
    e.preventDefault();
  
    const dataToSend = {
      name: contactData.name,
      lastName: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      enterprise: contactData.enterprise,  // Nombre de la empresa seleccionado en el dropdown
    };
  
    onSubmit(dataToSend);
  };

  const handleSubmitEnterprise = (e: FormEvent): void => {
    e.preventDefault();
    onSubmit(enterpriseData);
  };

  const handleFormTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setFormType(type);
    onFormTypeChange(type === "New Contact" ? "contact" : "enterprise");
  };

  const isContactFormValid = () => {
    return (
      contactData.name !== "" &&
      contactData.lastName !== "" &&
      contactData.enterprise !== ""
    );
  };

  const isEnterpriseFormValid = () => {
    return (
      enterpriseData.name !== "" &&
      enterpriseData.industry !== ""
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="font-bold text-3xl">{formType} Form</h1>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <select 
          onChange={handleFormTypeChange} 
          value={formType}
          className="w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 mb-10 text-green-800 font-bold"
        >
          <option>New Contact</option>
          <option>New Enterprise</option>
        </select>

        {formType === "New Contact" ? (
          <form>
            <div className="flex gap-10 w-full">
              <div className="flex-1">
                <Input label="Name" name="name" type="text" value={contactData.name} onChange={handleChangeContact} required />
              </div>
              <div className="flex-1">
                <Input label="Last Name" name="lastName" type="text" value={contactData.lastName} onChange={handleChangeContact} required />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex">
                <label htmlFor="enterprise" className="block text-sm font-bold text-gray-700 mb-2">Enterprise</label>
                <span className="font-bold text-md text-red-600">*</span>
              </div>
              <select 
                name="enterprise" 
                value={contactData.enterprise} 
                onChange={handleChangeContact} 
                required 
                className="w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
              >
                <option value="">Select Enterprise</option>
                {enterprises.map((enterprise, index) => (
                  <option key={index} value={enterprise}>
                    {enterprise}
                  </option>
                ))}
              </select>
            </div>

            <Input label="Phone" name="phone" type="tel" value={contactData.phone} onChange={handleChangeContact} />
            <Input label="Email" name="email" type="email" value={contactData.email} onChange={handleChangeContact} />

            <div className="flex justify-end w-full mt-10 border-t border-gray-300 pt-4">
              <button type="submit" className="hidden" aria-hidden="true" />
              <div 
                onClick={(e) => {
                  const event = e as unknown as FormEvent;
                  handleSubmitContact(event);
                }}
                className="cursor-pointer"
              >
                <RoundedButton 
                  color={isContactFormValid() ? "green" : "red"} 
                  text="Submit" 
                  Icon={Check}
                />
              </div>
            </div>
          </form>
        ) : (
          <form>
            <Input label="Name"         name="name"         type="text" value={enterpriseData.name}         onChange={handleChangeEnterprise} required />
            <Input label="Industry"     name="industry"     type="text" value={enterpriseData.industry}     onChange={handleChangeEnterprise} required />
            <Input label="Description"  name="description"  type="text" value={enterpriseData.description}  onChange={handleChangeEnterprise} />
            <Input label="Webpage URL"  name="webpageUrl"   type="url"  value={enterpriseData.webpageUrl}   onChange={handleChangeEnterprise} />

            <div className="flex justify-end w-full mt-10 border-t border-gray-300 pt-4">
              <button type="submit" className="hidden" aria-hidden="true" />
              <div 
                onClick={(e) => {
                  const event = e as unknown as FormEvent;
                  handleSubmitEnterprise(event);
                }}
                className="cursor-pointer"
              >
                <RoundedButton 
                  color={isEnterpriseFormValid() ? "green" : "red"} 
                  text="Submit" 
                  Icon={Check}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}