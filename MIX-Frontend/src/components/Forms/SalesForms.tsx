'use client'

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define la interfaz para los datos del formulario
interface SaleFormData {
  contact: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
}

// Define las props del componente
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

  const handleSubmit = () => { // Se cambiara con la conexion a la BD
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
        {/* Header with close button */}
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

        {/* Contact Information Section */}
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

        {/* Dates and Status Section */}
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

        {/* Footer with Done button */}
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