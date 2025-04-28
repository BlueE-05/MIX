<<<<<<< HEAD
import React, { useState, ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import Input from "@/components/Forms/Input";
import RoundedButton from "@/components/Buttons/RoundedButton";
import { Check } from "lucide-react";
import { ContactData } from "@/types/ContactTypes";
import { EnterpriseGet, EnterpriseSend } from "@/types/EnterpriseTypes";
import { createContact } from "@/hooks/contacts/createContact";
import { createEnterprise } from "@/hooks/enterprises/createEnterprise";
import { fetchEnterprises } from "@/hooks/enterprises/fetchEnterprises";

interface FormularioProps {
  onClose: () => void;
  onSubmit?: (data: ContactData | EnterpriseSend) => void;
  onFormTypeChange: (type: string) => void;
  formType: 'contact' | 'enterprise';
}
	
const MAX_LENGTHS = {
  name: 100,
  lastName: 100,
  phoneNumber: 30,
  email: 255,
  enterpriseName: 100,
  industry: 100,
  description: 500,
  webpageUrl: 255,
};

export default function Formulario({ onClose, onSubmit, onFormTypeChange, formType: initialFormType }: FormularioProps) {
  const [formType, setFormType] = useState<string>(initialFormType === 'contact' ? "New Contact" : "New Enterprise");
  const [enterprises, setEnterprises] = useState<EnterpriseGet[]>([]);
  const [contactData, setContactData] = useState<ContactData>({
    Name: "",
    LastName: "",
    EnterpriseName: "",
    PhoneNumber: "",
    Email: "",
  });

  const [enterpriseData, setEnterpriseData] = useState<EnterpriseSend>({
    Name: "",
    Description: "",
    Industry: "",
    Website: "",
  });

  const loadEnterprises = useCallback(async () => {
    try {
      const data = await fetchEnterprises();
      setEnterprises(data);
    } catch (error) {
      throw Error(`Error loading enterprises: ${error}`);
    }
  }, []);

  const handleCreateSubmitForm = useCallback(async (data: ContactData | EnterpriseSend) => {
    try {
      if (formType === "New Contact") {
        await createContact(data as ContactData);
      } else {
        await createEnterprise(data as EnterpriseSend);
      }
      onClose();
    } catch (error) {
      console.error("Error creating:", error);
    }
  }, [formType, onClose]);
=======
'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/Forms/Input";
import RoundedButton from "@/components/Buttons/RoundedButton";
import { Check } from "lucide-react";

export interface ContactData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  enterprise: string;
}

export interface EnterpriseData {
  name: string;
  description: string;
  industry: string;
  webpageUrl: string;
}

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
>>>>>>> origin/pruebanewmerge_sales_report

  const handleChangeContact = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
<<<<<<< HEAD
    const { name, value } = e.target;
    let trimmedValue = value;
    
    // Apply max length restriction for contact fields
    switch (name) {
      case 'Name':
        trimmedValue = value.slice(0, MAX_LENGTHS.name);
        break;
      case 'LastName':
        trimmedValue = value.slice(0, MAX_LENGTHS.lastName);
        break;
      case 'PhoneNumber':
        trimmedValue = value.slice(0, MAX_LENGTHS.phoneNumber);
        break;
      case 'Email':
        trimmedValue = value.slice(0, MAX_LENGTHS.email);
        break;
      case 'EnterpriseName':
        trimmedValue = value.slice(0, MAX_LENGTHS.enterpriseName);
        break;
      default:
        break;
    }
    setContactData({ ...contactData, [name]: trimmedValue });
=======
    setContactData({ ...contactData, [e.target.name]: e.target.value });
>>>>>>> origin/pruebanewmerge_sales_report
  };

  const handleChangeEnterprise = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
<<<<<<< HEAD
    const { name, value } = e.target;
    let trimmedValue = value;
    // Apply max length restriction for enterprise fields
    switch (name) {
      case 'Name':
        trimmedValue = value.slice(0, MAX_LENGTHS.name);
        break;
      case 'Industry':
        trimmedValue = value.slice(0, MAX_LENGTHS.industry);
        break;
      case 'Description':
        trimmedValue = value.slice(0, MAX_LENGTHS.description);
        break;
      case 'WebpageUrl':
        trimmedValue = value.slice(0, MAX_LENGTHS.webpageUrl);
        break;
      default:
        break;
    }
    setEnterpriseData({ ...enterpriseData, [name]: trimmedValue });
  };

  const handleSubmitContact = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (isContactFormValid()) {
      // Find the selected enterprise's ID from the list
      const selectedEnterprise = enterprises.find(
        (enterprise) => enterprise.Name === contactData.EnterpriseName
      );

      if (selectedEnterprise) {
        // Add the IDEnterprise field to the contact data
        const contactDataWithEnterprise = {
          ...contactData,
          IDEnterprise: selectedEnterprise.ID, // Assuming 'ID' is the identifier for the enterprise
        };

        await handleCreateSubmitForm(contactDataWithEnterprise);
        if (onSubmit) onSubmit(contactDataWithEnterprise);
      } else {
        console.error("Enterprise not found");
      }
    }
  };

  const handleSubmitEnterprise = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (isEnterpriseFormValid()) {
      await handleCreateSubmitForm(enterpriseData);
      if (onSubmit) onSubmit(enterpriseData);
    }
=======
    setEnterpriseData({ ...enterpriseData, [e.target.name]: e.target.value });
  };

  const handleSubmitContact = (e: FormEvent): void => {
    e.preventDefault();
  
    // Prepara los datos para enviar en el formato correcto
    const dataToSend = {
      name: contactData.name,
      lastName: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      enterprise: contactData.enterprise,  // Nombre de la empresa seleccionado en el dropdown
    };
  
    // Llamada a la función onSubmit pasando los datos formateados
    onSubmit(dataToSend);
  };

  const handleSubmitEnterprise = (e: FormEvent): void => {
    e.preventDefault();
    onSubmit(enterpriseData);
>>>>>>> origin/pruebanewmerge_sales_report
  };

  const handleFormTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setFormType(type);
    onFormTypeChange(type === "New Contact" ? "contact" : "enterprise");
  };

<<<<<<< HEAD
  const isContactFormValid = (): boolean => {
    return (
      contactData.Name.trim() !== "" &&
      contactData.LastName.trim() !== "" &&
      contactData.EnterpriseName.trim() !== ""
    );
  };

  const isEnterpriseFormValid = (): boolean => {
    return (
      enterpriseData.Name.trim() !== "" &&
      enterpriseData.Industry.trim() !== ""
    );
  };

  useEffect(() => {
    loadEnterprises();
  }, [loadEnterprises]);

=======
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

>>>>>>> origin/pruebanewmerge_sales_report
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="font-bold text-3xl">{formType} Form</h1>
<<<<<<< HEAD
          <button
=======
          <button 
>>>>>>> origin/pruebanewmerge_sales_report
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

<<<<<<< HEAD
        <select
          onChange={handleFormTypeChange}
=======
        <select 
          onChange={handleFormTypeChange} 
>>>>>>> origin/pruebanewmerge_sales_report
          value={formType}
          className="w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 mb-10 text-green-800 font-bold"
        >
          <option>New Contact</option>
          <option>New Enterprise</option>
        </select>

        {formType === "New Contact" ? (
          <form>
<<<<<<< HEAD
          <div className="flex gap-10 w-full">
            <div className="flex-1">
              <Input label="Name" name="Name" type="text" value={contactData.Name} onChange={handleChangeContact} required max_lenght={MAX_LENGTHS.name} />
            </div>
            <div className="flex-1">
              <Input label="Last Name" name="LastName" type="text" value={contactData.LastName} onChange={handleChangeContact} required max_lenght={MAX_LENGTHS.lastName} />
            </div>
          </div>
        
          <div className="mb-4">
            <div className="flex">
              <label htmlFor="EnterpriseName" className="block text-sm font-bold text-gray-700 mb-2">
                Enterprise
              </label>
              <span className="font-bold text-md text-red-600">*</span>
            </div>
            <select
              name="EnterpriseName"
              value={contactData.EnterpriseName}
              onChange={handleChangeContact}
              required
              className="w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <option value="">Select Enterprise</option>
              {enterprises.map((enterprise) => (
                <option key={enterprise.ID} value={enterprise.Name}>
                  {enterprise.Name}
                </option>
              ))}
            </select>
          </div>
        
          <Input label="Phone" name="PhoneNumber" type="tel" value={contactData.PhoneNumber} onChange={handleChangeContact} max_lenght={MAX_LENGTHS.phoneNumber} />
          <Input label="Email" name="Email" type="email" value={contactData.Email} onChange={handleChangeContact} max_lenght={MAX_LENGTHS.phoneNumber} />
        
          <div className="flex justify-end w-full mt-10 border-t border-gray-300 pt-4">
            <button type="submit" className="hidden" aria-hidden="true" />
            <div
              onClick={(e) => {
                if (isContactFormValid()) {
                  const event = e as unknown as FormEvent;
                  handleSubmitContact(event);
                }
              }}
              className={`cursor-pointer ${!isContactFormValid() ? 'pointer-events-none opacity-50' : ''}`}
            >
              <RoundedButton
                color={isContactFormValid() ? "green" : "gray"}
                text="Submit"
                Icon={Check}
              />
            </div>
          </div>
        </form>
        ) : (
          <form>
            <Input label="Name" name="Name" type="text" value={enterpriseData.Name} onChange={handleChangeEnterprise} required max_lenght={MAX_LENGTHS.name} />
            <Input label="Industry" name="Industry" type="text" value={enterpriseData.Industry} onChange={handleChangeEnterprise} required max_lenght={MAX_LENGTHS.industry} />
            <Input label="Description" name="Description" type="text" value={enterpriseData.Description || ""} onChange={handleChangeEnterprise} max_lenght={MAX_LENGTHS.description} />
            <Input label="Webpage URL" name="Website" type="url" value={enterpriseData.Website || ""} onChange={handleChangeEnterprise} max_lenght={MAX_LENGTHS.webpageUrl} />

            <div className="flex justify-end w-full mt-10 border-t border-gray-300 pt-4">
              <button type="submit" className="hidden" aria-hidden="true" />
              <div
=======
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
>>>>>>> origin/pruebanewmerge_sales_report
                onClick={(e) => {
                  const event = e as unknown as FormEvent;
                  handleSubmitEnterprise(event);
                }}
                className="cursor-pointer"
              >
<<<<<<< HEAD
                <RoundedButton
                  color={isEnterpriseFormValid() ? "green" : "red"}
                  text="Submit"
=======
                <RoundedButton 
                  color={isEnterpriseFormValid() ? "green" : "red"} 
                  text="Submit" 
>>>>>>> origin/pruebanewmerge_sales_report
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