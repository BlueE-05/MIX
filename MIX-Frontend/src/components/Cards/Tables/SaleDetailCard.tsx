'use client'
import { ContactData } from '@/components/Forms/ContactsForms'
import { ChangeEvent, ReactNode, useState } from 'react'

interface Article {
  id: string;
  name: string;
  price: number;
}

interface SaleItem {
  article: string;
  quantity: number;
  price: number;
}

interface SaleDetailCardProps {
  sale: {
    id: number;
    refNumber: string;
    enterprise: string;
    amount: string;
    status: ReactNode | string;
    creationDate: string;
    items?: SaleItem[]; // Items es opcional
  };
  onClose: () => void;
  onSave?: (updatedSale: {
    id: number;
    refNumber: string;
    enterprise: string;
    amount: string;
    status: string;
    creationDate: string;
    items?: SaleItem[];
  }) => void;
  editButtonText?: string;
  closeButtonText?: string;
  saveButtonText?: string;
}

export default function SaleDetailCard({
  sale,
  onClose,
  onSave = () => {},
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save'
}: SaleDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const articleOptions: Article[] = [
    { id: '1', name: 'Laptop', price: 999.99 },
    { id: '2', name: 'Smartphone', price: 699.99 },
    { id: '3', name: 'Monitor', price: 249.99 },
    { id: '4', name: 'Keyboard', price: 49.99 },
    { id: '5', name: 'Mouse', price: 29.99 },
  ];

  // Inicializar items con un array vacío si sale.items es undefined
  const [items, setItems] = useState<SaleItem[]>(sale.items || []);

  const normalizeStatus = (status: ReactNode | string): string => {
    if (typeof status === 'string') return status;
    return 'In Progress';
  };

  // Asegurar que editedSale.items nunca sea undefined
  const [editedSale, setEditedSale] = useState({
    ...sale,
    status: normalizeStatus(sale.status),
    items: sale.items || []
  });

  const renderStatus = () => {
    const statusString = normalizeStatus(sale.status)
    const color = statusString === 'Closed' ? 'green' : 
                 statusString === 'In Progress' ? 'blue' : 'yellow'
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium 
        ${color === 'green' ? 'bg-green-100 text-green-800' :
          color === 'blue' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'}`}>
        {statusString}
      </span>
    )
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave({
      ...editedSale,
      items: items.filter(item => item.article !== '')
    });
    setIsEditing(false);
  }

  const handleCancel = () => {
    setEditedSale({
      ...sale,
      status: normalizeStatus(sale.status),
      items: sale.items || [] // Asegurar que no sea undefined
    });
    setItems(sale.items ? [...sale.items] : []); // Manejar el caso undefined
    setIsEditing(false);
  };

  const handleChange = (field: keyof typeof editedSale, value: string) => {
    setEditedSale(prev => ({
      ...prev,
      [field]: value
    }))
  }

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

  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    lastName: "",
    enterprise: "",
    phone: "",
    email: "",
  });
  
  const enterprises = ["EcoLogix", "TechNova", "AgroVida", "FinanPlus"];
  
  const handleChangeContact = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Sell {editedSale.refNumber}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="mb-4 border-b pb-2">
            <div className="flex">
              <label htmlFor="enterprise" className="block text-sm font-bold text-gray-700 mb-2">
                Enterprise
              </label>
              <span className="font-bold text-md text-red-600">*</span>
            </div>
            <select
              name="enterprise"
              value={contactData.enterprise}
              onChange={handleChangeContact}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <option value="">Select Enterprise</option>
              {enterprises.map((enterprise, index) => (
                <option key={index} value={enterprise}>
                  {enterprise}
                </option>
              ))}
            </select>
          </div>
          
          {/* Articles Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Articles</h3>
            
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                <div>
                  <label htmlFor={`article-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Article {index + 1}
                  </label>
                  <select
                    id={`article-${index}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={item.article}
                    onChange={(e) => handleArticleChange(index, e.target.value)}
                    disabled={!isEditing}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    id={`price-${index}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    value={`$${item.price.toFixed(2)}`}
                    readOnly
                  />
                </div>

                {isEditing && items.length > 1 && (
                  <div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isEditing && (
              <button
                type="button"
                onClick={handleAddItem}
                className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Add Another Article
              </button>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Amount</h3>
            <p className="text-gray-700">{editedSale.amount}</p>
            {isEditing && (
              <input 
                type="hidden" 
                name="amount" 
                value={editedSale.amount} 
              />
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Status</h3>
            {isEditing ? (
              <select
                value={typeof editedSale.status === 'string' ? editedSale.status : ''}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
                <option value="Pending">Pending</option>
              </select>
            ) : (
              <div className="mt-1">{renderStatus()}</div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500">Creation Date</h3>
            <p className="text-gray-700">{editedSale.creationDate}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                {saveButtonText}
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {editButtonText}
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-[#0C43A8] text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {closeButtonText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}