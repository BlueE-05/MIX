'use client'
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';

import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import RoundedButton from '@/components/Buttons/RoundedButton';
import Formulario, { ContactData, EnterpriseData } from '@/components/Forms/ContactsForms';
import { CirclePlus } from 'lucide-react';

interface ContactFromAPI {
  ID: number;
  Name: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  EnterpriseName: string;
  CreationDate: string;
  LastInteraction: string;
}

interface ContactRow {
  id: number;
  name: string;
  lastName: string;
  enterprise: string;
  status: ReactNode;
  phone: string;
  email: string;
  actions: ReactNode;
}

export default function ContactPage() {
  const contactHeaders = ["#", "Name(s)", "Last Name", "Enterprise", "Status", "Phone Number", "E-mail", ""];
  
  const [contactData, setContactData] = useState<ContactRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'contact' | 'enterprise'>('contact');

  const fetchContacts = async (searchTerm?: string) => {
    try {
      const url = "http://localhost:5000/api/contacts/1";
      
      // Si hay término de búsqueda, buscamos por nombre y empresa
      if (searchTerm && searchTerm.trim() !== '') {
        const [nameResults, enterpriseResults] = await Promise.all([
          fetch(`${url}/name/${encodeURIComponent(searchTerm)}`),
          fetch(`${url}/enterprise/${encodeURIComponent(searchTerm)}`)
        ]);
        
        const nameData: ContactFromAPI[] = await nameResults.json();
        const enterpriseData: ContactFromAPI[] = await enterpriseResults.json();
        
        // Combinar resultados y eliminar duplicados
        const combinedData = [...nameData, ...enterpriseData];
        const uniqueData = combinedData.filter((contact, index, self) =>
          index === self.findIndex(c => c.ID === contact.ID)
        );
        
        transformAndSetData(uniqueData);
      } else {
        const res = await fetch(url);
        const data: ContactFromAPI[] = await res.json();
        transformAndSetData(data);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const transformAndSetData = (data: ContactFromAPI[]) => {
    const now = new Date();
    
    const transformed: ContactRow[] = data.map((contact, index) => {
      const lastInteraction = new Date(contact.LastInteraction);
      const daysSinceInteraction = Math.floor((now.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24));

      const status = daysSinceInteraction <= 30 ? "Active" : "Inactive";
      const color = status === "Active" ? "green" : "red";

      return {
        id: index + 1,
        name: contact.Name,
        lastName: contact.LastName,
        enterprise: contact.EnterpriseName,
        status: <LabelOval key={`status-${index}`} color={color} data={status} />,
        phone: contact.PhoneNumber,
        email: contact.Email,
        actions: <ArrowRightButton key={`arrow-${index}`} />
      };
    });

    setContactData(transformed);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    await fetchContacts(searchTerm);
  };

  const handleNewContact = async (data: ContactData | EnterpriseData) => {
    if (formType === 'contact') {
      const contact = data as ContactData;
  
      const contactDataToSend = {
        name: contact.name,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phone,
        nameEnterprise: contact.enterprise,
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/contacts/1", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactDataToSend),
        });
  
        if (!response.ok) {
          throw new Error("Error creating contact");
        }
  
        await fetchContacts(); // Actualizar la lista de contactos
        setShowForm(false); // Cerrar el formulario
      } catch (err) {
        console.error("Error creating contact:", err);
      }
    } else {
      console.log('New enterprise:', data);
    }
  };

  // Convert ContactRow[] to ReactNode[][]
  const contactDataForTable: ReactNode[][] = contactData.map(contact => [
    contact.id,
    contact.name,
    contact.lastName,
    contact.enterprise,
    contact.status,
    contact.phone,
    contact.email,
    contact.actions,
  ]);




  return (
    <main className="min-h-screen p-6">
      {/* Title of the page */}
      <h1 className="font-bold text-3xl mb-5">Contacts List</h1>
      
      {/* Table of contacts */}
      <CustomTable headers={contactHeaders} data={contactDataForTable} color="green" includeSearch={true} onSearch={handleSearch} />

      {/* Form to add new contact */}
      {showForm && (
        <Formulario onClose={() => setShowForm(false)} onSubmit={handleNewContact} onFormTypeChange={(type) => setFormType(type as 'contact' | 'enterprise')} />
      )}

      {/* Button to add new contact */}
      <div className="fixed bottom-6 right-6">
        <div onClick={() => { setShowForm(true); setFormType('contact'); }} className='cursor-pointer'>
          <RoundedButton color="green" text="New Contact" Icon={CirclePlus} />
        </div>
      </div>
      
    </main>
  );
};