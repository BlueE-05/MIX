'use client'
<<<<<<< HEAD

import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { SaleFormData, Article } from '@/types/Sales';
=======
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
//endpoint
import { HTTPURL } from '@/constants/utils';

// Interfaces (mantenlas fuera del componente)
interface SaleFormData {
  contact: string;
  status: string;
  items: {
    article: string;
    quantity: number;
    price: number;
  }[];
}

interface SaleData {
  idcont: number;
  idphase: number;
  products: {
    idprod: string;
    quant: number;
  }[];
}
>>>>>>> origin/pruebanewmerge_sales_report

interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: SaleFormData) => void;
}

<<<<<<< HEAD
export default function Formulario({ onClose, onSubmit }: FormularioProps) {
=======
interface Contact {
  FullName: string;
  IDContact: number;
}

interface Producto {
  NombreArticulo: string;
  IDProd: string;  
  Price?: number; 
}

interface Phase {
  Name: string;
  IDPhase: number;
}

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose?: () => void;
}

// Componente Notification (fuera del componente principal)
const Notification = ({ message, type, onClose }: NotificationProps) => {
  const bgColor = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700'
  };

  return (
    <div className={`fixed top-4 right-4 border-l-4 p-4 rounded shadow-lg ${bgColor[type]} min-w-64 z-50`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-lg font-semibold">
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default function Formulario({ onClose, onSubmit }: FormularioProps) {
  // Estados
>>>>>>> origin/pruebanewmerge_sales_report
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [items, setItems] = useState<{article: string, quantity: number, price: number}[]>([
    { article: '', quantity: 1, price: 0 }
  ]);
<<<<<<< HEAD

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
=======
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [products, setProducts] = useState<Producto[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [loadingPhases, setLoadingPhases] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'warning'} | null>(null);

  // Efectos para cargar datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar contactos
        const contactsRes = await fetch(`${HTTPURL}/newsale/ContactsByUser`);
        if (!contactsRes.ok) throw new Error('Error loading contacts');
        setContacts(await contactsRes.json());

        // Cargar productos
        const productsRes = await fetch(`${HTTPURL}/newsale/AllProd`);
        if (!productsRes.ok) throw new Error('Error loading products');
        setProducts(await productsRes.json());

        // Cargar fases
        const phasesRes = await fetch(`${HTTPURL}/newsale/Phases`);
        if (!phasesRes.ok) throw new Error('Error loading phases');
        setPhases(await phasesRes.json());

      } catch (error) {
        console.error('Error loading data:', error);
        showNotification('Error loading data', 'error');
      } finally {
        setLoadingContacts(false);
        setLoadingProducts(false);
        setLoadingPhases(false);
      }
    };

    fetchData();
  }, []);

  // Mostrar notificación
  const showNotification = (message: string, type: 'success' | 'error' | 'warning') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Manejar envío del formulario
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validaciones
      if (!selectedContact || !selectedStatus) {
        showNotification('Please select both contact and phase', 'warning');
        return;
      }

      // Obtener ID de contacto
      const contactId = parseInt(selectedContact.split('-')[1]);
      if (isNaN(contactId)) {
        showNotification('Invalid contact format', 'error');
        return;
      }

      // Obtener ID de fase
      const selectedPhase = phases.find(phase => phase.Name === selectedStatus);
      if (!selectedPhase) {
        showNotification('Invalid phase selected', 'error');
        return;
      }
      const phaseId = selectedPhase.IDPhase;

      // Preparar productos
      const productsToSend = items
        .filter(item => item.article.trim() !== '')
        .map(item => {
          const product = products.find(
            p => p.NombreArticulo.trim().toLowerCase() === item.article.trim().toLowerCase()
          );
          if (!product) throw new Error(`Product not found: ${item.article}`);
          return {
            idprod: product.IDProd,
            quant: item.quantity
          };
        });

      if (productsToSend.length === 0) {
        showNotification('Please add at least one product', 'warning');
        return;
      }

      // Crear objeto de venta
      const saleData: SaleData = {
        idcont: contactId,
        idphase: phaseId,
        products: productsToSend
      };

      // Enviar al backend
      const response = await fetch(`${HTTPURL}/newsale/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating sale');
      }

      const result = await response.json();
      showNotification('Sale created successfully!', 'success');
      
      // Cerrar formulario después de 1 segundo
      setTimeout(() => {
        onSubmit({
          contact: selectedContact,
          status: selectedStatus,
          items: items.filter(item => item.article.trim() !== '')
        });
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Error creating sale:', error);
      
    } finally {
      setIsSubmitting(false);
    }
>>>>>>> origin/pruebanewmerge_sales_report
  };

  const handleAddItem = () => {
    setItems([...items, { article: '', quantity: 1, price: 0 }]);
  };

<<<<<<< HEAD
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
=======
  const handleArticleChange = async (index: number, articleName: string) => {
  const newItems = [...items];
  
  // Resetear el item si se selecciona opción vacía
  if (!articleName) {
    newItems[index] = { article: '', quantity: 1, price: 0 };
    setItems(newItems);
    return;
  }

  try {
    // Buscar el producto
    const selectedProduct = products.find(prod => 
      prod.NombreArticulo.trim().toLowerCase() === articleName.trim().toLowerCase()
    );

    if (!selectedProduct) {
      console.error("Producto no encontrado:", articleName);
      newItems[index] = { ...newItems[index], article: articleName, price: 0 };
      setItems(newItems);
      return;
    }
    
    // Obtener precio
    const response = await fetch(`${HTTPURL}/newsale/ProdPrice/${selectedProduct.IDProd}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const priceData = await response.json();
    let price = 0;
    
    if (Array.isArray(priceData) && priceData.length > 0) {
      price = priceData[0].Price || 0;
    } else if (typeof priceData === 'object' && priceData !== null) {
      price = priceData.price || priceData.Price || 0;
    }
    
    // Actualizar solo el item modificado
    newItems[index] = {
      article: articleName,
      quantity: newItems[index].quantity,
      price: price
    };

    setItems(newItems);
  } catch (error) {
    console.error('Error al obtener precio:', error);
    newItems[index] = { ...newItems[index], article: articleName, price: 0 };
    setItems(newItems);
  }
};

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...items];
    const newQuantity = quantity > 0 ? quantity : 1;
    
    newItems[index] = {
      ...newItems[index],
      quantity: newQuantity,
>>>>>>> origin/pruebanewmerge_sales_report
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
<<<<<<< HEAD
=======
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
  
>>>>>>> origin/pruebanewmerge_sales_report
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
<<<<<<< HEAD

=======
  
>>>>>>> origin/pruebanewmerge_sales_report
        {/* Contact Information Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                Contact *
              </label>
<<<<<<< HEAD
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

=======
              {loadingContacts ? (
                <p>Loading contacts...</p>
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
                    <option key={index} value={`${contact.FullName}-${contact.IDContact}`}>
                      {contact.FullName}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
  
>>>>>>> origin/pruebanewmerge_sales_report
        {/* Articles Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Articles</h3>
          
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
              <div>
                <label htmlFor={`article-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Article {index + 1}
                </label>
<<<<<<< HEAD
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

=======
                {loadingProducts ? (
                  <p>Loading products...</p>
                ) : (
                  <select
                    id={`article-${index}`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={item.article}
                    onChange={(e) => handleArticleChange(index, e.target.value)}
                  >
                    <option value="">Select article</option>
                    {products.map((product, productIndex) => (
                      <option key={productIndex} value={product.NombreArticulo}>
                        {product.NombreArticulo}
                      </option>
                    ))}
                  </select>
                )}
              </div>
  
>>>>>>> origin/pruebanewmerge_sales_report
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
<<<<<<< HEAD

=======
  
>>>>>>> origin/pruebanewmerge_sales_report
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
<<<<<<< HEAD

=======
  
>>>>>>> origin/pruebanewmerge_sales_report
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
<<<<<<< HEAD

=======
  
>>>>>>> origin/pruebanewmerge_sales_report
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Another Article
          </button>
        </div>
<<<<<<< HEAD

=======
  
>>>>>>> origin/pruebanewmerge_sales_report
        {/* Status Section */}
        <div className="mb-8">
          <div className="w-full md:w-1/3">
            <label htmlFor="saleStatus" className="block text-sm font-medium text-gray-700 mb-1">
              Sale Status *
            </label>
<<<<<<< HEAD
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
=======
            {loadingPhases ? (
              <p>Loading phases...</p>
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
  
        {/* Footer with Submit button */}
>>>>>>> origin/pruebanewmerge_sales_report
        <div className="flex justify-end border-t pt-6">
          <button
            type="button"
            onClick={handleSubmit}
<<<<<<< HEAD
            className="px-6 py-2 bg-[#4209B0] text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Done
=======
            disabled={isSubmitting}
            className={`px-6 py-2 bg-[#4209B0] text-white font-medium rounded-lg hover:bg-green-700 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Complete Sale'
            )}
>>>>>>> origin/pruebanewmerge_sales_report
          </button>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======

  
}
>>>>>>> origin/pruebanewmerge_sales_report
