'use client'
import { useState } from 'react';
import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import PointsButton from '@/components/Buttons/PointsButton';
import RoundedButton from '@/components/Buttons/RoundedButton';
import Formulario from '@/components/Forms/ContactsForms';
import { CirclePlus } from 'lucide-react';

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

const ContactPage = () => {
  const contactHeaders = ["#", "Name(s)", "Last Name", "Enterprise", "Status", "Phone Number", "E-mail", ""];
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'contact' | 'enterprise'>('contact');

  // Data random para rellenar la tabla
  const firstNames = ["John", "Alice", "Michael", "Sophie", "Daniel", "Emma", "David", "Olivia"];
  const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Harris", "Clark"];
  const enterprises = ["Acme Inc.", "Globex Corp.", "Initech", "Cyberdyne", "Umbrella Corp."];

  const [contactData, setContactData] = useState(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      const enterprise = enterprises[i % enterprises.length];
      const statusOptions = ["Active", "Pending", "Inactive"];
      const statusColors = ["green", "blue", "red"];
      const statusIndex = i % 3;
      
      return [
        i + 1,
        firstName,
        lastName,
        enterprise,
        <LabelOval key={`status-${i}`} color={statusColors[statusIndex]} data={statusOptions[statusIndex]} />,
        `+1 555-${String(1000 + i).slice(-4)}-${String(1000 + (i * 3)).slice(-4)}`,
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${enterprise.toLowerCase().replace(/\s+/g, '')}.com`,
        <PointsButton key={`points-${i}`} />,
      ];
    });
  });

  const handleNewContact = (data: ContactFormData | EnterpriseFormData) => {
    if (formType === 'contact') {
      const contact = data as ContactFormData;
      const newContact = [
        contactData.length + 1,
        contact.name,
        contact.lastName,
        contact.enterprise,
        <LabelOval key={`status-new`} color="green" data="Active" />,
        contact.phone,
        contact.email,
        <PointsButton key={`points-new`} />
      ];
      setContactData([...contactData, newContact]);
    } else {
      // Lógica para agregar nueva empresa si es necesario
      console.log('New enterprise:', data);
    }
    setShowForm(false);
  };

  return (
    <main className="min-h-screen p-6">
      <h1 className="font-bold text-3xl mb-5">Contacts List</h1>
      <CustomTable headers={contactHeaders} data={contactData} color="green"/>

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