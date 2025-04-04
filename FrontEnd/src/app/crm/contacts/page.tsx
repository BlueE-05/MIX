'use client'

import CustomTable from '@/components/Tables/CustomTable';
import LabelOval from '@/components/Buttons/LabelOval';
import PointsButton from '@/components/Buttons/PointsButton';
import RoundedButton from '@/components/Buttons/RoundedButton';
import { CirclePlus } from 'lucide-react';

const ContactPage = () => {
const contactHeaders = ["#", "Name(s)", "Last Name", "Enterprise", "Status", "Phone Number", "E-mail", ""];

{/**Data random para rellenar la tabla **/}
const firstNames = ["John", "Alice", "Michael", "Sophie", "Daniel", "Emma", "David", "Olivia"];
const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Harris", "Clark"];
const enterprises = ["Acme Inc.", "Globex Corp.", "Initech", "Cyberdyne", "Umbrella Corp."];

const contactData = Array.from({ length: 25 }, (_, i) => {
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
    <LabelOval color={statusColors[statusIndex]} data={statusOptions[statusIndex]} />,
    `+1 555-${String(1000 + i).slice(-4)}-${String(1000 + (i * 3)).slice(-4)}`,
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${enterprise.toLowerCase().replace(/\s+/g, '')}.com`,
    <PointsButton />,
  ];
});

  return (
    <main className="min-h-screen p-6">
      <h1 className="font-bold text-3xl mb-5">Contacts List</h1>
      <CustomTable headers={contactHeaders} data={contactData} color="green"/>
      <div className="fixed bottom-6 right-6">
        <RoundedButton color="green" text="New Contact" Icon={CirclePlus} link="/crm/contacts/newcontact"/>
      </div>
    </main>
  );
};

export default ContactPage;