'use client'

import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

interface SaleFormData {
  contact: string;
  status: string;
  items: {
    article: string;
    quantity: number;
    price: number;
  }[];
}

interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: SaleFormData) => void;
}

interface Article {
  id: string;
  name: string;
  price: number;
}

export default function Formulario({ onClose, onSubmit }: FormularioProps) {
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [items, setItems] = useState<{article: string, quantity: number, price: number}[]>([
    { article: '', quantity: 1, price: 0 }
  ]);

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

  const articleOptions: Article[] = [
    { id: '1', name: 'Laptop', price: 999.99 },
    { id: '2', name: 'Smartphone', price: 699.99 },
    { id: '3', name: 'Monitor', price: 249.99 },
    { id: '4', name: 'Keyboard', price: 49.99 },
    { id: '5', name: 'Mouse', price: 29.99 },
  ];

  const handleSubmit = () => {
    const formData: SaleFormData = {
      contact: selectedContact,
      status: selectedStatus,
      items: items.filter(item => item.article !== '') // Filter out empty items
    };
    onSubmit(formData);
  };

  const handleAddItem = () => {
    setItems([...items, { article: '', quantity: 1, price: 0 }]);
  };

  const handleArticleChange = (index: number, articleId: string) => {
    const newItems = [...items];
    const selectedArticle = articleOptions.find(a => a.id === articleId);
    
    newItems[index] = {
      ...newItems[index],
      article: articleId,
      price: selectedArticle ? selectedArticle.price * newItems[index].quantity : 0
    };
    
    setItems(newItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...items];
    const article = articleOptions.find(a => a.id === newItems[index].article);
    
    newItems[index] = {
      ...newItems[index],
      quantity: quantity > 0 ? quantity : 1,
      price: article ? article.price * (quantity > 0 ? quantity : 1) : 0
    };
    
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
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

        {/* Articles Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Articles</h3>
          
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
              <div>
                <label htmlFor={`article-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Article {index + 1}
                </label>
                <select
                  id={`article-${index}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={item.article}
                  onChange={(e) => handleArticleChange(index, e.target.value)}
                >
                  <option value="">Select article</option>
                  {articleOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                />
              </div>

              <div>
                <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  id={`price-${index}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  value={`$${item.price.toFixed(2)}`}
                  readOnly
                />
              </div>

              {items.length > 1 && (
                <div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddItem}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Another Article
          </button>
        </div>

        {/* Status Section */}
        <div className="mb-8">
          <div className="w-full md:w-1/3">
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
            className="px-6 py-2 bg-[#4209B0] text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
