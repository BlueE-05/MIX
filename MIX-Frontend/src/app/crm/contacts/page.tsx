'use client'
import { useEffect, useState } from 'react';
import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import PointsButton from '@/components/Buttons/PointsButton';
import RoundedButton from '@/components/Buttons/RoundedButton';
import Formulario from '@/components/Forms/ContactsForms';
import { CirclePlus } from 'lucide-react';
import { ReactNode } from 'react';

interface ContactFormData {
  name: string;
  lastName: string;
  enterprise: string;
  phone: string;
  email: string;
}

interface EnterpriseFormData {
  name: string;
  industry: string;
  description: string;
  webpageUrl: string;
}

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

const ContactPage = () => {
  const contactHeaders = ["#", "Name(s)", "Last Name", "Enterprise", "Status", "Phone Number", "E-mail", ""];
  const [contactData, setContactData] = useState<ContactRow[]>([]); // Use ContactRow type
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'contact' | 'enterprise'>('contact');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contacts/1");
        const data: ContactFromAPI[] = await res.json();

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
            actions: <PointsButton key={`points-${index}`} />
          };
        });

        setContactData(transformed);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  const handleNewContact = async (data: ContactFormData | EnterpriseFormData) => {
    if (formType === 'contact') {
      const contact = data as ContactFormData;

      const contactDataToSend = {
        name: contact.name,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phone,
        nameEnterprise: contact.enterprise, // Asegúrate de que este campo sea el que corresponde
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

        // Si la respuesta es exitosa, agregar el nuevo contacto a la lista
        const newContact: ContactRow = {
          id: contactData.length + 1,
          name: contact.name,
          lastName: contact.lastName,
          enterprise: contact.enterprise,
          status: <LabelOval key={`status-new`} color="green" data="Active" />,
          phone: contact.phone,
          email: contact.email,
          actions: <PointsButton key={`points-new`} />
        };

        setContactData([...contactData, newContact]);
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
      <h1 className="font-bold text-3xl mb-5">Contacts List</h1>
      <CustomTable headers={contactHeaders} data={contactDataForTable} color="green" />

      {showForm && (
        <Formulario 
          onClose={() => setShowForm(false)} 
          onSubmit={handleNewContact}
          onFormTypeChange={(type) => setFormType(type as 'contact' | 'enterprise')}
        />
      )}

      <div className="fixed bottom-6 right-6">
        <div 
          onClick={() => {
            setShowForm(true);
            setFormType('contact');
          }} 
          className='cursor-pointer'
        >
          <RoundedButton 
            color="green" 
            text="New Contact" 
            Icon={CirclePlus}
          />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
