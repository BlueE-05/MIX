'use client'
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

// Define la interfaz para los datos del formulario
interface SaleFormData {
  contact: string;
  status: string;
  items: {
    article: string;
    quantity: number;
    price: number;
  }[];
}

//Trasnformar los datos del formulario a lo esperado en el backend
interface SaleData {
  idcont: number;
  idphase: number;
  products: {
    idprod: string;
    quant: number;
  }[];
}

// Define las props del componente
interface FormularioProps {
  onClose: () => void;
  onSubmit: (data: SaleFormData) => void;
}

interface Article {
  id: string;
  name: string;
  price: number;
}

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

export default function Formulario({ onClose, onSubmit }: FormularioProps) {
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [items, setItems] = useState<{article: string, quantity: number, price: number}[]>([
    { article: '', quantity: 1, price: 0 }
  ]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [products, setProducts] = useState<Producto[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loadingContacts, setLoadingContacts] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [loadingPhases, setLoadingPhases] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');



  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`http://localhost:3002/newsale/ContactsByUser`);
        if (!response.ok) {
          throw new Error('Error al obtener los contactos');
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoadingContacts(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3002/newsale/AllProd');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchPhases = async () => {
      try {
        const response = await fetch('http://localhost:3002/newsale/Phases');
        if (!response.ok) {
          throw new Error('Error al obtener las fases');
        }
        const data = await response.json();
        setPhases(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoadingPhases(false);
      }
    };

    fetchContacts();
    fetchProducts();
    fetchPhases();
  }, []);

  const handleSubmit = async () => {
    try {
      // Verificaciones básicas
      if (!selectedContact || !selectedStatus) {
        alert('Por favor selecciona tanto el contacto como la fase');
        return;
      }
  
      // Extraer IDContact
      const contactParts = selectedContact.split('-');
      if (contactParts.length < 2) {
        alert('Formato de contacto inválido');
        return;
      }
      const contactId = parseInt(contactParts[1]);
      
      // Obtener ID de la fase
      const selectedPhase = phases.find(phase => phase.Name === selectedStatus);
      if (!selectedPhase) {
        alert('Fase seleccionada inválida');
        return;
      }
      const phaseId = selectedPhase.IDPhase;
  
      // Preparar los productos - AQUÍ ESTÁ EL CAMBIO PRINCIPAL
      const productsToSend = items
        .filter(item => item.article.trim() !== '') // Filtrar items vacíos
        .map(item => {
          // Buscar producto insensible a mayúsculas/espacios
          const selectedProduct = products.find(
            prod => prod.NombreArticulo.trim().toLowerCase() === item.article.trim().toLowerCase()
          );
          
          if (!selectedProduct) {
            throw new Error(`Producto no encontrado: ${item.article}`);
          }
  
          return {
            idprod: selectedProduct.IDProd,
            quant: item.quantity
          };
        });
  
      // Validar que haya al menos un producto
      if (productsToSend.length === 0) {
        alert('Por favor agrega al menos un producto');
        return;
      }
  
      // Crear el objeto de venta
      const saleData = {
        idcont: contactId,
        idphase: phaseId,
        products: productsToSend
      };
  
      console.log('Datos a enviar:', saleData); // Para depuración
  
      // Enviar al endpoint
      const response = await fetch('http://localhost:3002/newsale/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Venta creada exitosamente:', result);
      onSubmit(result); // Si es necesario
      onClose(); // Cerrar el formulario
      
    } catch (error) {
      console.error('Error al crear venta:', error);
      alert(`Error al crear venta`);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { article: '', quantity: 1, price: 0 }]);
  };

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
      const response = await fetch(`http://localhost:3002/newsale/ProdPrice/${selectedProduct.IDProd}`);
      
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

        {/* Articles Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Articles</h3>
          
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
              <div>
                <label htmlFor={`article-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Article {index + 1}
                </label>
                {loadingProducts ? (
                  <p>Laoding products...</p>
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