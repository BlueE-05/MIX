'use client'
import { useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';

import { ContactRecieve, ContactView, ContactData } from '@/types/ContactTypes';
import { fetchContacts } from '@/hooks/contacts/fetchContacts';

import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import ArrowRightButton from "@/components/Buttons/ArrowRightButton";
import RoundedButton from '@/components/Buttons/RoundedButton';
import { CirclePlus } from 'lucide-react';

import Formulario from '@/components/Forms/ContactsForms';
import ContactDetailCard from '@/components/Cards/Tables/ContactDetailCard'



export default function ContactPage() {
  const contactHeaders = ["#", "Name(s)", "Last Name", "Enterprise", "Status", "Phone Number", "E-mail", ""];

  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'contact' | 'enterprise'>('contact');
  const [selectedContact, setSelectedContact] = useState<ContactRecieve | null>(null);
  const [tableData, setTableData] = useState<ReactNode[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Method to transform ContactRecieve to ReactNode[][] for table display
  const transformToTableData = useCallback((contacts: ContactRecieve[]): ReactNode[][] => {
    return contacts.map((contact, index) => [
      index + 1,
      contact.Name,
      contact.LastName,
      contact.EnterpriseName,
      <LabelOval data={contact.Status ? "Active" : "Inactive"} color={contact.Status ? "green" : "red"} />,
      contact.PhoneNumber,
      contact.Email,
      <ArrowRightButton onClick={() => setSelectedContact(contact)} aria-label={`View details of ${contact.Name} ${contact.LastName}`} />
    ]);
  }, []);

  // Load contacts and transform to view model
  const loadContacts = useCallback(async (searchTerm?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const contacts = await fetchContacts(searchTerm);
      setTableData(transformToTableData(contacts));
    } catch (err) {
      setError("Failed to load contacts. Please try again later.");
      console.error("Error loading contacts:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // if search term is provided, load contacts with that term
  const handleSearch = useCallback((searchTerm: string) => {
    loadContacts(searchTerm);
  }, [loadContacts]);

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return (
    <main className="min-h-screen p-6">
      {/* Title of the page */}
      <h1 className="font-bold text-3xl mb-5">Contacts List</h1>

      {isLoading && <div className="text-center py-4">Loading contacts...</div>}
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