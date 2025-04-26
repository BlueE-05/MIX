'use client'
import { ContactData } from '@/components/Forms/ContactsForms'
import { ChangeEvent, ReactNode, useState, useEffect } from 'react'
import { Article, SaleItem } from '@/types/Sales'
import { SaleDetailCardProps } from '@/types/DetailCards';

interface Phase {
  Name: string;
  IDPhase: number;
}

interface Product {
  ProductID: string;
  ProductName: string;
  UnitaryPrice: number;
  Quantity: number;
}

export default function SaleDetailCard({
  sale,
  onClose,
  onSave = () => {},
  onDelete = () => {},
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save',
  deleteButtonText = 'Delete'
}: SaleDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [loadingPhases, setLoadingPhases] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  const articleOptions: Article[] = [
    { id: '1', name: 'Laptop', price: 999.99 },
    { id: '2', name: 'Smartphone', price: 699.99 },
    { id: '3', name: 'Monitor', price: 249.99 },
    { id: '4', name: 'Keyboard', price: 49.99 },
    { id: '5', name: 'Mouse', price: 29.99 },
  ];

  const [items, setItems] = useState<SaleItem[]>([]);

  const normalizeStatus = (status: ReactNode | string): string => {
    if (typeof status === 'string') return status;
    return 'In Progress';
  };

  const [editedSale, setEditedSale] = useState({
    ...sale,
    status: normalizeStatus(sale.status),
    items: sale.items || []
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoadingPhases(true);
      setLoadingProducts(true);
      
      try {
        const phasesResponse = await fetch('http://localhost:3003/newsale/Phases');
        if (!phasesResponse.ok) throw new Error('Failed to fetch phases');
        const phasesData = await phasesResponse.json();
        setPhases(phasesData);

        const productsResponse = await fetch(`http://localhost:3003/report/ProdInfo/${sale.id}`);
        if (!productsResponse.ok) throw new Error('Failed to fetch products');
        const productsData = await productsResponse.json();
        setProducts(productsData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to load data. Please try again later.');
      } finally {
        setLoadingPhases(false);
        setLoadingProducts(false);
      }
    };

    fetchData();
  }, [sale.id]);

  const handleEdit = () => {
    setIsEditing(true);
    setErrorMessage(null);
    setItems(products.map(product => ({
      article: product.ProductID,
      quantity: product.Quantity,
      price: product.UnitaryPrice * product.Quantity
    })));
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
      items: sale.items || []
    });
    setItems([]);
    setIsEditing(false);
    setShowDeleteConfirm(false);
    setErrorMessage(null);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`http://localhost:3003/sale/${sale.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete sale');
      }

      onDelete(sale.id);
      onClose();
    } catch (error) {
      console.error('Error deleting sale:', error);
      setErrorMessage('Failed to delete sale. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }

  const handleChange = (field: keyof typeof editedSale, value: string) => {
    setEditedSale(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePhaseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChange('status', e.target.value);
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

  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    lastName: "",
    enterprise: sale.enterprise || "",
    phone: "",
    email: "",
  });

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
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        
        {showDeleteConfirm && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="font-medium text-yellow-800 mb-3">Are you sure you want to delete this sale?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-3 py-1 text-white rounded ${
                  isDeleting ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="mb-4 border-b pb-2">
            <div className="flex">
              <label htmlFor="enterprise" className="block text-sm font-bold text-gray-700 mb-2">
                Enterprise
              </label>
              <span className="font-bold text-md text-red-600">*</span>
            </div>
            <p className="text-gray-700">{contactData.enterprise}</p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Articles</h3>
            
            {isEditing ? (
              items.length > 0 ? (
                items.map((item, index) => {
                  const currentArticle = articleOptions.find(a => a.id === item.article);
                  return (
                    <div key={`edit-${index}`} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end border-t pt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Article {index + 1}
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          value={item.article}
                          onChange={(e) => handleArticleChange(index, e.target.value)}
                        >
                          {!item.article && <option value="">Select article</option>}
                          {articleOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name} (${option.price.toFixed(2)})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit Price
                        </label>
                        <p className="text-gray-700">
                          ${currentArticle?.price.toFixed(2) || '0.00'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total
                        </label>
                        <p className="text-gray-700">${item.price.toFixed(2)}</p>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="mt-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No articles added</p>
              )
            ) : (
              loadingProducts ? (
                <p>Loading products...</p>
              ) : (
                products.length > 0 ? (
                  products.map((product, index) => {
                    const productArticle = articleOptions.find(a => a.id === product.ProductID);
                    return (
                      <div key={`prod-${index}`} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product {index + 1}
                          </label>
                          <p className="text-gray-700">{productArticle?.name || product.ProductName}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                          </label>
                          <p className="text-gray-700">{product.Quantity}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Unit Price
                          </label>
                          <p className="text-gray-700">${productArticle?.price.toFixed(2) || product.UnitaryPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total
                          </label>
                          <p className="text-gray-700">${(product.UnitaryPrice * product.Quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No products in this sale</p>
                )
              )
            )}

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
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Status</h3>
            {isEditing ? (
              loadingPhases ? (
                <p>Loading phases...</p>
              ) : (
                <select
                  value={typeof editedSale.status === 'string' ? editedSale.status : ''}
                  onChange={handlePhaseChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a phase</option>
                  {phases.map((phase) => (
                    <option key={phase.IDPhase} value={phase.Name}>
                      {phase.Name}
                    </option>
                  ))}
                </select>
              )
            ) : (
              <div className="mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  editedSale.status === 'Closed' ? 'bg-green-100 text-green-800' :
                  editedSale.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {typeof editedSale.status === 'string' ? editedSale.status : 'In Progress'}
                </span>
              </div>
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
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isDeleting}
                  className={`px-4 py-2 text-white rounded-md transition-colors ${
                    isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {deleteButtonText}
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  {saveButtonText}
                </button>
              </div>
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