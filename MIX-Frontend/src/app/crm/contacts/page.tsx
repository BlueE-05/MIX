'use client'
import { useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';
<<<<<<< HEAD

import { ContactReceive } from '@/types/ContactTypes';
import { fetchContacts } from '@/hooks/contacts/fetchContacts';
=======
>>>>>>> origin/pruebanewmerge_sales_report

import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import RoundedButton from '@/components/Buttons/RoundedButton';
<<<<<<< HEAD
import { CirclePlus, LoaderCircle } from 'lucide-react';

import Formulario from '@/components/Forms/ContactsForms';
import ContactDetailCard from '@/components/Cards/Tables/ContactDetailCard'


=======
import Formulario, { ContactData, EnterpriseData } from '@/components/Forms/ContactsForms';
import { CirclePlus } from 'lucide-react';

import ContactDetailCard from '@/components/Cards/Tables/ContactDetailCard'

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
>>>>>>> origin/pruebanewmerge_sales_report

export default function ContactPage() {
  const contactHeaders = ["#", "Name(s)", "Last Name", "Enterprise", "Status", "Phone Number", "E-mail", ""];

<<<<<<< HEAD
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'contact' | 'enterprise'>('contact');
  const [selectedContact, setSelectedContact] = useState<ContactReceive | null>(null);
  const [tableData, setTableData] = useState<ReactNode[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Method to transform ContactReceive to ReactNode[][] for table display
  const transformToTableData = useCallback((contacts: ContactReceive[]): ReactNode[][] => {
    return contacts.map((contact, index) => [
      index + 1,
      contact.Name,
      contact.LastName,
      contact.EnterpriseName,
      <LabelOval key={`status-${contact.ID}`} data={contact.Status ? "Active" : "Inactive"} color={contact.Status ? "green" : "red"} />,
      contact.PhoneNumber,
      contact.Email,
      <ArrowRightButton key={`arrow-${contact.ID}`} onClick={() => setSelectedContact(contact)} aria-label={`View details of ${contact.Name} ${contact.LastName}`} />
    ]);
  }, []);

  // Load contacts and transform to view model
  const loadContacts = useCallback(async (searchTerm?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const contacts = await fetchContacts(searchTerm);
      setTableData(transformToTableData(contacts));
    } catch (error) {
      setError(`Failed to load contacts. Please try again later. Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [transformToTableData]);

  // if search term is provided, load contacts with that term
  const handleSearch = useCallback((searchTerm: string) => {
    loadContacts(searchTerm);
  }, [loadContacts]);

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);
=======
  const [contactData, setContactData] = useState<ContactRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'contact' | 'enterprise'>('contact');
  const [selectedContact, setSelectedContact] = useState<ContactRow | null>(null)


  const fetchContacts = useCallback(async (searchTerm?: string) => {
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
  }, []);

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
        actions: <ArrowRightButton color='green'
                  key={`arrow-${index}`} 
                  onClick={() => {
                    setSelectedContact({
                      id: contact.ID,
                      name: contact.Name,
                      lastName: contact.LastName,
                      enterprise: contact.EnterpriseName,
                      status: status,
                      phone: contact.PhoneNumber,
                      email: contact.Email,
                      actions: <ArrowRightButton />
                    });
                  }}
                />
      };
    });

    setContactData(transformed);
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

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

  // Convert ContactRow[] to ReactNode[][] const contactDataForTable: ReactNode[][] = contactData.map(contact => [
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

>>>>>>> origin/pruebanewmerge_sales_report

  return (
    <main className="min-h-screen p-6">
      {/* Title of the page */}
<<<<<<< HEAD
      <div className="flex justify-between items-center mb-5 mr-5">
        <h1 className="font-bold text-3xl">Contacts List</h1>
        {isLoading && <LoaderCircle className="animate-spin text-stone-900" />}
      </div>


      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {/* Table of contacts */}
      <CustomTable
        headers={contactHeaders}
        data={tableData}
        color="green"
        includeSearch={true}
        onSearch={handleSearch}
      />  

      {/* Form to add new contact or enterprise */}
      {showForm && (
        <Formulario
          onClose={() => { setShowForm(false); loadContacts(); }}
          onFormTypeChange={(type) => setFormType(type as 'contact' | 'enterprise')}
          formType={formType}
        />
      )}

      {/* Button to add new contact */}
      <div className="fixed bottom-6 right-6">
        <div onClick={() => { setShowForm(true); setFormType('contact'); }} className='cursor-pointer'>
          <RoundedButton color="green" text="New Contact" Icon={CirclePlus} />
        </div>
      </div>

      {/* Contact detail card */}
      {selectedContact && (
        <ContactDetailCard
          contact={selectedContact}
          onClose={() => { setSelectedContact(null); loadContacts(); setShowForm(false); }}
          editButtonText="Edit Contact"
          closeButtonText="Close"
        />
      )}
    </main>
  );
}
=======
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

      {/* Tarjeta de detalles del contacto */}
      {selectedContact && (
        <ContactDetailCard
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          editButtonText="Editar Contacto"
          closeButtonText="Cerrar"
        />
      )}

    </main>
  );
};

/*

  const mockContacts: ContactRow[] = [
    {
      id: 1,
      name: "John",
      lastName: "Doe",
      enterprise: "Tech Solutions Inc.",
      status: <LabelOval color="green" data="Active" />,
      phone: "+1 555-123-4567",
      email: "john.doe@techsolutions.com",
      actions: <ArrowRightButton color='green' onClick={() => setSelectedContact(mockContacts[0])} />
    },
    {
      id: 2,
      name: "Jane",
      lastName: "Smith",
      enterprise: "Innovate Corp",
      status: <LabelOval color="red" data="Inactive" />,
      phone: "+1 555-987-6543",
      email: "jane.smith@innovate.com",
      actions: <ArrowRightButton color='green' onClick={() => setSelectedContact(mockContacts[1])} />
    },
    {
      id: 3,
      name: "Robert",
      lastName: "Johnson",
      enterprise: "Digital Futures",
      status: <LabelOval color="green" data="Active" />,
      phone: "+1 555-456-7890",
      email: "robert.j@digitalfutures.com",
      actions: <ArrowRightButton color='green' onClick={() => setSelectedContact(mockContacts[2])} />
    },
    {
      id: 4,
      name: "Emily",
      lastName: "Williams",
      enterprise: "Cloud Networks",
      status: <LabelOval color="green" data="Active" />,
      phone: "+1 555-789-0123",
      email: "emily.w@cloudnet.com",
      actions: <ArrowRightButton color='green' onClick={() => setSelectedContact(mockContacts[3])} />
    },
    {
      id: 5,
      name: "Michael",
      lastName: "Brown",
      enterprise: "Data Systems",
      status: <LabelOval color="red" data="Inactive" />,
      phone: "+1 555-234-5678",
      email: "michael.b@datasystems.com",
      actions: <ArrowRightButton color='green' onClick={() => setSelectedContact(mockContacts[4])} />
    }
  ];

*/
>>>>>>> origin/pruebanewmerge_sales_report
