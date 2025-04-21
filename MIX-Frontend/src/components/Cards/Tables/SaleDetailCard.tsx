'use client'
import { ReactNode, useState } from 'react'

interface SaleDetailCardProps {
  sale: {
    id: number
    refNumber: string
    enterprise: string
    amount: string
    status: ReactNode | string
    lastContact: string
    creationDate: string
  }
  onClose: () => void
  onSave?: (updatedSale: {
    id: number
    refNumber: string
    enterprise: string
    amount: string
    status: string
    lastContact: string
    creationDate: string
  }) => void
  editButtonText?: string
  closeButtonText?: string
  saveButtonText?: string
}

export default function SaleDetailCard({
  sale,
  onClose,
  onSave = () => {},
  editButtonText = 'Editar',
  closeButtonText = 'Cerrar',
  saveButtonText = 'Guardar'
}: SaleDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  
  // Función para normalizar el status a string
  const normalizeStatus = (status: ReactNode | string): string => {
    if (typeof status === 'string') return status
    return 'In Progress' // Valor por defecto si es ReactNode
  }

  const [editedSale, setEditedSale] = useState({
    ...sale,
    status: normalizeStatus(sale.status)
  })

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
    onSave(editedSale)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedSale({
      ...sale,
      status: normalizeStatus(sale.status)
    })
    setIsEditing(false)
  }

  const handleChange = (field: keyof typeof editedSale, value: string) => {
    setEditedSale(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
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
        
        <div className="space-y-3">
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Enterprise</h3>
            {isEditing ? (
              <input
                type="text"
                value={editedSale.enterprise}
                onChange={(e) => handleChange('enterprise', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{editedSale.enterprise}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Amount</h3>
            {isEditing ? (
              <input
                type="text"
                value={editedSale.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{editedSale.amount}</p>
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
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Last Contact</h3>
            {isEditing ? (
              <input
                type="date"
                value={editedSale.lastContact}
                onChange={(e) => handleChange('lastContact', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{editedSale.lastContact}</p>
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
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
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