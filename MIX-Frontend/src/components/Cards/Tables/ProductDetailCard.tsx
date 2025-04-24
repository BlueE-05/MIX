'use client'
import { ReactNode, useState, useEffect } from 'react'

interface ProductDetailCardProps {
  product: {
    id: number
    name: string
    refNum: string
    unitaryPrice: number
    commission: number // 0-100%
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
  onDelete?: (productId: number) => void
  editButtonText?: string
  closeButtonText?: string
  saveButtonText?: string
  deleteButtonText?: string;
}

export default function ProductDetailCard({
  product: initialProduct,
  onClose,
  onSave = () => {},
  onDelete = () => {},
  editButtonText = 'Edit',
  closeButtonText = 'Close',
  saveButtonText = 'Save',
  deleteButtonText = 'Delete'
}: ProductDetailCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(initialProduct)
  const [editedProduct, setEditedProduct] = useState(initialProduct)
  const [commissionError, setCommissionError] = useState('')
  const [commissionInput, setCommissionInput] = useState(initialProduct.commission.toString())

  // Actualizar estados cuando cambia el prop initialProduct
  useEffect(() => {
    setCurrentProduct(initialProduct)
    setEditedProduct(initialProduct)
    setCommissionInput(initialProduct.commission.toString())
  }, [initialProduct])

  const handleEdit = () => {
    setIsEditing(true)
    setCommissionError('')
    setCommissionInput(editedProduct.commission.toString())
  }

  const handleSave = () => {
    if (commissionError) return
    
    // Asegurar valores válidos
    const finalCommission = parseFloat(commissionInput) || 0
    const updatedProduct = {
      ...editedProduct,
      commission: Math.min(100, Math.max(0, finalCommission))
    }

    setCurrentProduct(updatedProduct) // Actualizar la vista inmediatamente
    onSave(updatedProduct) // Notificar al componente padre
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProduct(currentProduct)
    setCommissionInput(currentProduct.commission.toString())
    setIsEditing(false)
    setCommissionError('')
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(initialProduct.id)
      onClose()
    }
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

  const handleCommissionChange = (value: string) => {
    if (value === '') {
      setCommissionInput('')
      setCommissionError('')
      handleChange('commission', 0)
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) {
      setCommissionError('Please enter a valid number')
      return
    }

    if (numValue < 0) {
      setCommissionError('Commission cannot be less than 0%')
      setCommissionInput('0')
      handleChange('commission', 0)
      return
    }

    if (numValue > 100) {
      setCommissionError('Commission cannot be more than 100%')
      setCommissionInput('100')
      handleChange('commission', 100)
      return
    }

    setCommissionError('')
    setCommissionInput(value)
    handleChange('commission', numValue)
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
              currentProduct.name
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
              <p className="text-gray-700">{currentProduct.refNum}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Price</h3>
            {isEditing ? (
              <input
                type="text"
                value={formatCurrency(editedProduct.unitaryPrice)}
                onChange={(e) => handleChange('unitaryPrice', parseFloat(e.target.value.replace(/[^0-9.-]+/g, '')))}
                className="w-full p-2 border rounded"
              />
            ) : (
              <p className="text-gray-700">{formatCurrency(currentProduct.unitaryPrice)}</p>
            )}
          </div>
          
          <div className="border-b pb-2">
            <h3 className="font-semibold text-gray-500">Commission</h3>
            {isEditing ? (
              <div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={commissionInput}
                    onChange={(e) => handleCommissionChange(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="0-100"
                  />
                  <span className="ml-2">%</span>
                </div>
                {commissionError && (
                  <p className="text-red-500 text-sm mt-1">{commissionError}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-700">{currentProduct.commission}%</p>
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
                currentProduct.productSheet
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          {isEditing ? (
            <>
              <div className="flex space-x-2">
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" 
                >
                  {deleteButtonText}
                </button>
              </div>
              <button 
                onClick={handleSave}
                disabled={!!commissionError || commissionInput === ''}
                className={`px-4 py-2 rounded-md transition-colors ${
                  commissionError || commissionInput === ''
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
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