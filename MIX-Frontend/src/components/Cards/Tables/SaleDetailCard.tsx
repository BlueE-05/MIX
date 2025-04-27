'use client'
//endpoint
import { HTTPURL } from '@/constants/utils'
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
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
  
  const articleOptions: Article[] = [
    { id: '1', name: 'Laptop', price: 999.99 },
    { id: '2', name: 'Smartphone', price: 699.99 },
    { id: '3', name: 'Monitor', price: 249.99 },
    { id: '4', name: 'Keyboard', price: 49.99 },
    { id: '5', name: 'Mouse', price: 29.99 },
  ];

  const normalizeStatus = (status: ReactNode | string): string => {
    if (typeof status === 'string') return status;
    return 'In Progress';
  };

  const [editedSale, setEditedSale] = useState({
    ...sale,
    status: normalizeStatus(sale.status),
    items: sale.items || []
  });

  // Fetch phases and products from API
  useEffect(() => {
    const fetchData = async () => {
      setLoadingPhases(true);
      setLoadingProducts(true);
      
      try {
        // Fetch phases
        const phasesResponse = await fetch(`${HTTPURL}/newsale/Phases`);
        if (!phasesResponse.ok) throw new Error('Failed to fetch phases');
        const phasesData = await phasesResponse.json();
        setPhases(phasesData);

        // Set initial selected phase based on current status
        const currentPhase = phasesData.find((phase: Phase) => phase.Name === normalizeStatus(sale.status));
        if (currentPhase) {
          setSelectedPhaseId(currentPhase.IDPhase);
        }

        // Fetch products
        const productsResponse = await fetch(`${HTTPURL}/report/ProdInfo/${sale.id}`);
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
  }, [sale.id, sale.status]);

  const handleEdit = () => {
    setIsEditing(true);
    setErrorMessage(null);
  }

  const handleSave = async () => {
    try {
      if (selectedPhaseId !== null) {
        // Update the phase using the PUT endpoint
        const response = await fetch(`${HTTPURL}/sale/${sale.id}/${selectedPhaseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to update sale phase');
        }

        // Find the phase name to update the local state
        const selectedPhase = phases.find(phase => phase.IDPhase === selectedPhaseId);
        if (selectedPhase) {
          const updatedSale = {
            ...editedSale,
            status: selectedPhase.Name
          };
          
          setEditedSale(updatedSale);
          onSave(updatedSale);
        }
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating sale phase:', error);
      setErrorMessage('Failed to update sale phase. Please try again.');
    }
  }

  const handleCancel = () => {
    setEditedSale({
      ...sale,
      status: normalizeStatus(sale.status),
      items: sale.items || []
    });
    // Reset selected phase to original
    const originalPhase = phases.find(phase => phase.Name === normalizeStatus(sale.status));
    if (originalPhase) {
      setSelectedPhaseId(originalPhase.IDPhase);
    }
    setIsEditing(false);
    setShowDeleteConfirm(false);
    setErrorMessage(null);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`${HTTPURL}/sale/${sale.id}`, {
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
    const phaseId = parseInt(e.target.value);
    setSelectedPhaseId(phaseId);
    
    // Update the displayed status immediately
    const selectedPhase = phases.find(phase => phase.IDPhase === phaseId);
    if (selectedPhase) {
      handleChange('status', selectedPhase.Name);
    }
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
          
          {/* Articles Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Articles</h3>
            
            {loadingProducts ? (
              <p>Loading products...</p>
            ) : (
              products.length > 0 ? (
                products.map((product, index) => (
                  <div key={`prod-${index}`} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product {index + 1}
                      </label>
                      <p className="text-gray-700">{product.ProductName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      {isEditing ? (
                        <p className="text-gray-700">{product.Quantity}</p>
                      ) : (
                        <p className="text-gray-700">{product.Quantity}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit Price
                      </label>
                      <p className="text-gray-700">${product.UnitaryPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Total
                      </label>
                      <p className="text-gray-700">${(product.UnitaryPrice * product.Quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No products in this sale</p>
              )
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
                  value={selectedPhaseId || ''}
                  onChange={handlePhaseChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a phase</option>
                  {phases.map((phase) => (
                    <option key={phase.IDPhase} value={phase.IDPhase}>
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