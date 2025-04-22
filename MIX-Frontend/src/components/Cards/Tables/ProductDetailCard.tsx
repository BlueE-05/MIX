'use client'
import { ReactNode, useState } from 'react'

interface ProductDetailCardProps {
  product: {
    id: number
    name: string
    refNum: string
    unitaryPrice: number
    commission: number
    productSheet: ReactNode
  }
  onClose: () => void
  onSave?: (updatedProduct: {
    id: number
    name: string
    refNum: string
    unitaryPrice: number
    commission: number
    productSheet: ReactNode
  }) => void
  editButtonText?: string
  closeButtonText?: string
  saveButtonText?: string
}

export default function ProductDetailCard({
  product,
  onClose,
  onSave = () => {},
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save'
}: ProductDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState({ ...product })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave(editedProduct)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProduct({ ...product })
    setIsEditing(false)
  }

  const handleChange = (field: keyof typeof editedProduct, value: string | number) => {
    setEditedProduct(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  const parseCurrency = (value: string) => {
    return parseFloat(value.replace(/[^0-9.-]+/g, ''))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              product.name
            )}
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
            <h3 className="font-semibold text-gray-500">Reference Number</h3>
            {isEditing ? (
              <input
                type="text"
                value={editedProduct.refNum}
                onChange={(e) => handleChange('refNum', e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{product.refNum}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Price</h3>
            {isEditing ? (
              <input
                type="text"
                value={formatCurrency(editedProduct.unitaryPrice)}
                onChange={(e) => handleChange('unitaryPrice', parseCurrency(e.target.value))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{formatCurrency(product.unitaryPrice)}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Commission</h3>
            {isEditing ? (
              <input
                type="text"
                value={formatCurrency(editedProduct.commission)}
                onChange={(e) => handleChange('commission', parseCurrency(e.target.value))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{formatCurrency(product.commission)}</p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-500">Product Sheet</h3>
            <div className="mt-1">
              {isEditing ? (
                <div className="p-2 border rounded bg-gray-50 text-gray-500 text-sm">
                  [File editing not implemented]
                </div>
              ) : (
                product.productSheet
              )}
            </div>
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
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
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