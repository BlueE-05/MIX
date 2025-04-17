/*
'use client'

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Constantes de configuración
const USER_ID = 1;
const API_BASE_URL = 'http://localhost:3001/newsale';

// Interfaces
interface SaleFormData {
  contact: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface Phase {
  Name: string;
}

interface Contact {
  FullName: string;
}

interface ContactInfo {
  Email: string;
  EnterpriseName: string;
  PhoneNumber: string;
}

interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: SaleFormData) => void;
}

export default function Formulario({ onClose, onSubmit }: FormularioProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [phases, setPhases] = useState<Phase[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState({
    phases: true,
    contacts: true,
    contactInfo: false
  });
  const [error, setError] = useState({
    phases: null as string | null,
    contacts: null as string | null,
    contactInfo: null as string | null
  });

  // Cargar datos iniciales
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Cargar fases
        const phasesResponse = await fetch(`${API_BASE_URL}/Phases`);
        if (!phasesResponse.ok) throw new Error(`Error en fases: ${phasesResponse.status}`);
        const phasesData = await phasesResponse.json();
        setPhases(phasesData);
        
        // Cargar contactos
        const contactsResponse = await fetch(`${API_BASE_URL}/ContactsByUser/${USER_ID}`);
        if (!contactsResponse.ok) throw new Error(`Error en contactos: ${contactsResponse.status}`);
        const contactsData = await contactsResponse.json();
        setContacts(contactsData);
      } catch (err) {
        const error = err as Error;
        if (error.message.includes('fases')) {
          setError(prev => ({ ...prev, phases: 'Error al cargar las fases' }));
        } else {
          setError(prev => ({ ...prev, contacts: 'Error al cargar los contactos' }));
        }
        console.error("Error fetching data:", error);
      } finally {
        setLoading(prev => ({ ...prev, phases: false, contacts: false }));
      }
    };

    fetchInitialData();
  }, []);

  
  useEffect(() => {
    if (!selectedContact) {
      setContactInfo(null);
      return;
    }

    const fetchContactInfo = async () => {
      try {
        setLoading(prev => ({ ...prev, contactInfo: true }));
        setError(prev => ({ ...prev, contactInfo: null }));
        
        const response = await fetch(
          `${API_BASE_URL}/ContactInfo/${USER_ID}/${encodeURIComponent(selectedContact)}`
        );
        
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        const data = await response.json();
        if (data.length > 0) {
          setContactInfo(data[0]);
        } else {
          setContactInfo(null);
        }
      } catch (err) {
        setError(prev => ({ ...prev, contactInfo: 'Error al cargar la información del contacto' }));
        console.error("Error fetching contact info:", err);
      } finally {
        setLoading(prev => ({ ...prev, contactInfo: false }));
      }
    };

    fetchContactInfo();
  }, [selectedContact]);

  const handleSubmit = () => {
    const formData: SaleFormData = {
      contact: selectedContact,
      status: selectedStatus,
      startDate,
      endDate
    };
    onSubmit(formData);
  };

  const isLoading = loading.phases || loading.contacts;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-xl shadow-md">
        
      <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">New Sale</h2>
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

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact *
              </label>
              {loading.contacts ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                  Cargando contactos...
                </div>
              ) : error.contacts ? (
                <div className="text-red-500 text-sm">{error.contacts}</div>
              ) : (
                <select 
                  id="contact" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={selectedContact}
                  onChange={(e) => setSelectedContact(e.target.value)}
                  required
                >
                  <option value="">Select contact</option>
                  {contacts.map((contact, index) => (
                    <option key={index} value={contact.FullName}>
                      {contact.FullName}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-2">
              {loading.contactInfo ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              ) : error.contactInfo ? (
                <div className="text-red-500 text-sm">{error.contactInfo}</div>
              ) : contactInfo ? (
                <>
                  <p className="text-gray-700">
                    <span className="font-medium">E-Mail:</span>{' '}
                    <a href={`mailto:${contactInfo.Email}`} className="text-blue-600 hover:underline">
                      {contactInfo.Email}
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Phone Number:</span> {contactInfo.PhoneNumber}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Enterprise:</span> {contactInfo.EnterpriseName}
                  </p>
                </>
              ) : (
                <div className="text-gray-400 italic">Seleccione un contacto para ver su información</div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Day *
            </label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expected End Day *
            </label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="saleStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Sale Status *
            </label>
            {loading.phases ? (
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                Loading phases...
              </div>
            ) : error.phases ? (
              <div className="text-red-500 text-sm">{error.phases}</div>
            ) : (
              <select 
                id="saleStatus" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                required
              >
                <option value="">Select status</option>
                {phases.map((phase, index) => (
                  <option key={index} value={phase.Name}>
                    {phase.Name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Done'}
          </button>
        </div>
        

      </div>
    </div>
  );
}
*/


'use client'

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const USER_ID = 1;

interface SaleFormData {
  contact: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface Phase {
  Name: string;
}

interface Contact {
  FullName: string;
}

interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: SaleFormData) => void;
}

export default function Formulario({ onClose, onSubmit }: FormularioProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [phases, setPhases] = useState<Phase[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState({
    phases: true,
    contacts: true
  });
  const [error, setError] = useState({
    phases: null as string | null,
    contacts: null as string | null
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const phasesResponse = await fetch('http://localhost:3001/newsale/Phases');
        if (!phasesResponse.ok) throw new Error(`Error phases: ${phasesResponse.status}`);
        const phasesData = await phasesResponse.json();
        setPhases(phasesData);
        setLoading(prev => ({ ...prev, phases: false }));
        
      
        const contactsResponse = await fetch(`http://localhost:3001/newsale/ContactsByUser/${USER_ID}`);
        if (!contactsResponse.ok) throw new Error(`Error contacts: ${contactsResponse.status}`);
        const contactsData = await contactsResponse.json();
        setContacts(contactsData);
        setLoading(prev => ({ ...prev, contacts: false }));
      } catch (err) {
        const error = err as Error;
        if (error.message.includes('fases')) {
          setError(prev => ({ ...prev, phases: 'Error loading phases' }));
          setLoading(prev => ({ ...prev, phases: false }));
        } else {
          setError(prev => ({ ...prev, contacts: 'Error loading contacts' }));
          setLoading(prev => ({ ...prev, contacts: false }));
        }
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    const formData: SaleFormData = {
      contact: selectedContact,
      status: selectedStatus,
      startDate,
      endDate
    };
    onSubmit(formData);
  };

  
  const isLoading = loading.phases || loading.contacts;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-xl shadow-md">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">New Sale</h2>
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

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact *
              </label>
              {loading.contacts ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                  Loading contacts...
                </div>
              ) : error.contacts ? (
                <div className="text-red-500 text-sm">{error.contacts}</div>
              ) : (
                <select 
                  id="contact" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={selectedContact}
                  onChange={(e) => setSelectedContact(e.target.value)}
                  required
                >
                  <option value="">Select contact</option>
                  {contacts.map((contact, index) => (
                    <option key={index} value={contact.FullName}>
                      {contact.FullName}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">E-Mail:</span>{' '}
                <a href="mailto:Contact@Company.Com" className="text-blue-600 hover:underline">
                  Contact@Company.Com
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone Number:</span> 555-454-987
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Enterprise:</span> Company Co.
              </p>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Day *
            </label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expected End Day *
            </label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="saleStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Sale Status *
            </label>
            {loading.phases ? (
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 animate-pulse">
                Loading phases...
              </div>
            ) : error.phases ? (
              <div className="text-red-500 text-sm">{error.phases}</div>
            ) : (
              <select 
                id="saleStatus" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                required
              >
                <option value="">Select status</option>
                {phases.map((phase, index) => (
                  <option key={index} value={phase.Name}>
                    {phase.Name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}



/* //ORIGINAL
'use client'

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface SaleFormData {
  contact: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
}


interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: SaleFormData) => void;
}

export default function Formulario({ onClose, onSubmit }: FormularioProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const contactOptions = [
    { id: '1', name: 'Cecilia' },
    { id: '2', name: 'Bento' },
    { id: '3', name: 'Marta' },
  ];

  const statusOptions = [
    { id: '1', name: 'Active' },
    { id: '2', name: 'Acepted' },
    { id: '3', name: 'Cancelled' },
  ];

  const handleSubmit = () => { 
    const formData: SaleFormData = {
      contact: selectedContact,
      status: selectedStatus,
      startDate,
      endDate
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-xl shadow-md">
        
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">New Sale</h2>
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

       
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact *
              </label>
              <select 
                id="contact" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={selectedContact}
                onChange={(e) => setSelectedContact(e.target.value)}
                required
              >
                <option value="">Select contact</option>
                {contactOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">E-Mail:</span>{' '}
                <a href="mailto:Contact@Company.Com" className="text-blue-600 hover:underline">
                  Contact@Company.Com
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone Number:</span> 555-454-987
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Enterprise:</span> Company Co.
              </p>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Day *
            </label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expected End Day *
            </label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="saleStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Sale Status *
            </label>
            <select 
              id="saleStatus" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              <option value="">Select status</option>
              {statusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div className="flex justify-end border-t pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

*/