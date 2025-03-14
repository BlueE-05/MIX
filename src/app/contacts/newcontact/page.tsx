'use client'

import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/Forms/Input"; // Importa el componente Input
import RoundedButton from "@/components/Buttons/RoundedButton";
import { Check } from "lucide-react";

interface ContactData {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    enterprise: string;
    creationDate: string;
    lastInteraction: string; //esto si incluye la hora
}

interface EnterpriseData {
    name: string;
    description: string;
    industry: string;
    webpageUrl: string;
    creationDate: string;
}

export default function NewContactPage() {
    const [formType, setFormType] = useState<string>("New Contact");
    const [contactData, setContactData] = useState<ContactData>({
        name: "",
        lastName: "",
        enterprise: "",
        phone: "",
        email: "",
        creationDate: new Date().toLocaleDateString("en-US"),
        lastInteraction: new Date().toLocaleString("en-US"),
    });

    const [enterpriseData, setEnterpriseData] = useState<EnterpriseData>({
        name: "",
        description: "",
        industry: "",
        webpageUrl: "",
        creationDate: new Date().toLocaleDateString("en-US"),
    });

    const enterprises = ["Enterprise 1", "Enterprise 2", "Enterprise 3"];

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
        console.log("Contact Data Submitted", contactData);
    };

    const handleSubmitEnterprise = (e: FormEvent): void => {
        e.preventDefault();
        console.log("Enterprise Data Submitted", enterpriseData);
    };

    // Verificación de campos requeridos para New Contact
    const isContactFormValid = () => {
        return (
            contactData.name !== "" &&
            contactData.lastName !== "" &&
            contactData.enterprise !== ""
        );
    };

    // Verificación de campos requeridos para New Enterprise
    const isEnterpriseFormValid = () => {
        return (
            enterpriseData.name !== "" &&
            enterpriseData.industry !== ""
        );
    };

    return (
        <main className="min-h-screen p-6 w-full">
            <h1 className="font-bold text-3xl mb-5">{formType} Form</h1>

            {/*Seleccionar el tipo de form */}
            <select onChange={(e) => setFormType(e.target.value)} value={formType}
                className="w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 mb-10 text-green-800 font-bold">
                <option>New Contact</option>
                <option>New Enterprise</option>
            </select>

            {formType === "New Contact" ? (
                //?Formulario para NewContact
                <form onSubmit={handleSubmitContact}>
                    <div className="flex gap-10 w-full">
                        <div className="flex-1"> {/* Se garantiza que cada input ocupe el 50% del ancho */}
                            <Input label="Name" name="name" type="text" value={contactData.name} onChange={handleChangeContact} required />
                        </div>
                        <div className="flex-1"> {/* Se garantiza que cada input ocupe el 50% del ancho */}
                            <Input label="Last Name" name="lastName" type="text" value={contactData.lastName} onChange={handleChangeContact} required />
                        </div>
                    </div>

                    {/* Dropdown */}
                    <div className="mb-4">
                        <div className="flex">
                            <label htmlFor="enterprise" className="block text-sm font-bold text-gray-700 mb-2">Enterprise</label>
                            <span className="font-bold text-md text-red-600">*</span>
                        </div>
                        <select name="enterprise" value={contactData.enterprise} onChange={handleChangeContact} required className="w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:outline-none focus:ring-2 focus:ring-stone-900">
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

                    <div className="flex gap-4 border-t border-gray-300 pt-4 mt-10">
                        <div className="flex-1"> {/* Se garantiza que cada input ocupe el 50% del ancho */}
                            <Input label="Last Interaction" name="lastInteraction" type="text" value={contactData.lastInteraction} onChange={handleChangeContact} disabled />
                        </div>
                        <div className="flex-1"> {/* Se garantiza que cada input ocupe el 50% del ancho */}
                            <Input label="Creation Date" name="creationDate" type="text" value={contactData.creationDate} onChange={handleChangeContact} disabled />
                        </div>
                    </div>

                    {/* Botón submit para NewContact */}
                    <div className="flex justify-end w-full">
                        <RoundedButton color={isContactFormValid() ? "green" : "red"} text="Submit" Icon={Check} link="/contacts" />  {/*TODO: aqui falta el onChange(setNewContact) que se implementará después*/}
                    </div>
                </form>
            ) : (
                //?Formulario para NewEnterprise
                <form onSubmit={handleSubmitEnterprise}>
                    <Input label="Name" name="name" type="text" value={enterpriseData.name} onChange={handleChangeEnterprise} required />
                    <Input label="Industry" name="industry" type="text" value={enterpriseData.industry} onChange={handleChangeEnterprise} required />
                    <Input label="Description" name="description" type="text" value={enterpriseData.description} onChange={handleChangeEnterprise} />
                    <Input label="Webpage URL" name="webpageUrl" type="url" value={enterpriseData.webpageUrl} onChange={handleChangeEnterprise} />

                    <div className="flex gap-4 border-t border-gray-300 pt-4 mt-10">
                        <Input label="Creation Date" name="creationDate" type="text" value={enterpriseData.creationDate} onChange={handleChangeEnterprise} disabled />
                    </div>

                    {/* Botón submit para NewEnterprise */}
                    <div className="flex justify-end w-full">
                        <RoundedButton color={isEnterpriseFormValid() ? "green" : "red"} text="Submit" Icon={Check} link="/contacts" /> {/*TODO: aqui falta el onChange(setNewEnterprise) que se implementará después*/}
                    </div>
                </form>
            )}
        </main>
    );
}