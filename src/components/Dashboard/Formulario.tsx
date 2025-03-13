'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Formulario() {
  const [closeForms, setCloseForms] = useState(true);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [contactOptions, setContactOptions] = useState([
    { id: 1, name: 'Cecilia' },
    { id: 2, name: 'Bento' },
    { id: 3, name: 'Marta' },
  ]);

  const [statusOptions, setStatusOptions] = useState([
    { id: 1, name: 'Active' },
    { id: 2, name: 'Acepted' },
    { id: 3, name: 'Cancelled' },
  ]);

  if (!closeForms) return null;
  
  return (
    <main className="font-sans w-200 h-100 mx-auto p-5 bg-gray-100 rounded-lg">
      
      <div className='relative'>
        <button className="absolute top-1 right-1 hover:bg-red-500 bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
        onClick={() => setCloseForms(false)}>x</button> 
      </div>
     
      <h2 className="text-left mb-5 text-gray-800 text-2xl">New Sale</h2>
      
      <div className="mb-5 pb-3 border-b border-gray-300">
        <h3 className="text-lg mb-2 text-gray-700">Contact Information</h3>

        <div className="flex justify-between">
          <div>
            <label htmlFor="contact" className="block mb-1 font-semibold">
              Contact *
            </label>
            <select id="contact" className="p-2 rounded border border-gray-300 w-52">
              <option value="">Select one</option>
                {contactOptions.map((option) => (
            <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>
              <strong>E-Mail:</strong>{' '}
              <a >Contact@Company.Com</a>
            </p>
            <p>
              <strong>Phone Number:</strong> 555-454-987
            </p>
            <p><strong>Enterprise:</strong> Company Co.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-5">
        <div>
          <label htmlFor="saleStatus" className="block mb-1 font-semibold">Start Day *</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
            className="p-2 rounded border border-gray-300 w-40"/>
        </div>

        <div>
          <label htmlFor="saleStatus" className="block mb-1 font-semibold">Expected End Day *</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
            className="p-2 rounded border border-gray-300 w-40"/>
        </div>

        <div>
          <label htmlFor="saleStatus" className="block mb-1 font-semibold">Sale Status *</label>
          <select id="saleStatus" className="p-2 rounded border border-gray-300 w-40">
            <option value="">Select one</option>
            {statusOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="text-right">
        <button className="bg-green-500 text-white p-2 rounded cursor-pointer">
          Done
        </button>
      </div>

    </main>
  );
}